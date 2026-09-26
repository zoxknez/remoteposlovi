export default function Loading() {
  return <main className="mx-auto max-w-[1540px] px-5 py-12 md:px-12">
    <div className="h-5 w-36 animate-pulse rounded-full bg-[#e3ece0]"/>
    <div className="mt-4 h-12 w-full max-w-xl animate-pulse rounded-2xl bg-[#e8eee5]"/>
    <div className="mt-8 rounded-[1.5rem] border border-[#17312a]/8 bg-white p-5">
      <div className="h-14 animate-pulse rounded-2xl bg-[#f0f4ee]"/>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{Array.from({length:4}).map((_,index)=><div key={index} className="h-12 animate-pulse rounded-xl bg-[#f4f6f2]"/>)}</div>
    </div>
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{Array.from({length:6}).map((_,index)=><div key={index} className="h-72 animate-pulse rounded-[1.5rem] border border-[#17312a]/8 bg-white"/>)}</div>
  </main>;
}