"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter();
  const [steamID, setSteamID] = useState("");

  function convertSteamID32ToSteamID64() {
    const parts = steamID.split(':');

    if (parts.length !== 3) {
      alert("Invalid SteamID format");
      return;
    }

    const Y = parseInt(parts[1], 10);
    const Z = parseInt(parts[2], 10);

    // Check for NaN values before converting
    if (isNaN(Y) || isNaN(Z)) {
      alert("Invalid SteamID parts");
      return;
    }

    const baseNumber = 76561197960265728n;
    const steamID64 = BigInt(Z) * 2n + BigInt(Y) + baseNumber;

    navigateToPlayerPage(steamID64.toString());  // Convert BigInt to string for navigation
  }

  function navigateToPlayerPage(steamID64) {
    router.push(`/player/${steamID64}`);
  }

  return (
    <main className="flex justify-center items-center p-10 h-full w-full">
      <div className="relative w-[50vw] h-[7vh]">
        <input
          className="w-full h-full rounded-xl bg-secondaryDark outline-none border border-tetraDark focus:border-secondaryBlue text-white text-xl pl-4 pr-12"
          placeholder="SteamID ex: STEAM_0:0:164264383"
          onChange={(event) => {
            setSteamID(event.target.value);
          }}
        />
        <button
          className="absolute inset-y-0 right-0 px-4 rounded-r-xl bg-primaryBlue text-white hover:bg-secondaryBlue transition-colors"
          onClick={convertSteamID32ToSteamID64}  
        >
          Submit
        </button>
      </div>
    </main>
  );
}
