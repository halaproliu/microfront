<template>
  <el-menu
    class="app-menu"
    :default-active="activeIndex"
    background-color="#324157"
    text-color="#bfcbd9"
    active-text-color="#20a0ff"
    @select="handleSelect">
    <el-menu-item :class="{'active': isActive(menu.path)}" v-for="menu in menus" :index="menu.index" :key="menu.name">
      <!-- <router-link :to="menu.path">{{ menu.name }}</router-link> -->
      {{ menu.name }}
    </el-menu-item>
  </el-menu>
  <div id="singleVue"></div>
  <div id="singleVue2"></div>
  <div id="singleReact"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const activeIndex = ref('1')
const menus = ref([{
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
}])

onMounted(() => {})


const handleSelect = (key) => {
  const menu = menus.value.find(item => item.index === key)
  activeIndex.value = key
  history.pushState({key}, '', menu.path)
}

const isActive = path => {
  return location.pathname === path
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
  color #20a0ff
  a
    color #20a0ff
</style>
