import type { Band } from "@/types/band";

export const bands: Band[] = [
  {
    id: 1,
    name: "Oasis",
    genre: "Britpop / Rock",
    image: "/images/bands/oasis.jpg",
    members: [
      { id: 1, name: "Liam Gallagher", role: "นักร้องนำ" },
      { id: 2, name: "Noel Gallagher", role: "มือกีตาร์" },
    ],
  },
  {
    id: 2,
    name: "Green Day",
    genre: "Punk Rock",
    image: "/images/bands/green-day.jpg",
    members: [
      {
        id: 1,
        name: "Billie Joe Armstrong",
        role: "นักร้องนำ / มือกีตาร์",
      },
      { id: 2, name: "Tré Cool", role: "มือกลอง" },
    ],
  },
  {
    id: 3,
    name: "The Beatles",
    genre: "Rock / Pop",
    image: "/images/bands/beatles.webp",
    members: [
      {
        id: 1,
        name: "John Lennon",
        role: "นักร้องนำ / มือกีตาร์",
      },
      {
        id: 2,
        name: "Paul McCartney",
        role: "นักร้องนำ / มือเบส",
      },
      { id: 3, name: "George Harrison", role: "มือกีตาร์" },
      { id: 4, name: "Ringo Starr", role: "มือกลอง" },
    ],
  },
];