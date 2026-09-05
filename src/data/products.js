// Fotos reales de producto.
import remeraLosAngeles32Blanca from '../assets/products/remera-los-angeles-32-blanca.png'
import remeraChicago23 from '../assets/products/remera-chicago-23.png'
import remeraHarshcruel from '../assets/products/remera-harshcruel.png'
import remeraLosAngeles32Negra from '../assets/products/remera-los-angeles-32-negra.png'
import hoodieRmdyStudios from '../assets/products/hoodie-rmdy-studios.png'
import hoodieOjoNegro from '../assets/products/hoodie-ojo-negro.png'
import hoodieSayko from '../assets/products/hoodie-sayko.png'
import hoodieBelowZero from '../assets/products/hoodie-below-zero.png'

// Paleta de gradientes: se usan como fondo mientras la foto real carga (y
// como imagen final para los productos que no tengan foto todavía).
const tones = {
  negro: 'linear-gradient(155deg, #2A2A28 0%, #0E0E0D 100%)',
  carbon: 'linear-gradient(155deg, #4A4A47 0%, #232321 100%)',
  bordo: 'linear-gradient(155deg, #7A2530 0%, #3A1015 100%)',
  verde: 'linear-gradient(155deg, #4E5A3E 0%, #262E1D 100%)',
  crudo: 'linear-gradient(155deg, #C9BFA8 0%, #8C8168 100%)',
  azul: 'linear-gradient(155deg, #4C617A 0%, #22303F 100%)',
}

// NOTA: "size" (tall/short) define el alto de la tarjeta en la grilla, no es
// el talle de la prenda. El talle real de la prenda vive en "sizeOptions".
export const products = [
  {
    id: 'p01',
    name: 'Remera Los Angeles 32 Blanca',
    category: 'Remeras',
    price: 13000,
    image: remeraLosAngeles32Blanca,
    tone: tones.crudo,
    size: 'tall',
    fabric: 'Algodón 220gsm',
    fit: 'Oversize',
    sizes: 'S - XL',
    sizeOptions: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p02',
    name: 'Remera Chicago 23',
    category: 'Remeras',
    price: 13000,
    image: remeraChicago23,
    tone: tones.verde,
    size: 'short',
    fabric: 'Algodón 220gsm',
    fit: 'Oversize',
    sizes: 'S - XL',
    sizeOptions: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p03',
    name: 'Remera Harshcruel Remix',
    category: 'Remeras',
    price: 12000,
    image: remeraHarshcruel,
    tone: tones.negro,
    size: 'tall',
    fabric: 'Algodón 220gsm',
    fit: 'Boxy fit',
    sizes: 'S - XL',
    sizeOptions: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p04',
    name: 'Remera Los Angeles 32 Negra',
    category: 'Remeras',
    price: 13000,
    image: remeraLosAngeles32Negra,
    tone: tones.carbon,
    size: 'short',
    fabric: 'Algodón 220gsm',
    fit: 'Oversize',
    sizes: 'S - XL',
    sizeOptions: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p05',
    name: 'Hoodie RMDY Studios',
    category: 'Hoodies',
    price: 26000,
    image: hoodieRmdyStudios,
    tone: tones.crudo,
    size: 'tall',
    fabric: 'Frisa 320gsm',
    fit: 'Oversize',
    sizes: 'S - XL',
    sizeOptions: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p06',
    name: 'Hoodie Ojo Negro',
    category: 'Hoodies',
    price: 25000,
    image: hoodieOjoNegro,
    tone: tones.negro,
    size: 'short',
    fabric: 'Frisa 320gsm',
    fit: 'Regular fit',
    sizes: 'S - XL',
    sizeOptions: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p07',
    name: 'Hoodie Sayko',
    category: 'Hoodies',
    price: 27000,
    image: hoodieSayko,
    tone: tones.crudo,
    size: 'tall',
    fabric: 'Frisa 320gsm',
    fit: 'Oversize',
    sizes: 'S - XL',
    sizeOptions: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p08',
    name: 'Hoodie Below Zero',
    category: 'Hoodies',
    price: 24000,
    image: hoodieBelowZero,
    tone: tones.negro,
    size: 'short',
    fabric: 'Frisa 320gsm',
    fit: 'Regular fit',
    sizes: 'S - XL',
    sizeOptions: ['S', 'M', 'L', 'XL'],
  },
]
