<script setup>
import { useCart } from '../composables/useCart'

const { state, subtotal, close, increment, decrement, remove } = useCart()
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
              <span class="line__price">{{ item.price * item.qty }}€</span>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="state.items.length > 0" class="drawer__footer">
        <div class="drawer__subtotal">
          <span>Subtotal</span>
          <span class="font-mono">{{ subtotal }}€</span>
        </div>
        <p class="drawer__note">Envío e impuestos calculados en el pago.</p>
        <button class="btn btn--solid drawer__checkout">Finalizar compra</button>
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
