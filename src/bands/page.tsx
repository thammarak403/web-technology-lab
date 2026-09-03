import BandCard from "@/components/BandCard";
import { bands } from "@/data/bands";

export default function BandsPage() {
  return (
    <main className="page">
      <h1>วงดนตรีที่ชื่นชอบ</h1>

      <section className="bandGrid">
        {bands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </section>
    </main>
  );
}