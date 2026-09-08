import { reactive } from 'vue'

const state = reactive({
  product: null,
})

export function useQuickView() {
  function open(product) {
    state.product = product
  }

  function close() {
    state.product = null
  }

  return { state, open, close }
}