<template>
  <div class="txt">
    <span>{{text}}</span>
    <react-button :text="btnText" :onClick="incrementCount"></react-button>
    <span>按钮点击次数：</span>{{clickedCount}}
    <div>counter: {{ store.counter }}</div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import ReactButton from './ReactButton'
import { useStore } from '@/store'
export default defineComponent({
  name: 'HomeItem',
  components: {
    ReactButton
  },
  setup () {
    const text = ref('Hello Single spa')
    const btnText = ref('increment')
    const clickedCount = ref(0)
    const store = useStore()
    const incrementCount = () => {
      clickedCount.value++
      store.increment()
    }
    return {
      text,
      btnText,
      clickedCount,
      store,
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