type TickerItem = string | { text: string };

type Props = {
  items: TickerItem[];
  variant?: "default" | "solid" | "grad";
  speed?: "normal" | "fast";
  reverse?: boolean;
  sm?: boolean;
};

/** Razorpay-style iconic scrolling editorial type. */
export function Ticker({
  items,
  variant = "default",
  speed = "normal",
  reverse = false,
  sm = false,
}: Props) {
  // Render items twice for seamless infinite loop
  const doubled = [...items, ...items];

  const trackClass =
    "ticker__track" +
    (reverse ? " ticker__track--rev" : "") +
    (speed === "fast" ? " ticker__track--fast" : "");

  const wrapClass =
    "ticker" +
    (variant === "solid" ? " ticker--solid" : "") +
    (variant === "grad" ? " ticker--grad" : "") +
    (sm ? "" : " ticker--xl");

  return (
    <div className={wrapClass}>
      <div className={trackClass}>
        {doubled.map((item, i) => (
          <span key={i} className={"ticker__item" + (sm ? " ticker__item--sm" : "")}>
            {typeof item === "string" ? item : item.text}
            <span className="dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
