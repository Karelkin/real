<template>
  <div class="interests">
    <div class="example_like">
      <p>Like</p>
    </div>
    <div class="example__dislike">
      <p>Dislike</p>
    </div>
    <vue-swing
        @throwout="onThrowout"
        @throwin="onThrowin"
        :config="config"
        ref="vueswing"
        v-if="load"
    >
      <div
          v-for="(item, index) in subsInterests[0].subinterests"
          :key="index"
          :id="item.id"
          class="card"
          :style="'background:' + subsInterests[0].color"
      >
        <p>{{ item.title }}</p>
      </div>
    </vue-swing>
    <div class="button" v-if="show">
      <q-btn @click="next" color="yellow-1" text-color="black" label="Go to chats" size="24px" no-caps />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueSwing from 'vue-swing'

export default {
  name: 'app',
  components: { VueSwing },
  data () {
    return {
      show: false,
      load: false,
      likes: [],
      dislikes: [],
      cards: null,
      currentElem: null,
      config: {
        allowedDirections: [
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
        ],
        minThrowOutDistance: 155,
        maxThrowOutDistance: 175,
        maxRotation: 2
      }
    }
  },
  computed: {
    ...mapGetters({
      subsInterests: 'interests/subsInterests'
    })
  },
  methods: {
    ...mapActions({
      loadSubsInterests: 'interests/LOAD_SUBS_INTERESTS',
      selectSubsInterest: 'interests/SELECT_SUBS_INTEREST'
    }),
    next () {
      location.href = '/chats'
    },
    // swing () {
    //   this.cards = this.$refs.vueswing.cards
    // },
    onThrowin ({ target, throwDirection }) {
      document.getElementById(`${target.id}`).classList.remove('dislike')
      document.getElementById(`${target.id}`).classList.remove('like')
    },
    onThrowout ({ target, throwDirection }) {
      document.getElementById(`${target.id}`).classList.remove('dislike')
      document.getElementById(`${target.id}`).classList.remove('like')
      if (VueSwing.Direction.LEFT === throwDirection) {
        // const stack = VueSwing.Stack()
        // const card = stack.createCard(target)
        // card.throwOut(-1, 0)
        document.getElementById(`${target.id}`).classList.add('dislike')
        const selectSub = {
          id: target.id,
          select: {
            is_like: false
          }
        }
        this.dislikes.push(target.id)
        this.selectSubsInterest(selectSub)
      } else {
        document.getElementById(`${target.id}`).classList.add('like')
        const selectSub = {
          id: target.id,
          select: {
            is_like: true
          }
        }
        this.likes.push(target.id)
        this.selectSubsInterest(selectSub)
      }
      if (this.likes.length + this.dislikes.length === this.subsInterests[0].subinterests.length) {
        this.show = true
      }
    }
  },
  beforeMount () {
    this.loadSubsInterests()
      .then(() => {
        this.load = true
      })
  }
}
</script>

<style lang="scss">
.like,
.dislike {
  z-index: 1 !important;
  pointer-events: none;
}
.like:before {
  content: 'LIKE';
  color: springgreen;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 40px;
  border: 2px solid springgreen;
  padding: 5px;
}
.dislike:before {
  content: 'DISLIKE';
  color: orangered;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 40px;
  border: 2px solid orangered;
  padding: 5px;
}
.interests {
  padding: 0 35px 20px 35px;
  height: 100vh;
  position: relative;
  .example_like,
  .example__dislike {
    position: absolute;
    height: 320px;
    width: 180px;
    top: calc(20% - 100px);
    border-radius: 20px;
  }
  .example_like {
    right: 5px;
    border: 2px solid greenyellow;
    p {
      font-size: 40px;
      transform: rotate(90deg);
      color: greenyellow;
      position: absolute;
      right: -10px;
      top: calc(50% - 30px);
      text-transform: uppercase;
    }
  }
  .example__dislike {
    left: 5px;
    border: 2px solid red;
    p {
      position: absolute;
      font-size: 40px;
      transform: rotate(-90deg);
      color: red;
      left: -40px;
      top: calc(50% - 30px);
      text-transform: uppercase;
    }
  }
  .button {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    button {
      opacity: 0.8;
      border-radius: 10px;
      width: 250px;
      height: 50px;
      font-weight: 400;
    }
  }
}
.card {
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: 72px;
  height: 320px;
  justify-content: center;
  left: calc(50% - 90px);
  position: absolute;
  top: calc(20% - 100px);
  width: 180px;
  overflow: hidden;
  z-index: 999;
  p {
    font-size: 32px;
    transform: rotate(-55deg);
    text-align: center;
  }
}
</style>
