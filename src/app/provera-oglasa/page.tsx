import { ScamChecker } from "@/components/ScamChecker";
import { pageMeta } from "@/lib/seo";

export const metadata=pageMeta("Provera oglasa","Lokalna provera rizičnih signala u oglasu ili poruci, bez lažnog scam procenta.","/provera-oglasa");
export default function Page(){return <main><section className="border-b border-[#17312a]/8 bg-[#f5ece8]"><div className="mx-auto max-w-6xl px-5 py-14 md:px-12 md:py-20"><p className="eyebrow">SIGURNOST</p><h1 className="mt-3 max-w-4xl font-serif text-5xl tracking-[-.04em] md:text-7xl">Crvene zastavice pre nego što pošaljete podatke ili novac.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#6e5d56]">Provera je namerno konzervativna: pokazuje pronađene rizične obrasce, ali nikada ne tvrdi da je oglas 100% siguran ili 100% prevara.</p></div></section><div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16"><ScamChecker /></div></main>}
