<script setup>
import { ref, computed } from 'vue'
import { useProducts } from '../composables/useProducts'
import { useProductSearch } from '../composables/useProductSearch'
import { getColorHex } from '../utils/colorSwatch'
import ProductCard from './ProductCard.vue'

const { products, isLoading, usingFallback } = useProducts()
const { state: search, setQuery } = useProductSearch()

const categories = computed(() => ['Todo', ...new Set(products.value.map((p) => p.category))])
const activeCategory = ref('Todo')

const allSizes = computed(() => {
  const sizes = new Set()
  products.value.forEach((p) => p.sizeOptions.forEach((s) => sizes.add(s)))
  return [...sizes]
})

const allColors = computed(() => {
  const colors = new Set()
  products.value.forEach((p) =>
    (p.stockBySize || []).forEach((s) => s.colores.forEach((c) => colors.add(c.color)))
  )
  return [...colors]
})

const activeSizes = ref([])
const activeColors = ref([])

// OJO: en el <template>, Vue "desenvuelve" automáticamente los refs cuando
// se acceden por su nombre (ej. "activeSizes" ya te da el array, no el ref).
// Por eso una función genérica que reciba el ref como parámetro no funciona
// bien llamada desde el template — de ahí que los filtros no respondían al
// click. Usamos una función dedicada por cada lista en su lugar.
function toggleSize(value) {
  const i = activeSizes.value.indexOf(value)
  if (i === -1) activeSizes.value.push(value)
  else activeSizes.value.splice(i, 1)
}

function toggleColor(value) {
  const i = activeColors.value.indexOf(value)
  if (i === -1) activeColors.value.push(value)
  else activeColors.value.splice(i, 1)
}

function clearFilters() {
  activeCategory.value = 'Todo'
  activeSizes.value = []
  activeColors.value = []
}

const hasActiveFilters = computed(
  () => activeCategory.value !== 'Todo' || activeSizes.value.length || activeColors.value.length
)

const visible = computed(() => {
  let list = products.value

  if (activeCategory.value !== 'Todo') {
    list = list.filter((p) => p.category === activeCategory.value)
  }

  if (activeSizes.value.length) {
    list = list.filter((p) => p.sizeOptions.some((s) => activeSizes.value.includes(s)))
  }

  if (activeColors.value.length) {
    list = list.filter((p) =>
      (p.stockBySize || []).some((s) =>
        s.colores.some((c) => activeColors.value.includes(c.color))
      )
    )
  }

  const query = search.query.trim().toLowerCase()
  if (query) {
    list = list.filter(
      (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    )
  }

  // Alterna el alto de las tarjetas para el efecto escalonado de la grilla,
  // sin depender de un campo manual por producto.
  return list.map((p, i) => ({ ...p, size: i % 2 === 0 ? 'tall' : 'short' }))
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
      </div>

      <div class="grid-section__body">
        <aside class="filters">
          <div class="filters__block">
            <div class="filters__row">
              <p class="filters__label">Categoría</p>
              <button v-if="hasActiveFilters" class="filters__clear" @click="clearFilters">
                Limpiar
              </button>
            </div>
            <button
              v-for="cat in categories"
              :key="cat"
              class="filters__option"
              :class="{ 'is-active': activeCategory === cat }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>

          <div v-if="allSizes.length" class="filters__block">
            <p class="filters__label">Talle</p>
            <label v-for="s in allSizes" :key="s" class="filters__checkbox">
              <input
                type="checkbox"
                :value="s"
                :checked="activeSizes.includes(s)"
                @change="toggleSize(s)"
              />
              {{ s }}
            </label>
          </div>

          <div v-if="allColors.length" class="filters__block">
            <p class="filters__label">Color</p>
            <label v-for="c in allColors" :key="c" class="filters__checkbox">
              <input
                type="checkbox"
                :value="c"
                :checked="activeColors.includes(c)"
                @change="toggleColor(c)"
              />
              <span class="filters__swatch" :style="{ background: getColorHex(c) }"></span>
              {{ c }}
            </label>
          </div>
        </aside>

        <div class="grid-section__results">
          <p v-if="isLoading" class="grid-section__empty">Cargando productos...</p>

          <p v-else-if="visible.length === 0" class="grid-section__empty">
            No encontramos productos con estos filtros.
          </p>

          <transition-group v-else tag="div" name="fade" class="grid">
            <ProductCard v-for="product in visible" :key="product.id" :product="product" />
          </transition-group>
        </div>
      </div>
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

.grid-section__body {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-5);
  align-items: start;
}

.grid-section__results {
  min-width: 0;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  position: sticky;
  top: calc(var(--space-5) + 20px);
}

.filters__block {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filters__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.filters__label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-bottom: 4px;
}

.filters__clear {
  background: none;
  border: none;
  font-size: 0.7rem;
  color: var(--moss);
  text-decoration: underline;
  padding: 0;
}

.filters__option {
  background: none;
  border: none;
  text-align: left;
  padding: 0.25rem 0;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.filters__option.is-active,
.filters__option:hover {
  color: var(--ink);
}

.filters__option.is-active {
  font-weight: 600;
}

.filters__checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--ink-soft);
  cursor: pointer;
  padding: 0.15rem 0;
  text-transform: capitalize;
}

.filters__checkbox:hover {
  color: var(--ink);
}

.filters__checkbox input {
  accent-color: var(--ink);
  width: 14px;
  height: 14px;
}

.filters__swatch {
  width: 12px;
  height: 12px;
  border: 1px solid var(--line);
  flex-shrink: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3) var(--space-3);
}

.grid > :nth-child(3n + 2) {
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
  .grid-section__body {
    grid-template-columns: 160px 1fr;
    gap: var(--space-3);
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid > :nth-child(3n + 2) {
    margin-top: 0;
  }
  .grid > :nth-child(odd) {
    margin-top: var(--space-4);
  }
}

@media (max-width: 780px) {
  .grid-section__body {
    grid-template-columns: 1fr;
  }
  .filters {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-4);
    border-bottom: 1px solid var(--line);
    padding-bottom: var(--space-3);
    margin-bottom: var(--space-3);
  }
  .filters__block {
    min-width: 140px;
  }
}

@media (max-width: 600px) {
  .grid-section__head {
    flex-direction: column;
    align-items: flex-start;
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