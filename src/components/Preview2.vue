<template>
  <div class="preview-2">
    <div class="preview-2__title">
      <h2>We’re tired</h2>
      <img src="../statics/images/preview-2.png" height="93" width="93" alt="">
    </div>
    <div class="preview-2__text">
      <p>from staged videos and fake glossy lifes in social networks</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview-2 {
  display: flex;
  flex-direction: column;
  padding: 27px 30px 0 30px;
  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 36px;
    h2 {
      margin: 0;
      font-weight: bold;
      font-size: 64px;
      line-height: 75px;
      color: #000000;
    }
    img {
      margin: 0 0 12px 10px;
    }
  }
  &__text {
    max-width: 315px;
    p {
      margin: 0;
      font-size: 36px;
      line-height: 42px;
      color: #000000;
    }
  }
}
</style>
