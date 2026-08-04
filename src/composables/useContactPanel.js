import { reactive } from 'vue'

// Estado compartido a nivel de módulo, mismo patrón que useCart:
// tanto el ícono del sobre como el link "Contacto" del navbar
// controlan el mismo panel.
const state = reactive({
  isOpen: false,
})

export function useContactPanel() {
  function toggle() {
    state.isOpen = !state.isOpen
  }

  function close() {
    state.isOpen = false
  }

  return { state, toggle, close }
}   