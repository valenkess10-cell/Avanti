<script setup>
import { ref } from 'vue'

const open = ref(false)

// Datos de ejemplo: reemplazar por los datos reales del negocio.
const contact = {
  whatsappNumber: '5493800000000',
  whatsappDisplay: '+54 9 380 000-0000',
  email: 'contacto@avanti.com',
  instagram: '@avanti.gram',
}

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="contact">
    <button class="nav__icon-btn" @click="toggle" aria-label="Ver datos de contacto">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
        <path d="M4 6h16v12H4z" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    </button>

    <transition name="fade-down">
      <div v-if="open" class="contact__panel" @click="open = false">
        <a
          :href="`https://wa.me/${contact.whatsappNumber}`"
          target="_blank"
          rel="noopener"
          class="contact__row"
        >
          <span class="contact__label">WhatsApp</span>
          <span>{{ contact.whatsappDisplay }}</span>
        </a>

        <a :href="`mailto:${contact.email}`" class="contact__row">
          <span class="contact__label">Email</span>
          <span>{{ contact.email }}</span>
        </a>

        <a
          href="https://instagram.com/avanti.gram"
          target="_blank"
          rel="noopener"
          class="contact__row"
        >
          <span class="contact__label">Instagram</span>
          <span>{{ contact.instagram }}</span>
        </a>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.contact {
  position: relative;
}

.contact__panel {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  background: var(--paper);
  border: 1px solid var(--line);
  padding: var(--space-2);
  min-width: 230px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 10px 24px rgba(28, 27, 25, 0.12);
  z-index: 60;
}

.contact__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
  font-size: 0.82rem;
  color: var(--ink);
}

.contact__row:hover {
  color: var(--moss);
}

.contact__label {
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.fade-down-enter-active,
.fade-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>