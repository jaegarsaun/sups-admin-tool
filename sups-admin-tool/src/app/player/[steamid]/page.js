"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import Card from "@/app/components/Card";

export default function Page({ params }) {
  const searchParams = useSearchParams()
  let steamid64 = params.steamid;
  let steamid32 = searchParams.get('steam32');
  // console.log(steamid32);
  const [playerData, setPlayerData] = useState(""); // will hold all the general information
  const [orgColor, setOrgColor] = useState(""); // will hold the color of the organization [DarkRP.OrgColor
  const [cwrpPlayerData, setCwrpPlayerData] = useState(""); // will hold all the CWRP characters
  // const [milrpPlayerData, setMilrpPlayerData] = useState(""); // will hold all the MILRP characters

 // Load player data
  useEffect(() => {
    async function fetchPlayerData() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/profile/${steamid64}`
        );
        const data = await response.json();

        setPlayerData(data);
        setOrgColor(data.DarkRP.OrgColor);
        console.log (data);
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

  function convertUnixToDate(unixTimestamp) {
    // Convert the string to an integer
    const timestamp = parseInt(unixTimestamp, 10);

    // Create a new Date object based on the Unix timestamp
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    // Format the date and time in a readable format
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatCurrency(value, locale = 'en-US', currency = 'USD') {
  
  const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
  });

  // Format the number and return it
  return formatter.format(value);
}

function getRankColor(rank) {
  switch (rank) {
    case 'User':
      return 'hover:border-gray-500';
    case 'Moderator':
      return 'hover:border-green-500';
    case 'Admin':
      return 'hover:border-purple-500';
    case 'Super Admin':
      return 'hover:border-red-500';
    case 'Council':
      return 'hover:border-secondaryBlue';
    default:
      return 'hover:border-gray-500';
  }
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
        {playerData.ForumURL ? (
                <Link
                    href={playerData.ForumURL}
                    className="rounded-xl text-center bg-tetraDark text-white p-3 font-medium hover:bg-secondaryBlue transition-colors"
                >
                    {/* Content of the link here, like 'Visit Forum' */}
                    Visit Forum
                </Link>
            ) : (
                <button
                    disabled
                    className="rounded-xl text-center bg-tetraDark text-white p-3 font-medium opacity-50 cursor-not-allowed"
                >
                    {/* Content of the button here, like 'No Forum Link' */}
                    No Forum Link
                </button>
            )}
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
        <Card content={formatCurrency(playerData.DarkRP.Money)} className="border border-transparent hover:border-green-500"/>
        <Card content={playerData.DarkRP.Karma} className="border border-transparent hover:border-purple-500"/>
        <Card content={playerData.DarkRP.OrgName} className={`border border-transparent hover:border-[${orgColor}]`}/>
        <Card content={playerData.DarkRP.Achievements.length} className="border border-transparent hover:border-primaryBlue"/>
        <Card content={formatPlaytime(playerData.Badmin.PlayTime)} className="border border-transparent hover:border-secondaryBlue"/>
        <Card content={convertUnixToDate(playerData.Badmin.FirstJoin)} className="border border-transparent hover:border-secondaryBlue"/>
        <Card content={formatPlaytime(playerData.Badmin.LastSeen) + ' ago'} className="border border-transparent hover:border-secondaryBlue"/>
        <Card content={playerData.Badmin.Ranks.DarkRP} className={`border border-transparent ${getRankColor(playerData.Badmin.Ranks.DarkRP)}`}/>
      </section>
    </main>
  );
}
