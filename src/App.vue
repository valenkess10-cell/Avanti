<script setup>
import TheNavbar from './components/TheNavbar.vue'
import TheHero from './components/TheHero.vue'
import ProductGrid from './components/ProductGrid.vue'
import AboutSection from './components/AboutSection.vue'
import LocationSection from './components/LocationSection.vue'
import TheFooter from './components/TheFooter.vue'
import CartDrawer from './components/CartDrawer.vue'
</script>

<template>
  <TheNavbar />

  <main>
    <TheHero />
    <ProductGrid />
    <AboutSection />
    <LocationSection />
  </main>

  <TheFooter />
  <CartDrawer />
</template>