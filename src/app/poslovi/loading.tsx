export default function Loading() {
  return (
    <main className="mx-auto max-w-[1540px] px-5 py-12 md:px-12">
      <div className="h-10 w-64 animate-pulse rounded bg-[#e5f0df]" />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-56 animate-pulse rounded-lg bg-white" />
        ))}
      </div>
    </main>
  );
}
