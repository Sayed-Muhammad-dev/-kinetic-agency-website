<script setup lang="ts">
import { usePointer } from "@/composables/useReveal";

const { x, y, active, hovering } = usePointer();
</script>

<template>
  <!--
    Purely decorative, so it is hidden from assistive technology and never
    intercepts pointer events. usePointer opts out entirely on coarse pointers
    and under prefers-reduced-motion, in which case `active` stays false.
  -->
  <div
    v-show="active"
    class="cursor"
    :class="{ 'cursor-grow': hovering }"
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    aria-hidden="true"
  />
</template>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  width: 26px;
  height: 26px;
  margin: -13px 0 0 -13px;
  border: 1px solid var(--accent);
  border-radius: 999px;
  pointer-events: none;
  transition: width 260ms ease, height 260ms ease, margin 260ms ease, background 260ms ease;
  will-change: transform;
}

.cursor-grow {
  width: 62px;
  height: 62px;
  margin: -31px 0 0 -31px;
  background: color-mix(in srgb, var(--accent) 16%, transparent);
}

@media (pointer: coarse) {
  .cursor {
    display: none;
  }
}
</style>
