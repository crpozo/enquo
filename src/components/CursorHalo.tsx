import { useEffect, useRef } from "react";

/**
 * Minimal ring cursor — a crisp outlined ring that trails the pointer and
 * expands over interactive elements. Replaces the generic blurred "AI glow".
 * Disabled on touch devices and prefers-reduced-motion (also via CSS).
 */
const INTERACTIVE = 'a, button, [role="tab"], input, textarea, select, label, .ind-sq, .do-card';

export function CursorHalo() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let rafId = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        el.classList.add("is-visible");
        visible = true;
      }
      // expand when hovering something clickable
      const interactive = (e.target as HTMLElement)?.closest?.(INTERACTIVE);
      el.classList.toggle("is-active", !!interactive);
    };
    const onLeave = () => {
      el.classList.remove("is-visible");
      visible = false;
    };
    const onDown = () => el.classList.add("is-down");
    const onUp = () => el.classList.remove("is-down");

    const tick = () => {
      // light trailing lag so the ring feels alive but stays near the pointer
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div className="cursor-ring" ref={ref} aria-hidden="true">
      <span className="cursor-ring__dot" />
    </div>
  );
}
