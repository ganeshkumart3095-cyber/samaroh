/** Samaroh's ceremonial mark: an auspicious glowing Diya (दीप) with a golden flame. */
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="diyaGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="80%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Diya Lamp Base */}
      <path
        d="M8 26c2 10 12 14 16 14s14-4 16-14C34 26 14 26 8 26z"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Diya Rim */}
      <ellipse cx="24" cy="26" rx="16" ry="3.5" fill="#d97706" />
      <ellipse cx="24" cy="25" rx="14" ry="2.5" fill="#b45309" />
      {/* Auspicious Diya Flame */}
      <path
        d="M24 7c-4 7-6 11-4 15 1.5 3 6 3 8 0 2-4 0-8-4-15z"
        fill="url(#diyaGlow)"
      />
      {/* Inner sacred flame core */}
      <path
        d="M24 13c-2 3.5-3 5.5-2 7.5 0.7 1.5 3 1.5 4 0 1-2 0-4-2-7.5z"
        fill="#ffffff"
      />
    </svg>
  );
}
