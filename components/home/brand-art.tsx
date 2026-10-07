/** Original vector studies of the three faces of Arttribute's cube. */
export function BrandArt({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "private" | "learning" | "provenance";
  className?: string;
}) {
  if (variant === "learning")
    return (
      <svg
        className={className ?? "brand-art"}
        viewBox="0 0 480 240"
        fill="none"
        aria-hidden="true"
      >
        <path d="M65 196H420" stroke="#C8C4D9" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M${90 + i * 45} 195V${165 - i * 19}L${120 + i * 45} ${145 - i * 19}V195`}
            fill={i % 2 ? "#CBC5DF" : "#A69EC7"}
          />
        ))}
        <path d="M75 166L390 32" stroke="#25326C" strokeWidth="2" />
        <path d="M378 26L396 29L389 46" stroke="#25326C" strokeWidth="2" />
        <circle cx="74" cy="166" r="5" fill="#F74581" />
      </svg>
    );
  if (variant === "provenance")
    return (
      <svg
        className={className ?? "brand-art"}
        viewBox="0 0 480 240"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M90 120H178L240 60H350M178 120L240 180H350"
          stroke="#B8A4AC"
          strokeWidth="1.5"
        />
        {[
          [90, 120],
          [240, 60],
          [240, 180],
          [350, 60],
          [350, 180],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect
              x={x - 21}
              y={y - 21}
              width="42"
              height="42"
              rx="3"
              fill={i === 0 ? "#172438" : i < 3 ? "#D8BCC9" : "#FAF9F6"}
              stroke={i < 3 ? "none" : "#CBB6C0"}
            />
            <path
              d={`M${x - 8} ${y}L${x - 2} ${y + 6}L${x + 9} ${y - 7}`}
              stroke={i === 0 ? "#FAF9F6" : "#813380"}
              strokeWidth="1.5"
            />
          </g>
        ))}
        <circle cx="178" cy="120" r="5" fill="#F74581" />
      </svg>
    );
  if (variant === "private")
    return (
      <svg
        className={className ?? "brand-art"}
        viewBox="0 0 480 400"
        fill="none"
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path
            key={i}
            d={`M${64 + i * 20} ${144 - i * 12}L${240 + i * 20} ${246 - i * 12}V${358 - i * 12}L${64 + i * 20} ${256 - i * 12}Z`}
            stroke="#8D98B0"
            strokeOpacity={0.25 + i * 0.065}
          />
        ))}
        <path d="M240 48L412 148L240 248L68 148L240 48Z" fill="#D8C4D7" />
        <path d="M68 148L240 248V360L68 260V148Z" fill="#A293B3" />
        <path d="M240 248L412 148V260L240 360V248Z" fill="#7C87AF" />
        <path
          d="M124 148L240 80L356 148L240 216L124 148Z"
          stroke="#FAF9F6"
          strokeWidth="1.5"
        />
        <path d="M181 148L240 114L299 148L240 182L181 148Z" fill="#F74581" />
        <path d="M240 248V360" stroke="#FAF9F6" strokeOpacity=".6" />
      </svg>
    );
  return (
    <svg
      className={className ?? "brand-art"}
      viewBox="0 0 560 560"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 448L560 123M0 514L560 189M42 560L560 260"
        stroke="#D7D2DD"
        strokeWidth="1"
      />
      <path d="M281 88L455 189L281 290L107 189L281 88Z" fill="#F0AEC5" />
      <path d="M107 189L281 290V459L107 358V189Z" fill="#AA83A2" />
      <path d="M281 290L455 189V358L281 459V290Z" fill="#354773" />
      <path d="M150 189L281 114L412 189L281 265L150 189Z" fill="#EFEDF0" />
      <path d="M150 189L281 265V410L150 335V189Z" fill="#C6AEC6" />
      <path d="M281 265L412 189V335L281 410V265Z" fill="#7180A0" />
      <path d="M196 189L281 140L366 189L281 239L196 189Z" fill="#EFEDF0" />
      <path d="M196 189L281 239V361L196 312V189Z" fill="#E2D4E0" />
      <path d="M281 239L366 189V312L281 361V239Z" fill="#A8B0C3" />
      <path d="M237 189L281 164L325 189L281 214L237 189Z" fill="#F74581" />
      <path d="M237 189L281 214V289L237 264V189Z" fill="#813380" />
      <path d="M281 214L325 189V264L281 289V214Z" fill="#1A237E" />
      <path d="M107 358L281 459L455 358" stroke="#FAF9F6" strokeWidth="1.5" />
    </svg>
  );
}
