<script setup lang="ts">
import { computed, ref } from "vue";
import SiteHeader from "@/components/SiteHeader.vue";
import CursorFollower from "@/components/CursorFollower.vue";
import RevealBlock from "@/components/RevealBlock.vue";
import { caseStudies, clients, process, services, stats, studio, team } from "@/data/studio";

const activeCase = ref<string | null>(null);

const form = ref({ name: "", email: "", company: "", budget: "25–50k", brief: "" });
const errors = ref<Record<string, string>>({});
const sent = ref(false);

const budgets = ["Under 25k", "25–50k", "50–120k", "120k+"];

const sectors = computed(() => Array.from(new Set(caseStudies.map((item) => item.sector))));

function submit() {
  const next: Record<string, string> = {};
  if (!form.value.name.trim()) next.name = "Tell us who you are.";
  if (!form.value.email.includes("@")) next.email = "That email does not look right.";
  if (form.value.brief.trim().length < 20) next.brief = "A sentence or two, at least.";

  errors.value = next;
  if (Object.keys(next).length > 0) return;

  sent.value = true;
}
</script>

<template>
  <CursorFollower />
  <SiteHeader />

  <main id="top">
    <!-- ------------------------------------------------------------ Hero -->
    <section class="hero">
      <div class="hero-grain" aria-hidden="true" />

      <div class="hero-inner">
        <RevealBlock>
          <p class="eyebrow">Brand &amp; product studio — Lisbon / Brooklyn</p>
        </RevealBlock>

        <h1 class="hero-title">
          <RevealBlock :delay="60" as="span" class="line">We build brands</RevealBlock>
          <RevealBlock :delay="140" as="span" class="line">that <em>refuse</em></RevealBlock>
          <RevealBlock :delay="220" as="span" class="line">to blend in.</RevealBlock>
        </h1>

        <RevealBlock :delay="320">
          <p class="hero-lede">{{ studio.intro }}</p>
        </RevealBlock>

        <RevealBlock :delay="400">
          <div class="hero-actions">
            <a class="btn btn-accent" href="#work" data-cursor-grow>See the work</a>
            <a class="btn btn-ghost" href="#contact" data-cursor-grow>Start a project</a>
          </div>
        </RevealBlock>

        <RevealBlock :delay="480">
          <dl class="stats">
            <div v-for="stat in stats" :key="stat.label">
              <dt>{{ stat.value }}</dt>
              <dd>{{ stat.label }}</dd>
            </div>
          </dl>
        </RevealBlock>
      </div>
    </section>

    <!-- --------------------------------------------------------- Clients -->
    <section class="marquee-band" aria-label="Selected clients">
      <!-- The track is duplicated so the loop meets itself at -50%. -->
      <div class="marquee">
        <span v-for="(client, index) in [...clients, ...clients]" :key="`${client}-${index}`">
          {{ client }}
        </span>
      </div>
    </section>

    <!-- ------------------------------------------------------------ Work -->
    <section id="work" class="section">
      <RevealBlock class="section-head">
        <p class="eyebrow">Selected work</p>
        <h2 class="section-title">
          Six projects, and what actually changed because of them.
        </h2>
        <p class="section-lede">
          Every case below names the number the client cared about. Sectors:
          {{ sectors.join(", ") }}.
        </p>
      </RevealBlock>

      <div class="work-grid">
        <RevealBlock
          v-for="(project, index) in caseStudies"
          :key="project.id"
          :delay="(index % 2) * 90"
          class="work-cell"
        >
          <article
            class="work-card"
            data-cursor-grow
            @mouseenter="activeCase = project.id"
            @mouseleave="activeCase = null"
          >
            <div class="work-media">
              <img :src="project.image" :alt="project.client" loading="lazy" />
              <div class="work-overlay" :class="{ 'is-open': activeCase === project.id }">
                <p class="work-blurb">{{ project.blurb }}</p>
                <ul class="work-services">
                  <li v-for="service in project.services" :key="service">{{ service }}</li>
                </ul>
              </div>
              <div class="work-metric">
                <strong>{{ project.metric.value }}</strong>
                <span>{{ project.metric.label }}</span>
              </div>
            </div>

            <div class="work-foot">
              <div>
                <p class="work-client">{{ project.client }}</p>
                <h3 class="work-title">{{ project.title }}</h3>
              </div>
              <span class="work-meta">{{ project.sector }} · {{ project.year }}</span>
            </div>
          </article>
        </RevealBlock>
      </div>
    </section>

    <!-- -------------------------------------------------------- Services -->
    <section id="services" class="section section-alt">
      <RevealBlock class="section-head">
        <p class="eyebrow">What we do</p>
        <h2 class="section-title">Four things, properly.</h2>
        <p class="section-lede">
          We are not a full-service agency and have no interest in becoming one.
        </p>
      </RevealBlock>

      <div class="service-list">
        <RevealBlock
          v-for="(service, index) in services"
          :key="service.number"
          :delay="index * 70"
        >
          <article class="service" data-cursor-grow>
            <span class="service-number">{{ service.number }}</span>
            <div class="service-body">
              <h3>{{ service.title }}</h3>
              <p>{{ service.blurb }}</p>
            </div>
            <ul class="service-deliverables">
              <li v-for="item in service.deliverables" :key="item">{{ item }}</li>
            </ul>
          </article>
        </RevealBlock>
      </div>
    </section>

    <!-- --------------------------------------------------------- Process -->
    <section id="process" class="section">
      <RevealBlock class="section-head">
        <p class="eyebrow">How it goes</p>
        <h2 class="section-title">Six weeks, start to handover.</h2>
      </RevealBlock>

      <div class="process-grid">
        <RevealBlock v-for="(step, index) in process" :key="step.phase" :delay="index * 80">
          <article class="process-card">
            <span class="process-phase">{{ step.phase }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.body }}</p>
          </article>
        </RevealBlock>
      </div>
    </section>

    <!-- ---------------------------------------------------------- Studio -->
    <section id="studio" class="section section-alt">
      <RevealBlock class="section-head">
        <p class="eyebrow">The studio</p>
        <h2 class="section-title">Twelve people. No account managers.</h2>
        <p class="section-lede">
          You work with the people doing the work. That is the entire business model.
        </p>
      </RevealBlock>

      <div class="team-grid">
        <RevealBlock v-for="(person, index) in team" :key="person.name" :delay="(index % 3) * 80">
          <article class="member" data-cursor-grow>
            <div class="member-photo">
              <img :src="person.image" :alt="person.name" loading="lazy" />
            </div>
            <h3>{{ person.name }}</h3>
            <p class="member-role">{{ person.role }}</p>
            <p class="member-bio">{{ person.bio }}</p>
          </article>
        </RevealBlock>
      </div>
    </section>

    <!-- --------------------------------------------------------- Contact -->
    <section id="contact" class="section contact">
      <div class="contact-grid">
        <RevealBlock>
          <p class="eyebrow">Start a project</p>
          <h2 class="contact-title">
            Tell us what is wrong.<br />We will tell you if we can fix it.
          </h2>
          <p class="section-lede">
            We take on roughly one project a month. If it is not a fit we will say so within two
            working days, and usually point you somewhere better.
          </p>

          <ul class="contact-details">
            <li>
              <span>Email</span>
              <a :href="`mailto:${studio.email}`" data-cursor-grow>{{ studio.email }}</a>
            </li>
            <li v-for="location in studio.locations" :key="location">
              <span>Studio</span>
              {{ location }}
            </li>
          </ul>
        </RevealBlock>

        <RevealBlock :delay="120">
          <form v-if="!sent" class="form" novalidate @submit.prevent="submit">
            <label class="field">
              <span>Your name</span>
              <input v-model="form.name" type="text" :class="{ invalid: errors.name }" />
              <small v-if="errors.name">{{ errors.name }}</small>
            </label>

            <label class="field">
              <span>Email</span>
              <input v-model="form.email" type="email" :class="{ invalid: errors.email }" />
              <small v-if="errors.email">{{ errors.email }}</small>
            </label>

            <label class="field">
              <span>Company</span>
              <input v-model="form.company" type="text" />
            </label>

            <fieldset class="field">
              <legend>Budget</legend>
              <div class="chips">
                <button
                  v-for="option in budgets"
                  :key="option"
                  type="button"
                  class="chip"
                  :class="{ 'chip-on': form.budget === option }"
                  @click="form.budget = option"
                >
                  {{ option }}
                </button>
              </div>
            </fieldset>

            <label class="field">
              <span>What are you trying to do?</span>
              <textarea
                v-model="form.brief"
                rows="4"
                :class="{ invalid: errors.brief }"
              />
              <small v-if="errors.brief">{{ errors.brief }}</small>
            </label>

            <button class="btn btn-accent form-submit" type="submit" data-cursor-grow>
              Send it
            </button>
          </form>

          <div v-else class="form-sent">
            <h3>Got it, {{ form.name.split(" ")[0] }}.</h3>
            <p>
              We read every enquiry ourselves. Expect a reply from one of us within two working
              days — a real answer either way, not an auto-responder.
            </p>
            <button class="btn btn-ghost" type="button" @click="sent = false">
              Send another
            </button>
          </div>
        </RevealBlock>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-top">
      <a class="brand" href="#top">
        <span class="brand-dot" aria-hidden="true" />
        {{ studio.name }}
      </a>
      <p>{{ studio.tagline }}</p>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Kinetic Studio. A portfolio project — not a real agency.</p>
      <p>{{ studio.locations.join(" · ") }}</p>
    </div>
  </footer>
