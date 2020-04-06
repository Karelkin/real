<template>
  <div class="chat">
    <div class="chat__title">
      CHAT #777
    </div>
    <div id="audio-wrapper">
      <div class="label">Remote audio:</div>
      <audio id="audio2" autoplay controls></audio>
    </div>
<!--    <button id="callButton" @click="call" :disabled="callButton">Call</button>-->
  </div>
</template>

<script>
import Peer from 'simple-peer'
import Pusher from 'pusher-js'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      peers: {},
      userStream: null,
      mainUserId: null,
      channel: null
    }
  },
  computed: {
    ...mapGetters({
      profile: 'user/profile'
    })
  },
  methods: {
    getPermissions () {
      // eslint-disable-next-line promise/param-names,no-async-promise-executor
      return new Promise(async (res, rej) => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
          res(stream)
        } catch (err) {
          throw new Error(`Unable to fetch stream ${err}`)
        }
      })
    },
    // getRandomInt (max) {
    //   return Math.floor(Math.random() * Math.floor(max))
    // },
    pusherSetup () {
      // statusText.textContent = 'Установка связи'
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

      /* channel.bind('pusher:subscription_succeeded', (members) => {
           members.each(function(member) {
               console.log(member);
               peers[member.id] = startPeer(member.id);
           });
       }); */

      this.channel.bind('pusher:member_added', (member) => {
        // statusText.textContent = member.id + ' зашёл в чатик'
        // console.log(member);
        this.peers[member.id] = this.startPeer(member.id)
      })

      this.channel.bind('client-signal-' + this.mainUserId, (signal) => {
        // console.log('Signal bind')

        const signalUserId = signal.userId

        let peer = this.peers[signalUserId]

        if (signalUserId === this.mainUserId) {
          return
        }

        // if peer is not already exists, we got an incoming call
        if (peer === undefined) {
          // console.log('Peer is undefined')

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

        // statusText.textContent = 'Ура';
      })

      peer.on('connect', () => {
        // console.log('Connected!')
      })

      peer.on('stream', (stream) => {
        // statusText.textContent = 'Сигнал получен';

        const newAudioStream = document.createElement('audio')
        newAudioStream.setAttribute('autoplay', 'true')
        newAudioStream.controls = true
        newAudioStream.autoplay = true
        newAudioStream.id = 'audiostream-' + userId
        document.getElementById('audio-wrapper').appendChild(newAudioStream)

        const audioStream = document.getElementById('audiostream-' + userId)

        if (audioStream.srcObject !== stream) {
          audioStream.srcObject = stream
          // console.log('src Object has been set')
        }
      })

      peer.on('close', () => {
        // console.log('Close up')
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
    // console.log(this.profile)
    // console.log(this.$route.params)
    this.getPermissions()
      .then(stream => {
        this.userStream = stream
        this.mainUserId = this.profile.id

      // statusText.textContent = 'Успешно... Нажмите Call';
      })
      .then(() => {
        this.pusherSetup()
      })
  }
}
</script>

<style lang="scss" scoped>
.chat {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  &__title {
    border-bottom: 1px solid black;
    padding: 10px;
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
