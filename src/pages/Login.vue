<template>
  <div class="login">
    <div class="login__title">
      <h2>Sign in</h2>
    </div>
    <div class="login__block">
      <q-card class="block">
        <div class="user">
          <q-input class="q-mb-md" v-model="login" filled type="text" hint="Login" />
          <q-input class="q-mb-md" v-model="password" filled type="password" hint="Password" />
        </div>
        <q-card-actions class="button q-mt-lg" align="center">
          <q-btn color="yellow-1" text-color="black" label="Sign in" size="24px" no-caps />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  padding: 60px 0 30px 0;
  height: 100vh;
  &__title {
    h2 {
      margin: 0;
      font-size: 48px;
      line-height: 56px;
      text-align: center;
      color: #000000;
    }
  }
  &__block {
    padding: 30px 20px 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .block {
      padding: 20px;
      min-width: 300px;
      .button {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        button {
          opacity: 0.8;
          border-radius: 10px;
          width: 200px;
          height: 50px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
