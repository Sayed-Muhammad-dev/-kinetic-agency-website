import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/**
 * Adds an `is-visible` class the first time the element crosses the viewport.
 * Reveals immediately when the visitor prefers reduced motion, or when the
 * browser lacks IntersectionObserver.
 */
export function useReveal(threshold = 0.15) {
  const el = ref<HTMLElement | null>(null);
  const visible = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const node = el.value;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      visible.value = true;
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.value = true;
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
  });

  onBeforeUnmount(() => observer?.disconnect());

  return { el, visible } as { el: Ref<HTMLElement | null>; visible: Ref<boolean> };
}

/**
 * Tracks the pointer so a custom cursor can follow it. Disabled on touch and
 * coarse-pointer devices, where a follower cursor is meaningless.
 */
export function usePointer() {
  const x = ref(0);
  const y = ref(0);
  const active = ref(false);
  const hovering = ref(false);

  let frame = 0;
  let targetX = 0;
  let targetY = 0;

  function onMove(event: PointerEvent) {
    targetX = event.clientX;
    targetY = event.clientY;
    active.value = true;
  }

  function onOver(event: PointerEvent) {
    const target = event.target as HTMLElement | null;
    hovering.value = Boolean(target?.closest("[data-cursor-grow]"));
  }

  function tick() {
    // Ease toward the pointer so the follower lags slightly behind it.
    x.value += (targetX - x.value) * 0.18;
    y.value += (targetY - y.value) * 0.18;
    frame = requestAnimationFrame(tick);
  }

  onMounted(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    frame = requestAnimationFrame(tick);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerover", onOver);
    if (frame) cancelAnimationFrame(frame);
  });

  return { x, y, active, hovering };
}
