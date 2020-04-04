<template>
  <div class="preview-4">
    <div class="preview-4__title">
      <h2>Ask<br> them</h2>
    </div>
    <div class="preview-4__text">
      <p>How do they feel today, about their job, about their hobbies and passions. Ask who do they love, who do they missing... what do they dream about.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview-4 {
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
      padding-bottom: 30px;
    }
  }
}
</style>
