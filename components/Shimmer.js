export function Shimmer({ className = '' }) {
  return (
    <div className={`bg-white/20 rounded-lg ${className} animate-pulse`} />
  );
}