<template>
  <div class="login">
    <div class="login__title">
      <h2>Sign up</h2>
    </div>
    <div class="login__block">
      <q-card class="block">
        <div class="user">
          <q-input class="q-mb-md" v-model="user.login" filled type="text" hint="Login" />
          <q-input class="q-mb-md" v-model="user.password" filled type="password" hint="Password" />
          <q-input class="q-mb-md" v-model="user.password2" filled type="password" hint="Confirm password" />
        </div>
        <q-card-actions class="button q-mt-lg" align="center">
          <q-btn @click="register(user)" color="yellow-1" text-color="black" label="Sign up" size="24px" no-caps />
        </q-card-actions>
        <div class="links">
          <router-link to="/login" exact-active-class='link-active'>Sign in</router-link>
          <router-link to="/registration" exact-active-class='link-active'>Sign up</router-link>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      user: {
        login: null,
        password: null,
        password2: null
      }
    }
  },
  methods: {
    ...mapActions({
      registerRequest: 'user/REGISTER_REQUEST'
    }),
    register (user) {
      this.registerRequest(user)
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {
          this.$router.push('/register')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  a {
    text-decoration: none;
    color: black;
  }
}
.link-active {
  opacity: 0.5;
}
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
    padding: 100px 20px 0;
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
