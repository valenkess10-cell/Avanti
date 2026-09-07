<script setup>
import { ref, computed } from 'vue'
import { useProducts } from '../composables/useProducts'
import { useProductSearch } from '../composables/useProductSearch'
import ProductCard from './ProductCard.vue'

const { products, isLoading, usingFallback } = useProducts()
const { state: search, setQuery } = useProductSearch()

const categories = computed(() => ['Todo', ...new Set(products.value.map((p) => p.category))])
const active = ref('Todo')

const visible = computed(() => {
  const byCategory =
    active.value === 'Todo'
      ? products.value
      : products.value.filter((p) => p.category === active.value)

  const query = search.query.trim().toLowerCase()
  const filtered = !query
    ? byCategory
    : byCategory.filter(
        (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      )

  // Alterna el alto de las tarjetas para el efecto escalonado de la grilla,
  // sin depender de un campo manual por producto.
  return filtered.map((p, i) => ({ ...p, size: i % 2 === 0 ? 'tall' : 'short' }))
})
</script>

<template>
  <section id="coleccion" class="grid-section">
    <div class="wrap">
      <p v-if="usingFallback" class="grid-section__notice">
        Mostrando catálogo de referencia — conectá Airtable para ver el stock real.
      </p>

      <div class="grid-section__head">
        <div>
          <p class="eyebrow">Colección</p>
          <h2 class="grid-section__title">Piezas de temporada</h2>
        </div>

        <div class="grid-section__controls">
          <div class="grid-section__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre o categoría..."
              :value="search.query"
              @input="setQuery($event.target.value)"
            />
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
      </div>

      <p v-if="isLoading" class="grid-section__empty">Cargando productos...</p>

      <p v-else-if="visible.length === 0" class="grid-section__empty">
        No encontramos productos que coincidan con "{{ search.query }}".
      </p>

      <transition-group v-else tag="div" name="fade" class="grid">
        <ProductCard v-for="product in visible" :key="product.id" :product="product" />
      </transition-group>
    </div>
  </section>
</template>

<style scoped>
.grid-section {
  padding-bottom: var(--space-6);
}

.grid-section__notice {
  background: var(--paper);
  border: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 0.8rem;
  padding: 0.6rem var(--space-2);
  margin-bottom: var(--space-3);
}

.grid-section__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  border-bottom: 1px solid var(--line);
  padding-bottom: var(--space-3);
  flex-wrap: wrap;
}

.grid-section__title {
  font-size: 2.2rem;
  margin-top: var(--space-1);
}

.grid-section__controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
}

.grid-section__search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--line);
  padding: 0.45rem 0.8rem;
  color: var(--ink-soft);
  min-width: 240px;
}

.grid-section__search:focus-within {
  border-color: var(--ink);
  color: var(--ink);
}

.grid-section__search input {
  border: none;
  background: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--ink);
  width: 100%;
}

.grid-section__search input:focus {
  outline: none;
}

.grid-section__empty {
  padding: var(--space-4) 0;
  font-size: 0.9rem;
  color: var(--ink-soft);
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
  .grid-section__controls {
    align-items: flex-start;
    width: 100%;
  }
  .grid-section__search {
    width: 100%;
    min-width: 0;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .grid > * {
    margin-top: 0 !important;
  }
}
</style>