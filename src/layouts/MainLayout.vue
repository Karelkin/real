<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container v-if="show">
      <q-page>
        <transition name="slide-left">
          <router-view></router-view>
        </transition>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      profile: 'user/profile'
    })
  },
  methods: {
    ...mapActions({
      loadProfile: 'user/LOAD_PROFILE',
      logout: 'user/AUTH_LOGOUT'
    })
  },
  beforeMount () {
    if (!localStorage.getItem('user-token')) {
      this.$router.push('/login')
      this.show = true
    } else {
      this.loadProfile()
        .then(() => {
          this.show = true
          if (this.profile.interests[0].subinterests.length) {
            this.$router.push('/chats')
          }
        })
        .catch(() => {
          this.logout()
        })
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
