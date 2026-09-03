import Image from "next/image";
import type { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
};

export default function BandCard({ band }: BandCardProps) {
  return (
    <article className="band-card">
      <Image
        src={band.image}
        alt={band.name}
        width={400}
        height={250}
        className="band-image"
      />

      <h2>{band.name}</h2>

      <p>
        <strong>แนวเพลง:</strong> {band.genre}
      </p>

      <h3>สมาชิก</h3>

      <ul>
        {band.members.map((member) => (
          <li key={member.id}>
            <strong>{member.name}</strong> - {member.role}
          </li>
        ))}
      </ul>
    </article>
  );
}