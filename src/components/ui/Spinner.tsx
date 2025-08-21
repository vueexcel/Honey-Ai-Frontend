export default function Spinner({ size = 8 }: { size?: number }) {
  return (
    <div
      className={`animate-spin rounded-full border-8 border-transparent border-t-[#ff44ba]`}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
      }}
    />
  );
}
