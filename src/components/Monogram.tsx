const TONES = [
  "bg-[#e5f0df] text-[#2f5245]",
  "bg-[#f8eee9] text-[#98503a]",
  "bg-[#eeeaf6] text-[#5e4f83]",
  "bg-[#e8eef8] text-[#31415f]",
  "bg-[#f7f1df] text-[#6d5a28]",
  "bg-[#e3f1ef] text-[#245a52]",
];

function initials(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N}\s.]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** Inicijali umesto eksternih logotipa: bez dodatnih zahteva ka trećim stranama. */
export function Monogram({ name, className = "size-11 text-sm" }: { name: string; className?: string }) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-xl font-bold tracking-tight ${TONES[hash % TONES.length]} ${className}`}
    >
      {initials(name)}
    </span>
  );
}
