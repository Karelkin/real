<template>
  <div class="chat">
    <div class="chat__title">
      CHAT #777
    </div>
    <div id="audio-wrapper">
      <div class="label">Remote audio:</div>
      <audio id="audio2" autoplay controls></audio>
    </div>
    <button id="callButton" @click="call" :disabled="callButton">Call</button>
  </div>
</template>

<script>
import Peer from 'simple-peer'
import Pusher from 'pusher-js'

export default {
  data () {
    return {
      peers: {},
      userStream: null,
      mainUserId: this.getRandomInt(999999).toString(),
      channel: null
    }
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
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    pusherSetup () {
      // statusText.textContent = 'Установка связи'
      Pusher.logToConsole = true
      const pusher = new Pusher('ef46f298b0c2bd8c3f46', {
        authEndpoint: 'https://59cfeadd.ngrok.io/api/pusher/auth',
        cluster: 'eu',
        auth: {
          params: {
            test_key: this.mainUserId
          }
        }
      })

      this.channel = pusher.subscribe('presence-my-channel')

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
        console.log('Signal bind')

        const signalUserId = signal.userId

        let peer = this.peers[signalUserId]

        if (signalUserId === this.mainUserId) {
          return
        }

        // if peer is not already exists, we got an incoming call
        if (peer === undefined) {
          console.log('Peer is undefined')

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
        console.log('Connected!')
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
          console.log('src Object has been set')
        }
      })

      peer.on('close', () => {
        console.log('Close up')
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

      // statusText.textContent = 'Успешно... Нажмите Call';
      })
      .then(() => {
        this.pusherSetup()
      })
  }
}
// let statusText = document.getElementById('status');
// let peers = {};
//
// let userStream = null;
// let mainUserId = getRandomInt(999999).toString();
//
// let chatId = 1;
//
// let channel = null;

// console.log('ID: ', mainUserId);

// statusText.textContent = 'Запрос на права';

// getPermissions().then(stream => {
//   userStream = stream;
//
//   statusText.textContent = 'Успешно... Нажмите Call';
// });

// window.peerCall = function() {
//   const peerId = document.querySelector('#peerCaller');
//
//   pusherSetup();
//
//   //peers[peerId.value] = startPeer(peerId.value);
// };

// peers[mainUserId] = startPeer(mainUserId);

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }

// function pusherSetup() {
//   statusText.textContent = 'Установка связи';
//
//   let pusher = new Pusher('ef46f298b0c2bd8c3f46', {
//     authEndpoint: 'https://59cfeadd.ngrok.io/api/pusher/auth',
//     cluster: 'eu',
//     auth: {
//       params: {
//         test_key: mainUserId
//       }
//     }
//   });
//
//   channel = pusher.subscribe('presence-my-channel');
//
//   /* channel.bind('pusher:subscription_succeeded', (members) => {
//        members.each(function(member) {
//            console.log(member);
//            peers[member.id] = startPeer(member.id);
//        });
//    }); */
//
//   channel.bind('pusher:member_added', (member) => {
//     statusText.textContent = member.id + ' зашёл в чатик';
//     console.log(member);
//     peers[member.id] = startPeer(member.id);
//   });
//
//   channel.bind('client-signal-' + mainUserId, (signal) => {
//     console.log('Signal bind');
//
//     const signalUserId = signal.userId;
//
//     let peer = peers[signalUserId];
//
//     if (signalUserId === mainUserId) {
//       return
//     }
//
//     // if peer is not already exists, we got an incoming call
//     if (peer === undefined) {
//       console.log('Peer is undefined');
//
//       peer = startPeer(signalUserId, false);
//     }
//
//     peer.signal(signal.data);
//   });
// }

// function getPermissions() {
//   return new Promise(async (res, rej) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
//       res(stream);
//     } catch(err) {
//       throw new Error(`Unable to fetch stream ${err}`);
//     }
//   });
// }

// function startPeer(userId, initiator = true) {
//   if (userId === mainUserId) {
//     return ;
//   }
//
//   const peer = new Peer({
//     initiator,
//     stream: userStream,
//     trickle: false,
//   });
//
//   peer.on('signal', (data) => {
//     channel.trigger('client-signal-' + userId, {
//       type: 'signal',
//       userId: mainUserId,
//       data: data
//     });
//
//     statusText.textContent = 'Ура';
//   });
//
//   peer.on('connect', () => {
//     console.log('Connected!');
//   });
//
//   peer.on('stream', (stream) => {
//     statusText.textContent = 'Сигнал получен';
//
//     let newAudioStream = document.createElement('audio');
//     newAudioStream.setAttribute('autoplay', 'true');
//     newAudioStream.controls = true;
//     newAudioStream.autoplay = true;
//     newAudioStream.id = 'audiostream-' + userId;
//     document.getElementsByTagName('body')[0].appendChild(newAudioStream);
//
//     const audioStream = document.getElementById('audiostream-' + userId);
//
//     if (audioStream.srcObject !== stream) {
//       audioStream.srcObject = stream;
//       console.log('src Object has been set');
//     }
//   });
//
//   peer.on('close', () => {
//     console.log('Close up');
//     let peer = peers[userId];
//     if(peer !== undefined) {
//       peer.destroy();
//     }
//
//     peers[userId] = undefined;
//   });
//
//   return peer;
// }
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
