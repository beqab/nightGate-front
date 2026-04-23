export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="og1G"
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ea6390" />
          <stop offset="100%" stopColor="#9e4280" />
        </linearGradient>
      </defs>
      {/* OGEE — solid, no glow */}
      <path
        d="M4 58 L4 28 C4 18 12 14 20 8 C24 5 27 2 29 2 L29 58 Z"
        fill="url(#og1G)"
      />
      <path
        d="M60 58 L60 28 C60 18 52 14 44 8 C40 5 37 2 35 2 L35 58 Z"
        fill="url(#og1G)"
      />
    </svg>
  );
}
