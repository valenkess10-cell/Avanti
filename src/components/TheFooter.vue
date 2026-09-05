<script setup>
import { ref } from 'vue'

const email = ref('')
const submitted = ref(false)

function subscribe() {
  if (!email.value) return
  submitted.value = true
  email.value = ''
}
</script>

<template>
  <footer class="footer">
    <div class="wrap footer__inner">
      <div class="footer__brand">
        <span class="footer__logo">AVANTI</span>
        <p class="footer__tag">Streetwear urbano. Nuevo drop cada semana.</p>

        <form class="footer__form" @submit.prevent="subscribe">
          <label for="newsletter" class="visually-hidden">Correo electrónico</label>
          <input
            id="newsletter"
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            required
          />
          <button type="submit" class="btn">Suscribirme</button>
        </form>
        <p v-if="submitted" class="footer__confirm">Listo — te avisamos del próximo drop.</p>
      </div>

      <div class="footer__col">
        <p class="eyebrow">Tienda</p>
        <a href="#coleccion">Colección</a>
        <a href="#">Básicos</a>
        <a href="#">Guía de talles</a>
      </div>

      <div class="footer__col">
        <p class="eyebrow">Avanti</p>
        <a href="#sobre">Sobre nosotros</a>
        <a href="#ubicacion">Ubicación</a>
        <a href="#">Contacto</a>
      </div>
    </div>

    <div class="wrap footer__bottom">
      <span>© 2026 Avanti. Todos los derechos reservados.</span>
      <span>@avanti.gram</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding-top: var(--space-6);
}

.footer__inner {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: var(--space-4);
  padding-bottom: var(--space-5);
}

.footer__logo {
  font-family: var(--font-logo);
  font-weight: 800;
  font-size: 1.55rem;
  letter-spacing: -0.01em;
  transform: skewX(-8deg);
  display: inline-block;
}

.footer__tag {
  margin-top: var(--space-1);
  max-width: 30ch;
}

.footer__form {
  display: flex;
  gap: var(--space-1);
  margin-top: var(--space-3);
  max-width: 340px;
}

.footer__form input {
  flex: 1;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--line);
  padding: 0.6rem 0.2rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--ink);
}

.footer__form input:focus {
  outline: none;
  border-color: var(--ink);
}

.footer__confirm {
  margin-top: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--moss);
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer__col a {
  font-size: 0.88rem;
  color: var(--ink-soft);
}

.footer__col a:hover {
  color: var(--ink);
}

.footer__bottom {
  border-top: 1px solid var(--line);
  padding: var(--space-3) var(--space-4);
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--ink-soft);
}

@media (max-width: 780px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
  .footer__bottom {
    flex-direction: column;
    gap: var(--space-1);
  }
}
</style>