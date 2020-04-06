<template>
  <div class="chats">
    <div class="chats__title">
      <h2>Let’s talk!</h2>
    </div>
    <div class="chats__items" v-if="localRooms">
      <router-link v-for="item in localRooms" :key="item.id" class="item" :to="{ path:`/chat/${item.id}`, params: { roomId: item.id } }">
        <div class="item__percent">
          <div class="item__percent_number">
            {{ Math.floor(item.info.intersect) + '%' }}
          </div>
          <div class="item__percent_text">
            match
          </div>
        </div>
        <div class="item__interests">
          <div>{{ profile.interests[0].title }}</div>
        </div>
        <div class="item__users">
          <img v-for="(user, index) in item.info.users"
               :key="index"
               :src="user.img_url"
               class="absolute"
               :style="'left: ' + (24 * index) + 'px;'"
               height="57"
               width="57"
               alt=""
          >
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      id: null,
      localRooms: []
    }
  },
  computed: {
    ...mapGetters({
      rooms: 'chats/rooms',
      create: 'chats/createRoom',
      profile: 'user/profile'
    })
  },
  methods: {
    ...mapActions({
      loadRooms: 'chats/LOAD_ROOMS'
    }),
    createRoom () {
      this.id = '_' + Math.random().toString(36).substr(2, 9)
      this.$router.push({ path: `/chat/${this.id}`, params: { roomId: this.id } })
    }
  },
  beforeMount () {
    this.loadRooms()
      .then(() => {
        for (const key in this.rooms) {
          const roomInfo = {
            id: key.substring(23),
            info: this.rooms[key]
          }
          this.localRooms.push(roomInfo)
        }
      })
      .catch(() => {
        if (this.create) {
          this.createRoom()
        }
      })
  }
}
</script>

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
