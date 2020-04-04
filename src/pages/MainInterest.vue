<template>
  <div class="interest">
    <div class="interest__title">
      <h2>What’s your main interest?</h2>
    </div>
    <div class="interest__items">
      <div class="item"
           v-for="(item, index) in 5"
           :key="index"
           :class="[ index%2 === 1 ? 'self-end' : '', once === item ? 'select' : '']"
           :style="setValues()"
           @click="selectItem(item)"
      >
        sex
      </div>
    </div>
    <div class="button" v-if="once">
      <q-btn to="/interests" color="yellow-1" text-color="black" label="Choose other interests" size="24px" no-caps />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      once: null
    }
  },
  watch: {
    once: function () {
      return this.once
    }
  },
  methods: {
    randomNumber (min, max) {
      return Math.random() * (max - min) + min
    },
    selectItem (elem) {
      this.once = elem
    },
    setValues () {
      const values = {
        left: '',
        right: '',
        top: '',
        bottom: ''
      }
      values.left = this.randomNumber(0, 25) + 'px'
      values.right = this.randomNumber(0, 25) + 'px'
      values.top = this.randomNumber(0, 30) + 'px'
      values.bottom = this.randomNumber(0, 30) + 'px'
      return values
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  background: springgreen !important;
  height: 155px !important;
  width: 155px !important;
}
.interest {
  padding: 60px 35px 40px 35px;
  .button {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    a {
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
      margin-top: -40px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: #D8D8D8;
      font-size: 24px;
      line-height: 28px;
      cursor: default;
    }
  }
}
</style>