</template>

<style scoped>
/* ------------------------------------------------------------------ Hero */

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem clamp(1.25rem, 5vw, 4rem) 5rem;
  overflow: hidden;
}

.hero-grain {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(42% 46% at 18% 26%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 68%),
    radial-gradient(36% 40% at 82% 18%, rgba(120, 120, 255, 0.14), transparent 66%);
  filter: blur(24px);
  animation: drift 26s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes drift {
  from {
    transform: translate3d(-2%, -1%, 0) scale(1);
  }
  to {
    transform: translate3d(3%, 3%, 0) scale(1.08);
  }
}

.hero-inner {
  position: relative;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
}

.hero-title {
  margin: 1.6rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 12vw, 9.5rem);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.045em;
}

.hero-title :deep(.line) {
  display: block;
}

.hero-title em {
  font-style: normal;
  color: var(--accent);
}

.hero-lede {
  margin: 2rem 0 0;
  max-width: 46ch;
  font-size: clamp(1rem, 1.6vw, 1.18rem);
  line-height: 1.7;
  color: var(--muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2.4rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  margin: 4rem 0 0;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}

.stats dt {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.stats dd {
  margin: 0.35rem 0 0;
  font-size: 0.83rem;
  color: var(--muted);
}

/* --------------------------------------------------------------- Marquee */

.marquee-band {
  padding: 1.9rem 0;
  border-block: 1px solid var(--line);
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.marquee {
  display: flex;
  width: max-content;
  gap: 3.5rem;
  padding-right: 3.5rem;
  animation: marquee 38s linear infinite;
}

.marquee span {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--dim);
  white-space: nowrap;
  transition: color 240ms ease;
}

.marquee span:hover {
  color: var(--accent);
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

/* -------------------------------------------------------------- Sections */

.section {
  padding: clamp(4.5rem, 11vw, 9rem) clamp(1.25rem, 5vw, 4rem);
  max-width: 1320px;
  margin: 0 auto;
}

.section-alt {
  max-width: none;
  background: var(--bg-alt);
  border-block: 1px solid var(--line);
}

.section-alt > * {
  max-width: 1320px;
  margin-inline: auto;
}

.section-head {
  max-width: 62ch;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.section-title {
  margin: 1rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5.5vw, 4rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.035em;
}

.section-lede {
  margin: 1.2rem 0 0;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--muted);
}

/* ------------------------------------------------------------------ Work */

.work-grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.work-card {
  cursor: pointer;
}

.work-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 4px;
  background: var(--bg-alt);
}

.work-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1), filter 600ms ease;
  filter: grayscale(1) contrast(1.05);
}

