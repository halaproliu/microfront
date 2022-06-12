import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  // other options...
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++
    }
  }
})