<template>
  <div class="preview-5">
    <div class="preview-5__title">
      <h2>They’re lively</h2>
    </div>
    <div class="preview-5__text">
      <p class="preview-5__text_top">They are here not for fame or money.</p>
      <p class="preview-5__text_bottom">They are <span>Real.</span></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview-5 {
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
    &_bottom {
      padding-top: 20px;
      padding-bottom: 30px;
      span {
        font-size: 46px;
        font-weight: bold;
      }
    }
  }
}
</style>
