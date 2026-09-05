<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useCart } from '../composables/useCart'
import { useContactPanel } from '../composables/useContactPanel'
import { useProductSearch } from '../composables/useProductSearch.js'
import ContactMenu from './ContactMenu.vue'

const { count, open } = useCart()
const { toggle: toggleContact } = useContactPanel()
const { state: search, setQuery, clear: clearSearch } = useProductSearch()

const scrolled = ref(false)
const menuOpen = ref(false)
const searchOpen = ref(false)
const searchInput = ref(null)

function handleScroll() {
  scrolled.value = window.scrollY > 24
}

function scrollToLocation() {
  document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' })
  menuOpen.value = false
}

async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  } else {
    clearSearch()
  }
}

function goToResults() {
  document.getElementById('coleccion')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const links = ['Colección', 'Básicos', 'Sobre Avanti']
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="wrap nav__inner">
      <a href="#" class="nav__logo">AVANTI</a>

      <nav class="nav__links">
        <a v-for="link in links" :key="link" href="#" class="nav__link">{{ link }}</a>
        <button class="nav__link nav__link--btn" @click="toggleContact">Contacto</button>
      </nav>

      <div class="nav__actions">
        <div class="nav__search" :class="{ 'is-open': searchOpen }">
          <input
            ref="searchInput"
            type="text"
            placeholder="Buscar productos..."
            :value="search.query"
            @input="setQuery($event.target.value)"
            @keyup.enter="goToResults"
            @keyup.esc="toggleSearch"
          />
          <button class="nav__icon-btn" @click="toggleSearch" aria-label="Buscar productos">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </div>

        <ContactMenu />

        <button class="nav__icon-btn" @click="scrollToLocation" aria-label="Ver ubicación del local">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
            <path d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.6" r="2.4" />
          </svg>
        </button>

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
        <button class="nav__mobile-btn" @click="toggleContact(); menuOpen = false">Contacto</button>
        <button class="nav__mobile-btn" @click="scrollToLocation">Ubicación</button>
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
  background: rgba(246, 245, 242, 0.92);
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
  font-family: var(--font-logo);
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.01em;
  transform: skewX(-8deg);
  display: inline-block;
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

.nav__link--btn {
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
}

.nav__search {
  display: flex;
  align-items: center;
}

.nav__search input {
  width: 0;
  opacity: 0;
  border: none;
  border-bottom: 1px solid transparent;
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--ink);
  padding: 0.3rem 0;
  transition: width 0.25s ease, opacity 0.2s ease, border-color 0.25s ease;
}

.nav__search.is-open input {
  width: 160px;
  opacity: 1;
  border-color: var(--line);
  margin-right: var(--space-1);
}

.nav__search input:focus {
  outline: none;
  border-color: var(--ink);
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
  .nav__mobile-btn {
    background: none;
    border: none;
    font-family: inherit;
    font-size: 0.95rem;
    color: var(--ink);
    text-align: left;
    padding: 0;
    cursor: pointer;
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