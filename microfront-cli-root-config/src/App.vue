<template>
  <div id="app">
    <el-menu
      class="app-menu"
      :default-active="activeIndex"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      @select="handleSelect">
      <el-menu-item :class="{'active': isActive(menu.path)}" v-for="menu in menus" :index="menu.index" :key="menu.name">
        <router-link :to="menu.path">{{ menu.name }}</router-link>
      </el-menu-item>
    </el-menu>
    <!-- <div id="single-spa-application:singleVue"></div> -->
    <div id="singleVue"></div>
    <div id="singleVue2"></div>
    <div id="singleReact"></div>
  </div>
</template>

<script>
import { EventBus } from './appConfig'
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1',
      menus: [{
        path: '/vue',
        name: 'vue3',
        index: '2'
      }, {
        path: '/vue2',
        name: 'vue2',
        index: '3'
      }, {
        path: '/react',
        name: 'react',
        index: '4'
      }]
    }
  },
  created () {
    EventBus.emit({name: 'msgFromRoot', data: 'root msg'})
  },
  methods: {
    handleSelect (key) {
      this.activeIndex = key
    },
    isActive (path) {
      return this.$route.path === path
    }
  }
}
</script>

<style lang="stylus">
body
  margin 0
#app
  display flex
  flex 1
.app-menu
  width 200px
  height 100vh
.el-menu
  text-align center
  a
    color #bfcbd9
    display block
.active
  a
    color #20a0ff
</style>
