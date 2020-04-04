<template>
  <div class="chats">
    <div class="chats__title">
      <h2>Let’s talk!</h2>
    </div>
    <div class="chats__items">
      <router-link class="item" to="/chat">
        <div class="item__percent">
          <div class="item__percent_number">
            50%
          </div>
          <div class="item__percent_text">
            match
          </div>
        </div>
        <div class="item__interests">
          <div>sex</div>
          <div>music</div>
        </div>
        <div class="item__users">
          <img v-for="(image, index) in 5"
               :key="index"
               :src="'../statics/images/user-' + (index + 1) + '.png'"
               class="absolute"
               :style="'left: ' + (24 * index) + 'px;'"
               height="57"
               width="57"
               alt=""
          >
        </div>
      </router-link>
      <div class="item">
        fds
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chats {
  padding: 60px 0 30px 0;
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
    padding: 30px 25px 0;
    .item {
      width: 100%;
      border: 1px solid #979797;
      border-radius: 19px;
      display: flex;
      align-items: center;
      padding: 26px 12px 28px;
      text-decoration: none;
      color: #000000;
      &__percent {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50px;
        &_number {
          font-size: 32px;
          line-height: 1;
          margin-bottom: 5px;
        }
        &_text {
          font-size: 18px;
          line-height: 1;
          opacity: 0.65;
        }
      }
      &__interests {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        div {
          width: max-content;
          background: #D8D8D8;
          border: 1px solid #979797;
          box-sizing: border-box;
          border-radius: 8px;
          padding: 1px 12px;
        }
        div:not(:first-child) {
          margin-top: 12px;
        }
      }
      &__users {
        margin-left: 10px;
        display: flex;
        position: relative;
        height: 57px;
        img {
          top: 0;
          border-radius: 50%;
        }
      }
    }
    .item:not(:first-child) {
      margin-top: 30px;
    }
  }
}
</style>
