<script setup lang="ts">
import { useReveal } from "@/composables/useReveal";

withDefaults(defineProps<{ delay?: number; as?: string }>(), {
  delay: 0,
  as: "div"
});

const { el, visible } = useReveal();
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="reveal"
    :class="{ 'is-visible': visible }"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </component>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
