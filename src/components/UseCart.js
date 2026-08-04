import { reactive, computed } from 'vue'

// Estado compartido a nivel de módulo: cualquier componente que importe
// useCart() opera sobre la misma instancia reactiva (patrón singleton simple,
// suficiente para el alcance de esta tienda sin necesidad de Pinia/Vuex).
const state = reactive({
  items: [], // { id, name, price, tone, qty }
  isOpen: false,
})

// TODO: reemplazar por el número real del negocio.
// Formato: código de país + área sin el 0 + número sin el 15. Ej: Argentina, La Rioja capital: 549380XXXXXXX
const WHATSAPP_NUMBER = '5493800000000'

function formatPrice(value) {
  return value.toLocaleString('es-AR')
}

function buildOrderMessage(items, subtotal) {
  const lines = items.map(
    (item) => `• ${item.qty}x ${item.name} — $${formatPrice(item.price * item.qty)}`
  )

  return [
    'Hola! Quiero hacer este pedido:',
    '',
    ...lines,
    '',
    `Subtotal: $${formatPrice(subtotal)}`,
  ].join('\n')
}

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

  // Arma el pedido en texto y abre WhatsApp con el mensaje precargado.
  // No procesa pago: el negocio sigue coordinando envío/transferencia por chat,
  // solo que ahora recibe el pedido ya prolijo y sin tener que preguntar nada.
  function checkout() {
    console.log('checkout ejecutado', state.items)
    if (state.items.length === 0) return

    const message = buildOrderMessage(state.items, subtotal.value)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.location.href = url
  }

  return { state, count, subtotal, add, remove, increment, decrement, open, close, checkout }
}