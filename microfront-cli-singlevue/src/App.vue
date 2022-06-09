<template>
  <!-- <div>vue</div> -->
  <router-view></router-view>
</template>

<script setup>
import { onMounted, defineProps, toRefs } from 'vue'
const props = defineProps({
  name: {
    type: String,
  },
  singleSpa: {
    type: Object,
  },
  EventBus: {
    type: Function,
  },
})

const { EventBus } = toRefs(props)
onMounted(() => {
  EventBus?.value?.on('msgFromRoot', data => {
    console.log('vue:', data)
  })
})
</script>

<style></style>
