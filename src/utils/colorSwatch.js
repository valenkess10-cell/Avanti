// Traduce nombres de color en español (los que carga tu clienta en Airtable)
// a un color aproximado para pintar como muestra visual. Si el nombre no está
// en la lista, devuelve un gris neutro en vez de romper nada.
const COLOR_MAP = {
  negro: '#1A1A1A',
  blanco: '#FFFFFF',
  gris: '#8A8579',
  plomo: '#8A8579',
  bordo: '#7A2530',
  vino: '#7A2530',
  verde: '#4E5A3E',
  oliva: '#4E5A3E',
  militar: '#4E5A3E',
  azul: '#4C617A',
  marino: '#22303F',
  celeste: '#9CB8CC',
  beige: '#C9BFA8',
  crudo: '#C9BFA8',
  arena: '#C9BFA8',
  rojo: '#B5563C',
  amarillo: '#D9B23C',
  mostaza: '#D9B23C',
  rosa: '#D9A0AC',
  fucsia: '#C23B7A',
  marron: '#6B4A35',
  camel: '#A9835A',
  naranja: '#C96A2B',
  violeta: '#6E5A8C',
  morado: '#6E5A8C',
}

function normalize(name) {
  return (name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // saca tildes: "marrón" -> "marron"
    .trim()
}

export function getColorHex(name) {
  return COLOR_MAP[normalize(name)] || '#B8B4AA'
}