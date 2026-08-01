<script setup>
import TheNavbar from './components/TheNavbar.vue'
import TheHero from './components/TheHero.vue'
import ProductGrid from './components/ProductGrid.vue'
import AboutSection from './components/AboutSection.vue'
import TheFooter from './components/TheFooter.vue'
import CartDrawer from './components/CartDrawer.vue'
</script>

<template>
  <TheNavbar />

  <main>
    <TheHero />
    <ProductGrid />
    <AboutSection />
  </main>

  <TheFooter />
  <CartDrawer />
</template>
