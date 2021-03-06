<template>
  <div class="chat">
    <div class="chat__title justify-between">
      <div class="flex items-center">
        <q-btn @click="back" round size="12px" color="yellow-1" icon="reply" />
        <p>Участников: {{ this.members.length }}</p>
      </div>
      <div>
        <q-btn class="self-end" size="12px" @click="voice" round color="yellow-1" :icon="!voiceProp ? 'mic_off' : 'mic'" />
        <q-btn class="self-end q-ml-sm" size="12px" @click="mute" round color="yellow-1" :icon="!muteProp ? 'volume_up' : 'volume_off'" />
      </div>
    </div>
    <div class="chat__messages row">
      <div class="col scroll-y">
        <q-infinite-scroll id="scroll" reverse>
          <q-chat-message
              v-for="(item, index) in messages"
              :key="index"
              :name="item.user.login"
              :avatar="item.user.img_url"
              :text="[item.message]"
              :sent="item.user.login === profile.login"
          />
        </q-infinite-scroll>
      </div>
    </div>
    <div id="video-wrapper" class="video-wrapper">
      <video id="myVideo" autoplay playsinline muted></video>
    </div>
    <!-- <div id="audio-wrapper" class="hidden"> -->
<!--      <div class="label">Remote audio:</div>-->
<!--      <audio id="audio2" autoplay controls></audio>-->
    <!-- </div> -->
    <div class="chat__input">
      <q-input style="width: 95%; margin: 0 15px 0 10px;" borderless type="text" autogrow v-model="message" />
      <q-btn @click="sendMessage(message)" round color="yellow-1" size="12px" icon="send" />
    </div>
  </div>
</template>

