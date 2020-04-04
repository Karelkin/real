<template>
  <q-page class="preview flex justify-between column items-center" :class="previewShow !== 'preview-0' ? 'bg-white' : ''">
    <transition name="fade">
      <preview0 v-show="previewShow === 'preview-0'" />
    </transition>
    <transition name="fade">
      <preview1 v-show="previewShow === 'preview-1'" />
    </transition>
    <transition name="fade">
      <preview2 v-show="previewShow === 'preview-2'" />
    </transition>
    <transition name="fade">
      <preview3 v-show="previewShow === 'preview-3'" />
    </transition>
    <transition name="fade">
      <preview4 v-show="previewShow === 'preview-4'" />
    </transition>
    <transition name="fade">
      <preview5 v-show="previewShow === 'preview-5'" />
    </transition>
    <div class="button" @click="nextPage" v-if="btnNextShow">
      <q-btn color="yellow-1" text-color="black" label="Next" size="24px" no-caps />
    </div>
    <div class="button" v-if="btnRedirectShow">
      <q-btn to="/main-interest" color="yellow-1" text-color="black" label="Customize your feed" size="24px" no-caps />
    </div>
  </q-page>
</template>

<script>
import Preview0 from '../components/Preview0'
import Preview1 from '../components/Preview1'
import Preview2 from '../components/Preview2'
import Preview3 from '../components/Preview3'
import Preview4 from '../components/Preview4'
import Preview5 from '../components/Preview5'

export default {
  data () {
    return {
      previewShow: 'preview-0',
      currentPage: 1,
      btnNextShow: false,
      btnRedirectShow: false
    }
  },
  components: {
    Preview0,
    Preview1,
    Preview2,
    Preview3,
    Preview4,
    Preview5
  },
  methods: {
    nextPage () {
      if (this.currentPage === 4) {
        this.btnNextShow = false
        this.btnRedirectShow = true
      }
      this.currentPage++
      this.previewShow = 'preview-' + this.currentPage
    }
  },
  beforeMount () {
    setTimeout(() => {
      this.previewShow = 'preview-1'
      this.btnNextShow = true
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.preview {
  background: #000000;
  transition: background .5s ease;
}
.button {
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 40px;
  button, a {
    opacity: 0.8;
    border-radius: 10px;
    width: 250px;
    height: 50px;
    font-weight: 400;
  }
}
.fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter-active{
  transition: opacity .5s .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
