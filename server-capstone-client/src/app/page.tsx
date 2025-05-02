"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDecks } from "./data/decks";
import { getUser } from "./data/user";

type Deck = {
  id: number;
  ownerId: number;
};

export default function AllDecksView() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [user, setUser] = useState({});

  //get store each deck in database
  useEffect(() => {
    getDecks().then((res) => {
      setDecks(res);
      console.log(decks);
    });
  }, []);

  useEffect(() => {
    getUser().then((res) => {
      setUser(res);
    });
  }, []);

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  return (
    <div className="flex flex-wrap p-10 gap-4 max-w-200">
      {decks.map((d) => (
        <div key={d.id}>
          <div className="relative w-[300px] h-[200px] cursor-pointer group border-cyan-50">
            <Link href={`/study/${d.id}`}>
              {user?.theme?.card_path && (
                <Image
                  src={`${backendUrl}${user.theme.card_path}`}
                  alt="flashcards"
                  width={300}
                  height={200}
                  className="transform rounded-lg object-cover w-full h-full z-0 scale-100 group-hover:scale-125"
                />
              )}

              {/* Overlay container */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
                {/* Title - centered */}
                <div className="absolute wrap-normal max-w-23 inset-x-18 inset-y-21 text-white text-ml font-bold font-mono  group-hover:scale-125">
                  {d?.title}
                </div>

                {/* Bottom info row */}
                <div>
                  <span className="absolute font-extralight font-serif inset-x-18 inset-y-4.5 group-hover:scale-125">
                    by {d.creator.username}
                  </span>
                  <span className="absolute font-sans inset-y-9 inset-x-14 group-hover:scale-125">
                    {d.category.tag}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
