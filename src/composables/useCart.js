import { reactive, computed } from 'vue'

// Estado compartido a nivel de módulo: cualquier componente que importe
// useCart() opera sobre la misma instancia reactiva (patrón singleton simple,
// suficiente para el alcance de esta tienda sin necesidad de Pinia/Vuex).
const state = reactive({
  items: [], // { id, name, price, tone, qty }
  isOpen: false,
})

export function useCart() {
  const count = computed(() =>
    state.items.reduce((total, item) => total + item.qty, 0)
  )

  const subtotal = computed(() =>
    state.items.reduce((total, item) => total + item.qty * item.price, 0)
  )

  function add(product) {
    const existing = state.items.find((item) => item.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      state.items.push({ ...product, qty: 1 })
    }
    state.isOpen = true
  }

  function remove(id) {
    state.items = state.items.filter((item) => item.id !== id)
  }

  function increment(id) {
    const item = state.items.find((i) => i.id === id)
    if (item) item.qty++
  }

  function decrement(id) {
    const item = state.items.find((i) => i.id === id)
    if (item && item.qty > 1) item.qty--
    else if (item) remove(id)
  }

  function open() {
    state.isOpen = true
  }

  function close() {
    state.isOpen = false
  }

  return { state, count, subtotal, add, remove, increment, decrement, open, close }
}
