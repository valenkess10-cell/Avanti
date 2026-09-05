<script setup>
const pillars = [
  {
    title: 'Drops semanales',
    text: 'Subimos productos nuevos todas las semanas. Lo que ves hoy en stock puede no estar la semana que viene.',
  },
  {
    title: 'Calces reales',
    text: 'Oversize, boxy, wide-leg — probamos todo sobre gente real de la calle, no en maniquí.',
  },
  {
    title: 'Todo por WhatsApp',
    text: 'Elegís, coordinás pago y envío directo por chat. Sin vueltas, sin registrarte en nada.',
  },
]
</script>

<template>
  <section id="sobre" class="about">
    <div class="wrap about__inner">
      <div class="about__lead">
        <p class="eyebrow">Sobre Avanti</p>
        <h2 class="about__title">Moda para vos, <em>a tu manera.</em></h2>
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
  font-style: normal;
  color: var(--moss);
}

.about__pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.pillar {
  border-top: 1px solid rgba(246, 245, 242, 0.25);
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
  color: #B9B6AD;
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