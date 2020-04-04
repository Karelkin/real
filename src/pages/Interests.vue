<template>
  <div class="interests">
    <vue-swing
        @throwout="onThrowout"
        @throwin="onThrowin"
        :config="config"
        ref="vueswing"
    >
      <div
          v-for="(item) in subsInterests[0].subinterests"
          :key="item.id"
          :id="item.id"
          class="card"
          :style="'background:' + subsInterests[0].color"
      >
        <p>{{ item.title }}</p>
      </div>
    </vue-swing>
    <div class="button" v-if="show">
      <q-btn to="/chats" color="yellow-1" text-color="black" label="Go to chats" size="24px" no-caps />
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
      likes: [],
      dislikes: [],
      config: {
        allowedDirections: [
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
        ],
        minThrowOutDistance: 190,
        maxThrowOutDistance: 200
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
    swing () {
      const cards = this.$refs.vueswing.cards
      cards[cards.length - 1].throwOut(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      )
    },
    onThrowin ({ target, throwDirection }) {
      document.getElementById(`${target.id}`).classList.remove('dislike')
      document.getElementById(`${target.id}`).classList.remove('like')
    },
    onThrowout ({ target, throwDirection }) {
      document.getElementById(`${target.id}`).classList.remove('dislike')
      document.getElementById(`${target.id}`).classList.remove('like')
      if (VueSwing.Direction.LEFT === throwDirection) {
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
  }
}
</script>

<style lang="scss">
.like,
.dislike {
  z-index: 1 !important;
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
  .button {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    a {
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
  height: 350px;
  justify-content: center;
  left: calc(50% - 100px);
  position: absolute;
  top: calc(20% - 100px);
  width: 200px;
  overflow: hidden;
  z-index: 999;
  p {
    font-size: 40px;
    transform: rotate(-45deg);
  }
}
</style>
