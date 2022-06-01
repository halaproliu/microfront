<template>
  <div class="txt">
    <span>{{text}}</span>
    <react-button :text="btnText" :onClick="incrementCount"></react-button>
    <span>按钮点击次数：</span>{{clickedCount}}
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import ReactButton from './ReactButton'
export default defineComponent({
  name: 'HomeItem',
  components: {
    ReactButton
  },
  setup () {
    const text = ref('Hello Single spa')
    const btnText = ref('increment')
    const clickedCount = ref(0)
    const incrementCount = () => {
      clickedCount.value += 1
    }
    return {
      text,
      btnText,
      clickedCount,
      incrementCount
    }
  }
});
</script>

<style>
.txt {
  color: red;
}
</style>