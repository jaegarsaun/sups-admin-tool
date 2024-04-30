"use client";
import { useState } from "react";

export default function Page({ params }) {
  let steamid32 = params.steamid;
  const [playerData, setPlayerData] = useState(null);
  async function fetchPlayerData() {
    try {
      const response = await fetch(
        `https://superiorservers.co/api/profile/${steamid32}/`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
        console.log(data)
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  }

  fetchPlayerData();

  return (
    <main className="flex p-10 h-full w-full">
        <h1 className="text-white text-4xl"></h1>
    </main>
  )
}
