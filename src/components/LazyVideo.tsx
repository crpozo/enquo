import { useEffect, useRef, type VideoHTMLAttributes } from "react";

type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload"> & {
  src: string;
  [data: `data-${string}`]: unknown;
};

/**
 * Muted background loop that downloads nothing until it is about to be seen:
 * `src` is set and play() called once the video comes within 200px of the
 * viewport, and it pauses when it leaves. With reduced motion it never
 * plays and the poster stands in.
 */
export function LazyVideo({ src, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.getAttribute("src")) v.src = src;
          const p = v.play();
          if (p && typeof p.catch === "function") p.catch(() => { /* ignore */ });
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return <video ref={ref} preload="none" loop muted playsInline disablePictureInPicture {...rest} />;
}
