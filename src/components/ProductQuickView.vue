<script setup>
import { ref, computed, watch } from 'vue'
import { useQuickView } from '../composables/useQuickView'
import { useCart } from '../composables/useCart'
import { getColorHex } from '../utils/colorSwatch'

const { state, close } = useQuickView()
const { add } = useCart()

const activePhoto = ref(0)
const selectedSize = ref(null)
const selectedColor = ref(null)

const hasStockInfo = computed(() => Array.isArray(state.product?.stockBySize))

const sizeInfo = computed(() =>
  hasStockInfo.value
    ? state.product.stockBySize.find((s) => s.talle === selectedSize.value)
    : null
)

const colorOptions = computed(() => sizeInfo.value?.colores || [])

const isSoldOut = computed(() => {
  if (!hasStockInfo.value) return false
  if (colorOptions.value.length === 0) return (sizeInfo.value?.total ?? 0) <= 0
  const colorStock = colorOptions.value.find((c) => c.color === selectedColor.value)
  return (colorStock?.cantidad ?? 0) <= 0
})

function stockForSize(talle) {
  if (!hasStockInfo.value) return null
  return state.product.stockBySize.find((s) => s.talle === talle)?.total ?? 0
}

// Cada vez que se abre un producto nuevo, reiniciamos las selecciones.
watch(
  () => state.product,
  (product) => {
    activePhoto.value = 0
    selectedSize.value = product?.sizeOptions?.[0] || null
  }
)

watch(selectedSize, () => {
  selectedColor.value = colorOptions.value[0]?.color || null
})

function handleAdd() {
  if (isSoldOut.value) return
  add(state.product, selectedSize.value, selectedColor.value)
  close()
}

const gallery = computed(() =>
  state.product?.images?.length ? state.product.images : []
)
</script>

<template>
  <transition name="fade">
    <div v-if="state.product" class="quickview">
      <div class="quickview__overlay" @click="close" />

      <div class="quickview__panel">
        <button class="quickview__close" aria-label="Cerrar" @click="close">✕</button>

        <div class="quickview__gallery">
          <div class="quickview__photo" :style="{ background: state.product.tone }">
            <img
              v-if="gallery.length"
              :src="gallery[activePhoto]"
              :alt="state.product.name"
            />
          </div>

          <div v-if="gallery.length > 1" class="quickview__thumbs">
            <button
              v-for="(photo, i) in gallery"
              :key="photo"
              class="quickview__thumb"
              :class="{ 'is-active': i === activePhoto }"
              @click="activePhoto = i"
            >
              <img :src="photo" :alt="`${state.product.name} foto ${i + 1}`" />
            </button>
          </div>
        </div>

        <div class="quickview__info">
          <p class="eyebrow">{{ state.product.category }}</p>
          <h2 class="quickview__name">{{ state.product.name }}</h2>
          <p class="quickview__price">${{ state.product.price.toLocaleString('es-AR') }}</p>

          <p v-if="state.product.description" class="quickview__desc">
            {{ state.product.description }}
          </p>

          <div class="quickview__specs">
            <span v-if="state.product.fabric">{{ state.product.fabric }}</span>
            <span v-if="state.product.fit">{{ state.product.fit }}</span>
          </div>

          <div class="quickview__picker">
            <p class="quickview__picker-label">Talle</p>
            <div class="quickview__sizes">
              <button
                v-for="opt in state.product.sizeOptions"
                :key="opt"
                class="quickview__chip"
                :class="{ 'is-active': selectedSize === opt, 'is-disabled': stockForSize(opt) === 0 }"
                :disabled="stockForSize(opt) === 0"
                @click="selectedSize = opt"
              >
                {{ opt }}
              </button>
            </div>

            <template v-if="colorOptions.length > 1">
              <p class="quickview__picker-label">Color</p>
              <div class="quickview__sizes">
                <button
                  v-for="c in colorOptions"
                  :key="c.color"
                  class="quickview__chip"
                  :class="{ 'is-active': selectedColor === c.color, 'is-disabled': c.cantidad === 0 }"
                  :disabled="c.cantidad === 0"
                  @click="selectedColor = c.color"
                >
                  <span class="quickview__swatch" :style="{ background: getColorHex(c.color) }"></span>
                  {{ c.color }}
                </button>
              </div>
            </template>
          </div>

          <button class="btn btn--solid quickview__add" :disabled="isSoldOut" @click="handleAdd">
            <template v-if="isSoldOut">Sin stock en este talle/color</template>
            <template v-else>Añadir al carrito</template>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.quickview {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3);
}

.quickview__overlay {
  position: fixed;
  inset: 0;
  background: rgba(22, 21, 19, 0.5);
}

.quickview__panel {
  position: relative;
  background: var(--paper);
  max-width: 920px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  padding: var(--space-4);
}

.quickview__close {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  background: var(--bone);
  border: 1px solid var(--line);
  width: 32px;
  height: 32px;
  color: var(--ink);
  z-index: 2;
}

.quickview__photo {
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.quickview__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.quickview__thumbs {
  display: flex;
  gap: 8px;
  margin-top: var(--space-2);
}

.quickview__thumb {
  width: 56px;
  height: 72px;
  padding: 0;
  border: 1px solid var(--line);
  overflow: hidden;
  opacity: 0.6;
}

.quickview__thumb.is-active {
  opacity: 1;
  border-color: var(--ink);
}

.quickview__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.quickview__name {
  font-size: 1.8rem;
  margin: var(--space-1) 0 var(--space-1);
}

.quickview__price {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  margin-bottom: var(--space-3);
}

.quickview__desc {
  font-size: 0.9rem;
  color: var(--ink-soft);
  line-height: 1.5;
  margin-bottom: var(--space-3);
}

.quickview__specs {
  display: flex;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-bottom: var(--space-4);
}

.quickview__picker-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ink-soft);
  margin-bottom: 6px;
}

.quickview__sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: var(--space-3);
}

.quickview__chip {
  background: var(--bone);
  border: 1px solid var(--line);
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.quickview__swatch {
  width: 10px;
  height: 10px;
  border: 1px solid var(--line);
  flex-shrink: 0;
}

.quickview__chip.is-active {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--bone);
}

.quickview__chip.is-disabled {
  color: var(--line);
  text-decoration: line-through;
  cursor: not-allowed;
}

.quickview__add {
  width: 100%;
  justify-content: center;
  margin-top: var(--space-2);
}

.quickview__add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 780px) {
  .quickview__panel {
    grid-template-columns: 1fr;
    padding: var(--space-3);
  }
}
</style>