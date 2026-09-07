<script setup>
import { ref, computed, watch } from 'vue'
import { useCart } from '../composables/useCart'

const props = defineProps({
  product: { type: Object, required: true },
})

const { add } = useCart()

// stockBySize solo existe para productos que vienen de Airtable. El catálogo
// de respaldo (sin Airtable configurado) no lo tiene, así que todo se maneja
// como "siempre disponible" en ese caso.
const hasStockInfo = computed(() => Array.isArray(props.product.stockBySize))

const selectedSize = ref(props.product.sizeOptions[0])

const sizeInfo = computed(() =>
  hasStockInfo.value
    ? props.product.stockBySize.find((s) => s.talle === selectedSize.value)
    : null
)

const colorOptions = computed(() => sizeInfo.value?.colores || [])
const selectedColor = ref(colorOptions.value[0]?.color || null)

watch(selectedSize, () => {
  selectedColor.value = colorOptions.value[0]?.color || null
})

function stockForSize(talle) {
  if (!hasStockInfo.value) return null
  return props.product.stockBySize.find((s) => s.talle === talle)?.total ?? 0
}

const isSoldOut = computed(() => {
  if (!hasStockInfo.value) return false
  if (colorOptions.value.length === 0) return (sizeInfo.value?.total ?? 0) <= 0
  const colorStock = colorOptions.value.find((c) => c.color === selectedColor.value)
  return (colorStock?.cantidad ?? 0) <= 0
})

function handleAdd() {
  if (isSoldOut.value) return
  add(props.product, selectedSize.value, selectedColor.value)
}
</script>

<template>
  <article class="card" :class="`card--${product.size}`">
    <div class="card__image" :style="{ background: product.tone }">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="card__photo"
        loading="lazy"
      />

      <div class="card__picker">
        <div class="card__sizes" role="group" aria-label="Elegir talle">
          <button
            v-for="opt in product.sizeOptions"
            :key="opt"
            type="button"
            class="card__size"
            :class="{ 'is-active': selectedSize === opt, 'is-disabled': stockForSize(opt) === 0 }"
            :disabled="stockForSize(opt) === 0"
            @click="selectedSize = opt"
          >
            {{ opt }}
          </button>
        </div>

        <div v-if="colorOptions.length > 1" class="card__colors" role="group" aria-label="Elegir color">
          <button
            v-for="c in colorOptions"
            :key="c.color"
            type="button"
            class="card__color-chip"
            :class="{ 'is-active': selectedColor === c.color, 'is-disabled': c.cantidad === 0 }"
            :disabled="c.cantidad === 0"
            @click="selectedColor = c.color"
          >
            {{ c.color }}
          </button>
        </div>
      </div>

      <button
        class="card__add"
        :class="{ 'is-disabled': isSoldOut }"
        :disabled="isSoldOut"
        @click="handleAdd"
        :aria-label="`Añadir ${product.name}, talle ${selectedSize}, al carrito`"
      >
        <template v-if="isSoldOut">Sin stock en este talle/color</template>
        <template v-else>
          Añadir · Talle {{ selectedSize }}<span v-if="selectedColor"> · {{ selectedColor }}</span>
        </template>
      </button>

      <div class="card__tag">
        <span>{{ product.fabric }}</span>
        <span>{{ product.fit }}</span>
      </div>
    </div>

    <div class="card__info">
      <div class="card__row">
        <h3 class="card__name">{{ product.name }}</h3>
        <span class="card__price">${{ product.price.toLocaleString('es-AR') }}</span>
      </div>
      <p class="card__category">{{ product.category }} · Talles {{ product.sizes }}</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
}

.card__image {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.card__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card--short .card__image {
  aspect-ratio: 3 / 3.4;
}

.card__picker {
  position: absolute;
  left: var(--space-2);
  right: var(--space-2);
  bottom: calc(var(--space-2) + 2.6rem);
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.card:hover .card__picker {
  opacity: 1;
  transform: translateY(0);
}

.card__sizes,
.card__colors {
  display: flex;
  gap: 6px;
}

.card__size,
.card__color-chip {
  flex: 1;
  background: var(--paper);
  border: 1px solid var(--line);
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 0.35rem 0;
}

.card__color-chip {
  text-transform: capitalize;
}

.card__size.is-active,
.card__color-chip.is-active {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--bone);
}

.card__size.is-disabled,
.card__color-chip.is-disabled {
  color: var(--line);
  text-decoration: line-through;
  cursor: not-allowed;
}

.card__add {
  position: absolute;
  left: var(--space-2);
  right: var(--space-2);
  bottom: var(--space-2);
  background: var(--paper);
  border: none;
  padding: 0.7rem;
  font-size: 0.74rem;
  letter-spacing: 0.02em;
  color: var(--ink);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.25s ease, transform 0.25s ease, background 0.25s ease;
}

.card:hover .card__add {
  opacity: 1;
  transform: translateY(0);
}

.card__add:hover {
  background: var(--ink);
  color: var(--bone);
}

.card__add.is-disabled {
  color: var(--ink-soft);
  cursor: not-allowed;
}

.card__add.is-disabled:hover {
  background: var(--paper);
  color: var(--ink-soft);
}

/* Elemento firma: etiqueta de composición, como una etiqueta de tela real,
   visible en hover, coherente con la del hero. */
.card__tag {
  position: absolute;
  top: var(--space-2);
  right: -6px;
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 0.4rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transform: rotate(3deg);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.card:hover .card__tag {
  opacity: 1;
}

.card__tag span {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.02em;
  color: var(--ink-soft);
  white-space: nowrap;
}

.card__info {
  padding-top: var(--space-2);
}

.card__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
}

.card__name {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
  line-height: 1.25;
}

.card__price {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--ink-soft);
  white-space: nowrap;
}

.card__category {
  font-size: 0.78rem;
  margin-top: 2px;
  color: var(--ink-soft);
}

@media (max-width: 780px) {
  .card__tag,
  .card__add,
  .card__picker {
    opacity: 1;
    transform: none;
  }
}
</style>