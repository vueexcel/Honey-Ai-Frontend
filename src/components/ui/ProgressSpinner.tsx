export default function ProgressSpinner({
  size = 8,
  progress = 0,
  color = "#ff44ba",
}: {
  size?: number;
  progress: number;
  color?: string;
}) {
  const radius = (size * 8) / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size * 16} height={size * 16} className="rotate-[-90deg]">
      <circle cx="50%" cy="50%" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        stroke={color}
        strokeWidth="8"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500 ease-linear"
      />
      <text x="50%" y="50%" dy="0.3em" textAnchor="middle" className="font-semibold text-sm" style={{ fill: color }}>
        {progress}%
      </text>
    </svg>
  );
}