.work-card:hover .work-media img {
  transform: scale(1.06);
  filter: grayscale(0) contrast(1);
}

.work-overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: clamp(1.25rem, 3vw, 2.25rem);
  background: linear-gradient(0deg, rgba(8, 9, 10, 0.94), rgba(8, 9, 10, 0.55) 62%, transparent);
  transform: translateY(18px);
  opacity: 0;
  transition: opacity 420ms ease, transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

.work-overlay.is-open {
  opacity: 1;
  transform: translateY(0);
}

.work-blurb {
  margin: 0;
  max-width: 52ch;
  font-size: 0.94rem;
  line-height: 1.65;
}

.work-services {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.work-services li {
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  font-size: 0.72rem;
  color: var(--muted);
}

.work-metric {
  position: absolute;
  top: clamp(1rem, 2vw, 1.5rem);
  right: clamp(1rem, 2vw, 1.5rem);
  padding: 0.7rem 0.95rem;
  border-radius: 4px;
  background: var(--accent);
  color: var(--bg);
  text-align: right;
}

.work-metric strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1;
  letter-spacing: -0.02em;
}

.work-metric span {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.68rem;
  font-weight: 600;
  max-width: 15ch;
}

.work-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.8rem;
  padding-top: 1.1rem;
}

.work-client {
  margin: 0;
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.work-title {
  margin: 0.45rem 0 0;
  max-width: 34ch;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2.2vw, 1.6rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.work-meta {
  font-size: 0.8rem;
  color: var(--dim);
}

/* -------------------------------------------------------------- Services */

.service-list {
  display: flex;
  flex-direction: column;
}

.service {
  display: grid;
  gap: 1.2rem;
  padding: clamp(1.75rem, 4vw, 2.75rem) 0;
  border-top: 1px solid var(--line);
  transition: padding-left 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.service:hover {
  padding-left: 1.2rem;
}

.service-number {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--accent);
}

.service-body h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.4vw, 2.4rem);
  font-weight: 600;
  letter-spacing: -0.03em;
}

