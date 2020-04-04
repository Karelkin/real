<template>
  <div class="preview-0">
    <div class="preview-0__title">
      <h1>Real.</h1>
      <p>meaningful connections</p>
    </div>
    <div class="preview-0__text">
      <h3>show your life to the world</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview-0 {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 50px 0 53px;
  &__title,
  &__text {
    color: #FFFFFF;
  }
  &__title {
    margin-top: 120px;
    h1, p {
      margin: 0;
    }
    h1 {
      font-weight: bold;
      font-size: 96px;
      line-height: 112px;
    }
    p {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      color: #7C7C7C;
    }
  }
  &__text {
   max-width: 260px;
    h3 {
      margin: 47px 0 0;
      font-weight: bold;
      font-size: 48px;
      line-height: 56px;
      color: #FFFFFF;
    }
  }
}
</style>
