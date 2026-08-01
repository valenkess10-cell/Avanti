<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '../composables/useCart'

const { count, open } = useCart()

const scrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const links = ['Colección', 'Básicos', 'Sobre FORME', 'Contacto']
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="wrap nav__inner">
      <a href="#" class="nav__logo">FORME</a>

      <nav class="nav__links">
        <a v-for="link in links" :key="link" href="#" class="nav__link">{{ link }}</a>
      </nav>

      <div class="nav__actions">
        <button class="nav__icon-btn" @click="open" aria-label="Abrir carrito">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
            <path d="M6 8h12l-1 12H7L6 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
          <span v-if="count > 0" class="nav__badge">{{ count }}</span>
        </button>

        <button class="nav__icon-btn nav__burger" @click="menuOpen = !menuOpen" aria-label="Abrir menú">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>

    <transition name="fade-down">
      <div v-if="menuOpen" class="nav__mobile">
        <a v-for="link in links" :key="link" href="#" @click="menuOpen = false">{{ link }}</a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  border-bottom: 1px solid transparent;
  transition: background 0.35s ease, border-color 0.35s ease;
}

.nav--scrolled {
  background: rgba(239, 238, 234, 0.92);
  backdrop-filter: blur(10px);
  border-color: var(--line);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
}

.nav__logo {
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: 0.08em;
}

.nav__links {
  display: flex;
  gap: var(--space-4);
}

.nav__link {
  font-size: 0.85rem;
  color: var(--ink-soft);
  position: relative;
  padding-bottom: 2px;
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 1px;
  background: var(--ink);
  transition: width 0.25s ease;
}

.nav__link:hover {
  color: var(--ink);
}

.nav__link:hover::after {
  width: 100%;
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.nav__icon-btn {
  position: relative;
  background: none;
  border: none;
  color: var(--ink);
  padding: 0.3rem;
  display: flex;
}

.nav__badge {
  position: absolute;
  top: -4px;
  right: -6px;
  background: var(--moss);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav__burger {
  display: none;
}

.nav__mobile {
  display: none;
}

@media (max-width: 780px) {
  .nav__links {
    display: none;
  }
  .nav__burger {
    display: flex;
  }
  .nav__mobile {
    display: flex;
    flex-direction: column;
    background: var(--bone);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    padding: var(--space-2) var(--space-2);
    gap: var(--space-2);
  }
  .nav__mobile a {
    font-size: 0.95rem;
  }
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
