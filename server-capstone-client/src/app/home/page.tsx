"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Deck = {
  id: number;
  ownerId: number;
};

const Hi = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [user, setUser] = useState({});

  //get store each deck in database
  useEffect(() => {
    fetch("http://localhost:8001/Decks?_expand=user&_expand=category")
      .then((res) => res.json())
      .then((d) => setDecks(d));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8001/users/1?_expand=theme")
      .then((res) => res.json())
      .then((u) => setUser(u));
  }, []);

  return (
    <div className="flex flex-wrap p-10 gap-4 max-w-200">
      {decks.map((d) => (
        <div key={d.id}>
          <div className="relative w-[300px] h-[200px] cursor-pointer group border-cyan-50">
            <Link href={`/study/${d.id}`}>
              <Image
                src={user.theme?.card}
                alt="flashcards"
                width={300}
                height={200}
                className="transform rounded-lg object-cover w-full h-full z-0 scale-100 group-hover:scale-125"
              />

              {/* Overlay container */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
                {/* Title - centered */}
                <div className="absolute wrap-normal max-w-23 inset-x-18 inset-y-21 text-white text-ml font-bold font-mono  group-hover:scale-125">
                  {d.title}
                </div>

                {/* Bottom info row */}
                <div>
                  <span className="absolute font-extralight font-serif inset-x-18 inset-y-4.5 group-hover:scale-125">by {d.user.username}</span>
                  <span className="absolute font-sans inset-y-9 inset-x-14 group-hover:scale-125">{d.category.name}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hi;
