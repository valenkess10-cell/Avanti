<script setup>
import { ref, computed } from 'vue'
import { products } from '../data/products'
import ProductCard from './ProductCard.vue'

const categories = ['Todo', ...new Set(products.map((p) => p.category))]
const active = ref('Todo')

const visible = computed(() =>
  active.value === 'Todo'
    ? products
    : products.filter((p) => p.category === active.value)
)
</script>

<template>
  <section id="coleccion" class="grid-section">
    <div class="wrap">
      <div class="grid-section__head">
        <div>
          <p class="eyebrow">Colección</p>
          <h2 class="grid-section__title">Piezas de temporada</h2>
        </div>

        <div class="grid-section__filters">
          <button
            v-for="cat in categories"
            :key="cat"
            class="filter"
            :class="{ 'filter--active': active === cat }"
            @click="active = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <transition-group tag="div" name="fade" class="grid">
        <ProductCard v-for="product in visible" :key="product.id" :product="product" />
      </transition-group>
    </div>
  </section>
</template>

<style scoped>
.grid-section {
  padding-bottom: var(--space-6);
}

.grid-section__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  border-bottom: 1px solid var(--line);
  padding-bottom: var(--space-3);
}

.grid-section__title {
  font-size: 2.2rem;
  margin-top: var(--space-1);
}

.grid-section__filters {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.filter {
  background: none;
  border: 1px solid var(--line);
  padding: 0.45rem 0.95rem;
  font-size: 0.78rem;
  color: var(--ink-soft);
  transition: all 0.2s ease;
}

.filter--active,
.filter:hover {
  border-color: var(--ink);
  color: var(--ink);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3) var(--space-3);
}

.grid > :nth-child(4n + 2),
.grid > :nth-child(4n + 3) {
  margin-top: var(--space-5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1080px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid > :nth-child(4n + 2),
  .grid > :nth-child(4n + 3) {
    margin-top: 0;
  }
  .grid > :nth-child(odd) {
    margin-top: var(--space-4);
  }
}

@media (max-width: 600px) {
  .grid-section__head {
    flex-direction: column;
    align-items: flex-start;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .grid > * {
    margin-top: 0 !important;
  }
}
</style>
