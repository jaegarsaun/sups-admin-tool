"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

export default function Page({ params }) {
  const searchParams = useSearchParams()
  let steamid64 = params.steamid;
  let steamid32 = searchParams.get('steam32');
  console.log(steamid32);
  const [playerData, setPlayerData] = useState(""); // will hold all the general information
  const [cwrpPlayerData, setCwrpPlayerData] = useState(""); // will hold all the CWRP characters
  const [milrpPlayerData, setMilrpPlayerData] = useState(""); // will hold all the MILRP characters

 // Load player data
  useEffect(() => {
    async function fetchPlayerData() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/profile/${steamid64}`
        );
        const data = await response.json();

        setPlayerData(data);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await fetch(`http://localhost:5000/api/cwrp/characters/${steamid32}`);
        const data = await response.json();
        console.log(data);
        setCwrpPlayerData(data);
      } catch (error) {
        console.error(error);

      }
    }

    if (steamid64) {
      fetchPlayerData();
    }
  }, [steamid64]);

  function formatPlaytime(int) {
    const hours = Math.floor(int / 3600);
    const mins = Math.floor((int % 3600) / 60);
    const secs = int % 60;

    // Format the time components to add leading zeros if necessary
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = mins.toString().padStart(2, "0");
    const formattedSeconds = secs.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

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
    <main className="flex flex-col px-5 py-[5rem] w-full lg:px-[20rem] md:px-[10rem] sm:px-[5rem]">
      <div className="flex justify-between w-full gap-2 items-start flex-col md:flex-row md:items-center">
        <h1 className="text-white font-medium text-3xl">
          {playerData.Badmin.Name} &#8226;{" "}
          <span className="text-zinc-400">{playerData.SteamID32}</span>
        </h1>
        <div className="flex gap-2">
          <Link
            href={playerData.ForumURL}
            className="rounded-xl text-center bg-tetraDark text-white p-3 font-medium hover:bg-secondaryBlue transition-colors"
          >
            Forum Profile
          </Link>
          <Link
            href={playerData.SteamURL}
            className="rounded-xl text-center bg-tetraDark text-white p-3 font-medium hover:bg-secondaryBlue transition-colors"
          >
            Steam Profile
          </Link>
        </div>
      </div>
      <div className="rounded-xl bg-secondaryDark w-full h-[3px] my-10"></div>
      <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 w-full">
        {/* 
          DarkRP.Money
          DarkRP.Karma
          DarkRPOrgName (With a border of DarkRP.OrgColor)
          DarkRP.Acheivments.length

          Badmin.PlayTime
          Badmin.FirstJoin
          Badmin.LastrSeen
          Badmin.Ranks.DarkRP
        */}
        <div className="bg-secondaryDark p-4 rounded-xl text-white w-full">
          ${playerData.DarkRP.Money}
        </div>
        <div className="bg-secondaryDark p-4 rounded-xl text-white w-full">
          {playerData.DarkRP.Karma}
        </div>
        <div className="bg-secondaryDark p-4 rounded-xl text-white w-full">
          {playerData.DarkRP.OrgName}
        </div>
        <div className="bg-secondaryDark p-4 rounded-xl text-white w-full">
          {playerData.DarkRP.Achievements.length}
        </div>
        <div className="bg-secondaryDark p-4 rounded-xl text-white w-full">
          Div 1
        </div>
        <div className="bg-secondaryDark p-4 rounded-xl text-white w-full">
          Div 1
        </div>
        <div className="bg-secondaryDark p-4 rounded-xl text-white w-full">
          Div 1
        </div>
        <div className="bg-secondaryDark p-4 rounded-xl text-white w-full">
          Div 1
        </div>
      </section>
    </main>
  );
}
