<script setup>
defineProps({
  onExplore: { type: Function, default: () => {} },
})
</script>

<template>
  <section class="hero">
    <div class="wrap hero__inner">
      <div class="hero__text">
        <p class="eyebrow">Nueva colección — todas las semanas</p>
        <h1 class="hero__title">
          Encontrá
          <em>tu estilo.</em>
        </h1>
        <p class="hero__desc">
          Remeras, jeans, buzos y mucho más. Todo lo que necesitás para tu día
          a día, con stock que se renueva cada semana.
        </p>
        <div class="hero__cta">
          <a href="#coleccion" class="btn btn--solid">Ver colección</a>
          <a href="#sobre" class="btn">Sobre Avanti</a>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__block">
          <span class="hero__block-caption">Drop 01 — Urban Pack</span>
        </div>
        <div class="hero__tag" aria-hidden="true">
          <span class="hero__tag-line">TELA&nbsp;&nbsp;ALGODÓN 100%</span>
          <span class="hero__tag-line">CALCE&nbsp;&nbsp;OVERSIZE</span>
          <span class="hero__tag-line">ORIGEN&nbsp;&nbsp;ARGENTINA</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: calc(var(--space-7) + var(--space-2));
  padding-bottom: var(--space-6);
  overflow: hidden;
}

.hero__inner {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: var(--space-5);
  align-items: center;
}

.hero__title {
  font-size: clamp(3rem, 6vw, 5.2rem);
  color: var(--ink);
  margin-top: var(--space-2);
}

.hero__title em {
  font-style: normal;
  color: var(--moss);
}

.hero__desc {
  max-width: 34ch;
  margin-top: var(--space-3);
  font-size: 1.02rem;
}

.hero__cta {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.hero__visual {
  position: relative;
}

.hero__block {
  aspect-ratio: 3 / 4;
  background: linear-gradient(160deg, #D9D6CD 0%, #4A4844 65%, #161513 100%);
  position: relative;
  margin-left: var(--space-5);
  display: flex;
  align-items: flex-end;
  animation: rise 1s ease both;
}

.hero__block-caption {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--white);
  padding: var(--space-3);
  text-transform: uppercase;
}

/* Firma visual: etiqueta de composición como la de una prenda real,
   ligeramente rotada, "cosida" a la esquina de la imagen. */
.hero__tag {
  position: absolute;
  left: -8px;
  bottom: 48px;
  background: var(--paper);
  border: 1px solid var(--line);
  padding: var(--space-2) var(--space-3);
  transform: rotate(-4deg);
  box-shadow: 0 10px 24px rgba(28, 27, 25, 0.12);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero__tag-line {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.03em;
  color: var(--ink-soft);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }
  .hero__block {
    margin-left: 0;
    margin-top: var(--space-4);
  }
  .hero__desc {
    max-width: none;
  }
}
</style>