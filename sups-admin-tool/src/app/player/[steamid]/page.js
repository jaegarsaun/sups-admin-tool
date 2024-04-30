"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page({ params }) {
  let steamid32 = params.steamid;
  const [playerData, setPlayerData] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${steamid32}`);
        const data = await response.json();
        console.log(data);
        setPlayerData(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (steamid32) {
      fetchData();
    }
  }, [steamid32]);

  // Check if playerData is loaded before rendering the whole page
  if (!playerData) {
    return (
      <main className="flex px-[20rem] py-[5rem] w-full justify-center items-center">
        <h1 className="text-white font-bold text-4xl">Loading...</h1>
      </main>
    );
  }

  // If playerData is loaded, render the page with all its content
  return (
    <main className="flex px-[20rem] py-[5rem] w-full">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-white font-medium text-3xl">
          {playerData.Badmin.Name} &#8226; <span className="text-zinc-400">{playerData.SteamID32}</span>
        </h1>
        <div className="flex gap-2">
          <Link href={playerData.ForumURL} className="rounded-xl text-center bg-tetraDark text-white p-3 font-medium hover:bg-secondaryBlue transition-colors">
            Forum Profile
          </Link>
          <Link href={playerData.SteamURL} className="rounded-xl text-center bg-tetraDark text-white p-3 font-medium hover:bg-secondaryBlue transition-colors">
            Steam Profile
          </Link>
        </div>
      </div>
    </main>
  );
}