<script>
import Peer from 'simple-peer'
import Pusher from 'pusher-js'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      peers: {},
      userStream: null,
      mainUserId: null,
      channel: null,
      message: '',
      messages: [],
      members: [],
      voiceProp: true,
      muteProp: false
    }
  },
  watch: {
    messages: function () {
      return this.messages
    }
  },
  computed: {
    ...mapGetters({
      profile: 'user/profile',
      roomUsers: 'chats/roomUsers'
    })
  },
  methods: {
    ...mapActions({
      send: 'chats/SEND_MESSAGE',
      loadUsers: 'chats/LOAD_ROOM_USERS'
    }),
    back () {
      location.href = '/chats'
    },
    mute () {
      this.muteProp = !this.muteProp
      this.members.forEach(elem => {
        if (elem.id !== this.profile.id) {
          document.getElementById(`videostream-${elem.id}`).muted = this.muteProp
        }
      })
    },
    voice () {
      this.voiceProp = !this.voiceProp
      this.userStream.getAudioTracks()[0].enabled = this.voiceProp
    },
    sendMessage (message) {
      const data = {
        channel: `presence-voice-channel-${this.$route.params.id}`,
        message: message
      }
      this.send(data)
        .then(() => {
          this.message = ''
        })
    },
    getPermissions () {
      // eslint-disable-next-line promise/param-names,no-async-promise-executor
      return new Promise(async (res, rej) => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          document.getElementById('myVideo').srcObject = stream
          res(stream)
        } catch (err) {
          throw new Error(`Unable to fetch stream ${err}`)
        }
      })
    },
    pusherSetup () {
      Pusher.logToConsole = true
      const pusher = new Pusher('ef46f298b0c2bd8c3f46', {
        authEndpoint: '/api/auth/pusher',
        cluster: 'eu',
        auth: {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('user-token'),
            Accept: 'application/json'
          }
        }
      })

      this.channel = pusher.subscribe(`presence-voice-channel-${this.$route.params.id}`)

      this.channel.bind('pusher:member_added', (member) => {
        this.members = []
        const channel = `presence-voice-channel-${this.$route.params.id}`
        this.loadUsers(channel)
          .then(() => {
            this.members = this.roomUsers
          })
        this.peers[member.id] = this.startPeer(member.id)
        // this.members.push(member.info.login)
        const data = {
          message: 'Пользователь присоединился',
          user: {
            login: member.info.login.login,
            img_url: member.info.login.img_url
          }
        }
        this.messages.push(data)
      })

      this.channel.bind('pusher:member_removed', (member) => {
        document.getElementById(`videostream-${member.id}`).remove()
        this.members = []
        const channel = `presence-voice-channel-${this.$route.params.id}`
        this.loadUsers(channel)
          .then(() => {
            this.members = this.roomUsers
          })
        const data = {
          message: 'Пользователь отключился',
          user: {
            login: member.info.login.login,
            img_url: member.info.login.img_url
          }
        }
        this.messages.push(data)
      })

      this.channel.bind('message-created', (data) => {
        this.messages.push(data)
        setTimeout(() => {
          window.scrollTo(0, document.getElementById('scroll').clientHeight + 67)
        }, 300)
      })

      this.channel.bind('client-signal-' + this.mainUserId, (signal) => {
        const signalUserId = signal.userId
        let peer = this.peers[signalUserId]
        if (signalUserId === this.mainUserId) {
          return
        }

        // if peer is not already exists, we got an incoming call
        if (peer === undefined) {
          peer = this.startPeer(signalUserId, false)
        }

        peer.signal(signal.data)
      })
    },
    startPeer (userId, initiator = true) {
      if (userId === this.mainUserId) {
        return
      }

      const peer = new Peer({
        initiator,
        stream: this.userStream,
        trickle: false
      })

      peer.on('signal', (data) => {
        this.channel.trigger('client-signal-' + userId, {
          type: 'signal',
          userId: this.mainUserId,
          data: data
        })
      })

      peer.on('connect', () => {
        // console.log('Connected!')
      })

      peer.on('stream', (stream) => {
        // const newAudioStream = document.createElement('audio')
        // newAudioStream.setAttribute('autoplay', 'true')
        // newAudioStream.controls = true
        // newAudioStream.autoplay = true
        // newAudioStream.id = 'audiostream-' + userId
        // document.getElementById('audio-wrapper').appendChild(newAudioStream)
        //
        // const audioStream = document.getElementById('audiostream-' + userId)
        //
        // if (audioStream.srcObject !== stream) {
        //   audioStream.srcObject = stream
        // }

        const newVideoStream = document.createElement('video')
        newVideoStream.controls = false
        newVideoStream.autoplay = true
        newVideoStream.setAttribute('playsinline', '')
        newVideoStream.id = 'videostream-' + userId
        document.getElementById('video-wrapper').appendChild(newVideoStream)

        const audioStream = document.getElementById('videostream-' + userId)

        if (audioStream.srcObject !== stream) {
          audioStream.srcObject = stream
        }
      })

      peer.on('close', () => {
        const peer = this.peers[userId]
        if (peer !== undefined) {
          peer.destroy()
        }

        this.peers[userId] = undefined
      })

      return peer
    }
  },
  beforeMount () {
    this.getPermissions()
      .then(stream => {
        this.userStream = stream
        this.mainUserId = this.profile.id
      })
      .then(() => {
        this.pusherSetup()
      })
      .then(() => {
        setTimeout(() => {
          const channel = `presence-voice-channel-${this.$route.params.id}`
          this.loadUsers(channel)
            .then(() => {
              this.members = this.roomUsers
            })
        }, 2500)
      })
  }
}
</script>

<style lang="scss">
.video-wrapper {
  display: flex;
  justify-content: center;
  width: 100vw;
  position: fixed;
  top: 57px;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 1000px;
  background: white;
  border: 1px solid black;
  video {
    width: 16vw;
    height: auto;
    max-height: 100px;
  }
}
.chat {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  &__messages {
    margin: 130px 0 70px;
    padding: 0 10px;
    width: 100%;
  }
  &__input {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    z-index: 999;
    background: white;
    height: auto;
    padding: 5px 0;
    box-shadow: 0px -1px 5px rgba(105, 105, 105, 1);
    button {
      position: relative;
      right: 5px;
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
  }
  &__title {
    border-bottom: 1px solid black;
    padding: 10px;
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100vw;
    background: white;
    display: flex;
    align-items: center;
    button:first-child {
      text-decoration: none;
      margin-right: 10px;
    }
    p {
      margin: 0;
      font-size: 18px;
    }
  }
  &__users {
    padding: 30px 35px 40px 35px;
    height: 80vh;
    .user {
      margin-bottom: 15px;
    }
  }
  .button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    a {
      opacity: 0.8;
      border-radius: 10px;
      width: 250px;
      height: 50px;
      font-weight: 400;
    }
  }
}
</style>
