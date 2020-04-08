<template>
  <div class="interest">
    <div class="interest__title">
      <h2>What’s your main interest?</h2>
    </div>
    <div class="interest__items">
      <div class="item"
           v-for="(item, index) in interests"
           :key="item.id"
           :class="[ index%2 === 1 ? 'self-end' : '', choose === item.id ? 'select' : '']"
           :style="setValues(item.color)"
           @click="selectItem(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="button" :disabled="!choose">
      <q-btn @click="chooseMainInterest" color="yellow-1" text-color="black" label="Choose other interests" size="24px" no-caps />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      choose: null
    }
  },
  watch: {
    choose: function () {
      return this.choose
    }
  },
  computed: {
    ...mapGetters({
      interests: 'interests/interests',
      token: 'user/token'
    })
  },
  methods: {
    ...mapActions({
      loadInterests: 'interests/LOAD_INTERESTS',
      logout: 'user/AUTH_LOGOUT',
      selectInterest: 'interests/SELECT_MAIN_INTEREST'
    }),
    randomNumber (min, max) {
      return Math.random() * (max - min) + min
    },
    chooseMainInterest () {
      this.selectInterest(this.choose)
        .then(() => {
          this.$router.push('/interests')
        })
    },
    selectItem (elem) {
      this.choose = elem
    },
    setValues (color) {
      const values = {
        left: '',
        right: '',
        top: '',
        bottom: '',
        background: color
      }
      values.left = this.randomNumber(0, 25) + 'px'
      values.right = this.randomNumber(0, 25) + 'px'
      values.top = this.randomNumber(0, 30) + 'px'
      values.bottom = this.randomNumber(0, 30) + 'px'
      return values
    }
  },
  beforeMount () {
    this.loadInterests()
  }
}
</script>

<style lang="scss" scoped>
.select {
  height: 155px !important;
  width: 155px !important;
  opacity: 1 !important;
}
.interest {
  padding: 20px 35px 40px 35px;
  .button {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    button {
      opacity: 0.8;
      border-radius: 10px;
      width: 270px;
      height: 50px;
      font-weight: 400;
    }
  }
  &__title {
    h2 {
      margin: 0;
      font-size: 48px;
      line-height: 56px;
      text-align: center;
      color: #000000;
    }
  }
  &__items {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    .item {
      transition:
          height .2s ease,
          width .2s ease,
          background .2s ease,
          top .2s ease,
          bottom .2s ease,
          left .2s ease,
          right .2s ease;
      margin-top: -50px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      font-size: 24px;
      line-height: 28px;
      cursor: default;
      opacity: 0.5;
    }
  }
}
</style>
