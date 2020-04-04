<template>
  <div class="preview-1">
    <div class="preview-1__title">
      <h2>Relax</h2>
      <img src="../statics/images/preview-1.png" height="54" width="54" alt="">
    </div>
    <div class="preview-1__text">
      <p>Finally you are in the place where you can be yourself and everybody would love it</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview-1 {
  display: flex;
  flex-direction: column;
  padding: 27px 30px 0 30px;
  &__title {
    display: flex;
    align-items: flex-end;
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
