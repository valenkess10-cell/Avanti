import { ref } from 'vue'
import { products as fallbackProducts } from '../data/products'

const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID
const PRODUCTS_TABLE = import.meta.env.VITE_AIRTABLE_PRODUCTS_TABLE || 'Productos'
const STOCK_TABLE = import.meta.env.VITE_AIRTABLE_STOCK_TABLE || 'Stock'

// Mismos gradientes que products.js, para usar como fondo mientras carga la
// foto real (o como imagen final si un producto todavía no tiene fotos).
const FALLBACK_TONE = 'linear-gradient(155deg, #4A4A47 0%, #232321 100%)'

async function fetchAllRecords(tableName) {
  const records = []
  let offset

  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(tableName)}`)
    if (offset) url.searchParams.set('offset', offset)

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })

    if (!res.ok) {
      throw new Error(`Airtable respondió ${res.status} al pedir "${tableName}"`)
    }

    const data = await res.json()
    records.push(...data.records)
    offset = data.offset
  } while (offset)

  return records
}

// Junta las filas de "Stock" que pertenecen a un mismo producto y arma la
// lista de talles disponibles (con al menos un color con stock > 0).
function buildSizeOptions(productId, stockRecords) {
  const rows = stockRecords.filter((r) =>
    (r.fields.Producto || []).includes(productId)
  )

  const bySize = {}
  for (const row of rows) {
    const talle = row.fields.Talle
    const color = row.fields.Color
    const cantidad = row.fields.Cantidad || 0
    if (!talle) continue

    if (!bySize[talle]) bySize[talle] = { talle, total: 0, colores: [] }
    bySize[talle].total += cantidad
    if (color) {
      bySize[talle].colores.push({ color, cantidad })
    }
  }

  return Object.values(bySize)
}

function mapProduct(record, stockRecords) {
  const f = record.fields
  const sizeRows = buildSizeOptions(record.id, stockRecords)
  const photos = (f.Fotos || []).map((p) => p.url)

  return {
    id: record.id,
    name: f.Nombre || 'Producto sin nombre',
    category: f.Categoría || 'Sin categoría',
    price: f.Precio || 0,
    description: f.Descripción || '',
    image: photos[0] || null,
    images: photos,
    tone: FALLBACK_TONE,
    size: 'tall',
    fabric: f.Tela || '',
    fit: f.Calce || '',
    sizes: sizeRows.map((s) => s.talle).join(' - ') || 'Consultar',
    sizeOptions: sizeRows.map((s) => s.talle),
    stockBySize: sizeRows, // { talle, total, colores: [{ color, cantidad }] }
  }
}

// Estado compartido a nivel de módulo (mismo patrón que useCart y
// useContactPanel): sin importar cuántos componentes usen useProducts(), la
// consulta a Airtable se dispara una sola vez y todos leen el mismo dato.
const products = ref([])
const isLoading = ref(true)
const error = ref(null)
const usingFallback = ref(false)
let hasStartedLoad = false

export function useProducts() {
  async function load() {
    isLoading.value = true
    error.value = null

    if (!TOKEN || !BASE_ID) {
      // Todavía no se configuraron las credenciales: seguimos mostrando el
      // catálogo fijo para no dejar el sitio roto mientras se termina de
      // armar la base en Airtable.
      products.value = fallbackProducts
      usingFallback.value = true
      isLoading.value = false
      return
    }

    try {
      const [productRecords, stockRecords] = await Promise.all([
        fetchAllRecords(PRODUCTS_TABLE),
        fetchAllRecords(STOCK_TABLE),
      ])

      products.value = productRecords
        .filter((r) => r.fields.Activo)
        .map((r) => mapProduct(r, stockRecords))
        .filter((p) => p.sizeOptions.length > 0)

      usingFallback.value = false
    } catch (err) {
      console.error('No se pudo conectar con Airtable, muestro el catálogo de respaldo:', err)
      products.value = fallbackProducts
      usingFallback.value = true
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  // Solo la primera vez que se usa useProducts() en toda la app se dispara
  // la carga real; las siguientes veces reutilizan el mismo estado.
  if (!hasStartedLoad) {
    hasStartedLoad = true
    load()
  }

  return { products, isLoading, error, usingFallback, reload: load }
}