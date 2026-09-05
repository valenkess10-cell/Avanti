import { reactive } from 'vue'

const state = reactive({
  query: '',
})

export function useProductSearch() {
  function setQuery(value) {
    state.query = value
  }

  function clear() {
    state.query = ''
  }

  return { state, setQuery, clear }
}