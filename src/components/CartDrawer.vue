<script setup>
import { ref } from 'vue'
import { useCart } from '../composables/useCart'

const { state, subtotal, close, increment, decrement, remove, checkout } = useCart()

const isSending = ref(false)

function handleCheckout() {
  if (isSending.value || state.items.length === 0) return
  isSending.value = true
  // Deja ver la animación un instante antes de saltar a WhatsApp,
  // así el click se siente "confirmado" en vez de un salto brusco.
  setTimeout(() => {
    checkout()
    isSending.value = false
  }, 550)
}
</script>

<template>
  <transition name="overlay">
    <div v-if="state.isOpen" class="overlay" @click="close"></div>
  </transition>

  <transition name="drawer">
    <aside v-if="state.isOpen" class="drawer" aria-label="Carrito de compras">
      <div class="drawer__head">
        <h2 class="drawer__title">Tu carrito</h2>
        <button class="drawer__close" @click="close" aria-label="Cerrar carrito">✕</button>
      </div>

      <div v-if="state.items.length === 0" class="drawer__empty">
        <p>Tu carrito está vacío por ahora.</p>
        <button class="btn" @click="close">Seguir viendo la colección</button>
      </div>

      <ul v-else class="drawer__list">
        <li v-for="item in state.items" :key="item.id" class="line">
          <div class="line__image" :style="{ background: item.tone }"></div>

          <div class="line__body">
            <div class="line__row">
              <span class="line__name">{{ item.name }}</span>
              <button class="line__remove" @click="remove(item.id)" aria-label="Quitar producto">✕</button>
            </div>
            <span class="line__fabric">{{ item.fabric }}</span>

            <div class="line__row line__row--bottom">
              <div class="stepper">
                <button @click="decrement(item.id)" aria-label="Restar unidad">−</button>
                <span>{{ item.qty }}</span>
                <button @click="increment(item.id)" aria-label="Sumar unidad">+</button>
              </div>
              <span class="line__price">${{ (item.price * item.qty).toLocaleString('es-AR') }}</span>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="state.items.length > 0" class="drawer__footer">
        <div class="drawer__subtotal">
          <span>Subtotal</span>
          <span class="font-mono">${{ subtotal.toLocaleString('es-AR') }}</span>
        </div>
        <p class="drawer__note">Coordinamos envío y pago por WhatsApp.</p>
        <button
          class="btn btn--solid drawer__checkout"
          :class="{ 'is-sending': isSending }"
          :disabled="isSending"
          @click="handleCheckout"
        >
          <span class="drawer__checkout-label">Finalizar compra por WhatsApp</span>
          <svg class="drawer__checkout-check" viewBox="0 0 24 24" fill="none">
            <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </aside>
  </transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(28, 27, 25, 0.35);
  z-index: 50;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(420px, 100%);
  background: var(--paper);
  z-index: 51;
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 40px rgba(28, 27, 25, 0.12);
}

.drawer__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-3);
  border-bottom: 1px solid var(--line);
}

.drawer__title {
  font-size: 1.3rem;
}

.drawer__close {
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--ink-soft);
}

.drawer__empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-4);
}

.drawer__list {
  list-style: none;
  margin: 0;
  padding: 0 var(--space-3);
  overflow-y: auto;
  flex: 1;
}

.line {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--line);
}

.line__image {
  width: 74px;
  height: 96px;
  flex-shrink: 0;
}

.line__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.line__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.line__row--bottom {
  margin-top: auto;
}

.line__name {
  font-size: 0.92rem;
}

.line__remove {
  background: none;
  border: none;
  color: var(--ink-soft);
  font-size: 0.75rem;
}

.line__fabric {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--ink-soft);
}

.line__price {
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.stepper {
  display: flex;
  align-items: center;
  border: 1px solid var(--line);
}

.stepper button {
  background: none;
  border: none;
  width: 26px;
  height: 26px;
  color: var(--ink);
}

.stepper span {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  min-width: 20px;
  text-align: center;
}

.drawer__footer {
  padding: var(--space-3);
  border-top: 1px solid var(--line);
}

.drawer__subtotal {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: var(--space-1);
}

.drawer__note {
  font-size: 0.75rem;
  margin-bottom: var(--space-3);
}

.drawer__checkout {
  width: 100%;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.15s ease;
}

.drawer__checkout:active {
  transform: scale(0.97);
}

.drawer__checkout-label,
.drawer__checkout-check {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
}

.drawer__checkout-check {
  position: absolute;
  width: 22px;
  height: 22px;
  color: var(--paper);
  opacity: 0;
  transform: scale(0.4);
}

.drawer__checkout.is-sending {
  animation: checkout-pulse 0.55s ease;
}

.drawer__checkout.is-sending .drawer__checkout-label {
  opacity: 0;
  transform: translateY(-14px);
}

.drawer__checkout.is-sending .drawer__checkout-check {
  opacity: 1;
  transform: scale(1);
}

@keyframes checkout-pulse {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(0.96);
  }
  60% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
</style>