<template>
  <div v-if="error">error loading button</div>
  <div v-else ref="root">loading button...</div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, onUpdated, defineComponent } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'
// const firstLoad = new Promise(resolve => setTimeout(resolve, 1000));
import { loadComponent, useDynamicScript } from '@/utils/asyncLoadModules'

async function fetchButton() {
  // simulate long network delay
  // await firstLoad;

  // uncomment to simulate failed load
  // throw new Error("Failed to load button from remote.");
  return (await import('commonUtils/MyButton')).default;
}
// async function fetchButton() {
//   const bool = await useDynamicScript('http://localhost:9004/remoteEntry.js')
//   if (bool) {
//     const Component = await loadComponent('commonUtils', './MyButton')
//     console.log(Component)
//     return Component
//   }
//   return {}
// }

export default defineComponent({
  props: {
    text: String,
    onClick: Function
  },
  setup(props) {
    const root = ref(null);
    const error = ref(null);
    const ButtonComponent = ref(null);
    const app = ref(null)

    function updateReactComponent() {
      if (!ButtonComponent.value || !!error.value) return;
      app.value = ReactDOM.createRoot(root.value)
      app.value.render(React.createElement(ButtonComponent.value, props))
    }

    function unmountReactComponent() {
      app.value && app.value.unmount()
    }

    onMounted(updateReactComponent);
    onUpdated(updateReactComponent);
    onBeforeUnmount(unmountReactComponent);

    fetchButton()
      .then(b => {
        ButtonComponent.value = b;
        updateReactComponent();
      })
      .catch(e => {
        error.value = e;
      });

    return { root, error };
  }
})
</script>