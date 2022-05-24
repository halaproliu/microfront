<template>
  <div>{{text}}</div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'HomeItem',
  setup () {
    const text = ref('Hello Single spa')
    return {
      text
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>