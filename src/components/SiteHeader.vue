<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { studio } from "@/data/studio";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" }
];

const scrolled = ref(false);
const menuOpen = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

// Lock the page while the mobile sheet is open.
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <header class="header" :class="{ 'header-solid': scrolled }">
    <a class="brand" href="#top" data-cursor-grow>
      <span class="brand-dot" aria-hidden="true" />
      {{ studio.name }}
    </a>

    <nav class="nav" aria-label="Primary">
      <a v-for="link in links" :key="link.href" :href="link.href" data-cursor-grow>
        {{ link.label }}
      </a>
    </nav>

    <a class="header-cta" href="#contact" data-cursor-grow>Start a project</a>

    <button
      class="burger"
      :aria-expanded="menuOpen"
      aria-label="Toggle menu"
      @click="menuOpen = !menuOpen"
    >
      <span :class="{ 'burger-x': menuOpen }" />
      <span :class="{ 'burger-x': menuOpen }" />
    </button>
  </header>

  <Transition name="sheet">
    <div v-if="menuOpen" class="sheet">
      <nav aria-label="Mobile">
        <a
          v-for="(link, index) in links"
          :key="link.href"
          :href="link.href"
          :style="{ transitionDelay: `${index * 60}ms` }"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>
      </nav>
      <a class="sheet-cta" href="#contact" @click="menuOpen = false">Start a project</a>
    </div>
  </Transition>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.1rem clamp(1rem, 4vw, 3.5rem);
  transition: background 400ms ease, border-color 400ms ease, backdrop-filter 400ms ease;
  border-bottom: 1px solid transparent;
}

.header-solid {
  background: rgba(8, 9, 10, 0.82);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 14px var(--accent);
}

.nav {
  display: none;
  gap: 1.9rem;
  margin-left: auto;
}

.nav a {
  position: relative;
  font-size: 0.88rem;
  color: var(--muted);
  transition: color 220ms ease;
}

.nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.nav a:hover {
  color: var(--fg);
}

.nav a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.header-cta {
  display: none;
  padding: 0.6rem 1.15rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 260ms ease, color 260ms ease, border-color 260ms ease;
}

.header-cta:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}

.burger {
  margin-left: auto;
  display: grid;
  gap: 6px;
  width: 42px;
  padding: 10px 8px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.burger span {
  display: block;
  height: 2px;
  background: var(--fg);
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.burger span:first-child.burger-x {
  transform: translateY(4px) rotate(45deg);
}

.burger span:last-child.burger-x {
  transform: translateY(-4px) rotate(-45deg);
}

.sheet {
  position: fixed;
  inset: 0;
  z-index: 55;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 5rem clamp(1.5rem, 6vw, 3rem) 3rem;
  background: var(--bg);
}

.sheet nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.sheet nav a {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 11vw, 3.6rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.08;
  transition: color 220ms ease;
}

.sheet nav a:hover {
  color: var(--accent);
}

.sheet-cta {
  align-self: flex-start;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font-weight: 700;
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 300ms ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

@media (min-width: 900px) {
  .nav {
    display: flex;
  }

  .header-cta {
    display: inline-flex;
  }

  .burger {
    display: none;
  }
}
</style>