.service-body p {
  margin: 0.8rem 0 0;
  max-width: 58ch;
  line-height: 1.75;
  color: var(--muted);
}

.service-deliverables {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.service-deliverables li {
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  font-size: 0.76rem;
  color: var(--muted);
  transition: border-color 240ms ease, color 240ms ease;
}

.service:hover .service-deliverables li {
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
  color: var(--fg);
}

/* --------------------------------------------------------------- Process */

.process-grid {
  display: grid;
  gap: 1.25rem;
}

.process-card {
  padding: clamp(1.4rem, 3vw, 2rem);
  border: 1px solid var(--line);
  border-radius: 4px;
  height: 100%;
  transition: border-color 320ms ease, transform 320ms ease, background 320ms ease;
}

.process-card:hover {
  border-color: color-mix(in srgb, var(--accent) 50%, transparent);
  background: var(--bg-alt);
  transform: translateY(-4px);
}

.process-phase {
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.process-card h3 {
  margin: 0.9rem 0 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.process-card p {
  margin: 0.7rem 0 0;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--muted);
}

/* ------------------------------------------------------------------ Team */

.team-grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.member-photo {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 4px;
  background: var(--bg);
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1), filter 500ms ease;
}

.member:hover .member-photo img {
  transform: scale(1.05);
  filter: grayscale(0);
}

.member h3 {
  margin: 1.1rem 0 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.member-role {
  margin: 0.3rem 0 0;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.member-bio {
  margin: 0.7rem 0 0;
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--muted);
}

/* --------------------------------------------------------------- Contact */

.contact-grid {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
}

.contact-title {
  margin: 1rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.contact-details {
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-details li {
  display: grid;
  gap: 0.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  font-size: 0.95rem;
}

.contact-details span {
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--dim);
}

.contact-details a {
  color: var(--accent);
}

.form {
  display: grid;
  gap: 1.1rem;
}

.field {
  display: grid;
  gap: 0.45rem;
  border: 0;
  padding: 0;
  margin: 0;
}

.field > span,
.field legend {
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--dim);
  padding: 0;
}

.field input,
.field textarea {
  width: 100%;
  padding: 0.85rem 0;
  border: 0;
  border-bottom: 1px solid var(--line-strong);
  background: transparent;
  color: var(--fg);
  font-size: 1rem;
  outline: none;
  resize: vertical;
  transition: border-color 260ms ease;
}

.field input:focus,
.field textarea:focus {
  border-bottom-color: var(--accent);
}

.field .invalid {
  border-bottom-color: #ff6b6b;
}

.field small {
  font-size: 0.78rem;
  color: #ff8f8f;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  padding: 0.5rem 1rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-size: 0.82rem;
  cursor: pointer;
  transition: border-color 220ms ease, color 220ms ease, background 220ms ease;
}

.chip:hover {
  color: var(--fg);
}

.chip-on {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
  font-weight: 600;
}

.form-submit {
  justify-self: start;
  margin-top: 0.6rem;
}

.form-sent h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.4vw, 2.2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.form-sent p {
  margin: 1rem 0 1.8rem;
  max-width: 46ch;
  line-height: 1.75;
  color: var(--muted);
}

/* ---------------------------------------------------------------- Footer */

.footer {
  padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem) 2.5rem;
  border-top: 1px solid var(--line);
  max-width: 1320px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
}

.footer-top p {
  margin: 0;
  max-width: 34ch;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 600;
  letter-spacing: -0.025em;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
}

.brand-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--accent);
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  font-size: 0.78rem;
  color: var(--dim);
}

.footer-bottom p {
  margin: 0;
}

/* ----------------------------------------------------------- Breakpoints */

@media (min-width: 640px) {
  .stats {
    grid-template-columns: repeat(4, 1fr);
  }

  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Stagger the second column so the grid reads as a magazine spread. */
  .work-cell:nth-child(even) {
    margin-top: 4rem;
  }

  .service {
    grid-template-columns: 4rem minmax(0, 1fr) minmax(0, 18rem);
    align-items: start;
    gap: 2rem;
  }

  .team-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .contact-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}

@media (min-width: 1200px) {
  .process-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-grain,
  .marquee {
    animation: none;
  }
}
</style>
