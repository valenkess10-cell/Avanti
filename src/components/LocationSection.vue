<script setup>
// TODO: reemplazar dirección y horarios por los datos reales del local.
const store = {
  address: 'Dirección a confirmar, La Rioja, Argentina',
  hours: [
    { day: 'Lunes a viernes', time: '10:00 – 13:30 / 17:00 – 21:00' },
    { day: 'Sábados', time: '10:00 – 13:30' },
    { day: 'Domingos', time: 'Cerrado' },
  ],
  mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1737.922143654607!2d-66.85462!3d-29.4041109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9427dbbc87a251bd%3A0x8b5b967736b139b4!2sAvanti!5e0!3m2!1ses-419!2sar!4v1785873374057!5m2!1ses-419!2sar',
  mapLink: 'https://maps.app.goo.gl/BQrJVmpSNzmktocx5',
}
</script>

<template>
  <section id="ubicacion" class="location">
    <div class="wrap location__inner">
      <div class="location__info">
        <span class="eyebrow">Visitanos</span>
        <h2 class="location__title">Dónde encontrarnos</h2>
        <p class="location__address">{{ store.address }}</p>

        <dl class="location__hours">
          <div v-for="row in store.hours" :key="row.day" class="location__hours-row">
            <dt>{{ row.day }}</dt>
            <dd>{{ row.time }}</dd>
          </div>
        </dl>

        <a :href="store.mapLink" target="_blank" rel="noopener" class="btn">
          Cómo llegar
        </a>
      </div>

      <div class="location__map">
        <iframe
          :src="store.mapEmbedSrc"
          width="100%"
          height="100%"
          style="border: 0"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          title="Ubicación del local"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.location {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
  border-top: 1px solid var(--line);
}

.location__inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-5);
  align-items: stretch;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: var(--space-5);
  background: var(--paper);
}

.location__title {
  font-family: var(--font-display);
  font-size: 2rem;
  margin-top: var(--space-1);
  margin-bottom: var(--space-3);
}

.location__address {
  font-size: 0.95rem;
  color: var(--ink-soft);
  margin-bottom: var(--space-4);
}

.location__hours {
  margin-bottom: var(--space-4);
  border-top: 1px solid var(--line);
}

.location__hours-row {
  display: flex;
  justify-content: space-between;
  gap: var(--space-2);
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--line);
  font-size: 0.85rem;
}

.location__hours-row dt {
  color: var(--ink-soft);
}

.location__hours-row dd {
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.location__map {
  aspect-ratio: 4 / 3;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
}

@media (max-width: 780px) {
  .location__inner {
    grid-template-columns: 1fr;
  }
  .location__map {
    order: -1;
    aspect-ratio: 16 / 10;
  }
}
</style>