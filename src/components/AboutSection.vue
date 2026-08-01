<script setup>
const pillars = [
  {
    title: 'Materiales primero',
    text: 'Lino, lana y algodón de origen trazable. Si la tela no envejece bien, no entra en colección.',
  },
  {
    title: 'Producción limitada',
    text: 'Tiradas pequeñas, sin reposición constante. Cada pieza se agota y no vuelve hasta la temporada siguiente.',
  },
  {
    title: 'Calces reales',
    text: 'Probados sobre cuerpos reales, no sobre maniquí. El patrón se ajusta hasta que se mueve bien.',
  },
]
</script>

<template>
  <section id="sobre" class="about">
    <div class="wrap about__inner">
      <div class="about__lead">
        <p class="eyebrow">Nuestro proceso</p>
        <h2 class="about__title">Menos piezas, <em>mejor hechas.</em></h2>
      </div>

      <div class="about__pillars">
        <div v-for="pillar in pillars" :key="pillar.title" class="pillar">
          <h3 class="pillar__title">{{ pillar.title }}</h3>
          <p>{{ pillar.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--ink);
  color: var(--bone);
  padding: var(--space-6) 0;
}

.about__inner {
  display: grid;
  grid-template-columns: 0.9fr 1.4fr;
  gap: var(--space-5);
}

.about__title {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  color: var(--bone);
  margin-top: var(--space-2);
}

.about__title em {
  font-style: italic;
  color: #C7C2B4;
}

.about__pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.pillar {
  border-top: 1px solid rgba(239, 238, 234, 0.25);
  padding-top: var(--space-2);
}

.pillar__title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: var(--space-1);
  color: var(--bone);
}

.pillar p {
  color: #C9C6BE;
  font-size: 0.88rem;
}

@media (max-width: 900px) {
  .about__inner {
    grid-template-columns: 1fr;
  }
  .about__pillars {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
}
</style>
