<template>
  <div class="txt">{{text}}</div>
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

<style>
.txt {
  color: red;
}
</style>