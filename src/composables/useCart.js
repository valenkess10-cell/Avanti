import { reactive, computed } from 'vue'

// Estado compartido a nivel de módulo: cualquier componente que importe
// useCart() opera sobre la misma instancia reactiva (patrón singleton simple,
// suficiente para el alcance de esta tienda sin necesidad de Pinia/Vuex).
const state = reactive({
  items: [], // { key, id, name, price, tone, size, qty }
  isOpen: false,
})

// TODO: reemplazar por el número real del negocio.
// Formato: código de país + área sin el 0 + número sin el 15. Ej: Argentina, La Rioja capital: 549380XXXXXXX
const WHATSAPP_NUMBER = '5493800000000'

// Cada línea del carrito se identifica por producto + talle + color: así
// "Hoodie negro, talle M" y "Hoodie blanco, talle M" son renglones separados
// en vez de mezclarse en uno solo.
function lineKey(id, size, color) {
  return `${id}::${size}::${color || 'sin-color'}`
}

function formatPrice(value) {
  return value.toLocaleString('es-AR')
}

function buildOrderMessage(items, subtotal) {
  const lines = items.map((item) => {
    const detalle = item.color ? `Talle ${item.size} · ${item.color}` : `Talle ${item.size}`
    return `• ${item.qty}x ${item.name} (${detalle}) — $${formatPrice(item.price * item.qty)}`
  })

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

  function add(product, size, color) {
    const key = lineKey(product.id, size, color)
    const existing = state.items.find((item) => item.key === key)
    if (existing) {
      existing.qty++
    } else {
      state.items.push({ ...product, size, color, key, qty: 1 })
    }
    state.isOpen = true
  }

  function remove(key) {
    state.items = state.items.filter((item) => item.key !== key)
  }

  function increment(key) {
    const item = state.items.find((i) => i.key === key)
    if (item) item.qty++
  }

  function decrement(key) {
    const item = state.items.find((i) => i.key === key)
    if (item && item.qty > 1) item.qty--
    else if (item) remove(key)
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
    if (state.items.length === 0) return

    const message = buildOrderMessage(state.items, subtotal.value)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.location.href = url
  }

  return { state, count, subtotal, add, remove, increment, decrement, open, close, checkout }
}