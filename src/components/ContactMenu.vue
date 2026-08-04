<script setup>
import { useContactPanel } from '../composables/useContactPanel'

const { state, toggle, close } = useContactPanel()

// Datos de ejemplo: reemplazar por los datos reales del negocio.
const contact = {
  whatsappNumber: '5493800000000',
  whatsappDisplay: '+54 9 380 000-0000',
  email: 'contacto@avanti.com',
  instagram: '@avanti.gram',
}
</script>

<template>
  <button
    class="nav__icon-btn"
    :class="{ 'is-active': state.isOpen }"
    aria-label="Ver datos de contacto"
    @click="toggle"
  >
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  </button>

  <transition name="bar-drop">
    <div v-if="state.isOpen" class="contact-bar">
      <div class="contact-bar__inner wrap">
        <a :href="`https://wa.me/${contact.whatsappNumber}`" target="_blank" rel="noopener" class="contact-bar__item">
          <span class="contact-bar__label">WhatsApp</span>
          <span class="contact-bar__value">{{ contact.whatsappDisplay }}</span>
        </a>

        <a :href="`mailto:${contact.email}`" class="contact-bar__item">
          <span class="contact-bar__label">Email</span>
          <span class="contact-bar__value">{{ contact.email }}</span>
        </a>

        <a href="https://instagram.com/avanti.gram" target="_blank" rel="noopener" class="contact-bar__item">
          <span class="contact-bar__label">Instagram</span>
          <span class="contact-bar__value">{{ contact.instagram }}</span>
        </a>

        <button class="contact-bar__close" aria-label="Cerrar contacto" @click="close">✕</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.nav__icon-btn.is-active {
  color: var(--moss);
}

.contact-bar {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 39;
}

.contact-bar__inner {
  position: relative;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-top: var(--space-3);
  padding-bottom: var(--space-3);
  box-shadow: 0 12px 28px rgba(28, 27, 25, 0.1);
}

.contact-bar__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-bar__label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.contact-bar__value {
  font-size: 0.92rem;
  color: var(--ink);
}

.contact-bar__item:hover .contact-bar__value {
  color: var(--moss);
}

.contact-bar__close {
  margin-left: auto;
  background: none;
  border: none;
  color: var(--ink-soft);
  font-size: 0.95rem;
  padding: 0.3rem;
}

.contact-bar__close:hover {
  color: var(--ink);
}

.bar-drop-enter-active,
.bar-drop-leave-active {
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.bar-drop-enter-from,
.bar-drop-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (max-width: 780px) {
  .contact-bar__inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .contact-bar__close {
    position: absolute;
    top: var(--space-3);
    right: var(--space-2);
    margin-left: 0;
  }
}
</style>