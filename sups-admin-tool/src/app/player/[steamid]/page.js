"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Card from "@/app/components/Card";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  formatCurrency,
  convertUnixToDate,
  getRankColor,
  getTimeForSsrpCharacters,
  formatPlaytime,
  convertSteamID64ToSteamID32,
  convertSteamID32ToSteamID64,
  isValidSteamID,
} from "@/app/components/utils";

export default function Page({ params }) {
  const searchParams = useSearchParams();
  let steamid64 = params.steamid;
  let steamid32 = searchParams.get("steam32");

  const [playerData, setPlayerData] = useState(""); // will hold all the general information
  const [orgColor, setOrgColor] = useState(""); // will hold the color of the organization [DarkRP.OrgColor
  const [cwrpPlayerData, setCwrpPlayerData] = useState(""); // will hold all the CWRP characters
  const [milrpPlayerData, setMilrpPlayerData] = useState(""); // will hold all the MILRP characters
  const [friendsList, setFriendsList] = useState(""); // will hold all the friends of the player [SteamID64]
  const [tags, setTags] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);

  // Load player data
  useEffect(() => {
    async function fetchPlayerData() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/profile/${steamid64}`
        );
        const data = await response.json();
        console.log(data);

        setPlayerData(data);
        setOrgColor(data.DarkRP.OrgColor);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/cwrp/characters/${steamid32}`
        );
        const data = await response.json();
        setCwrpPlayerData(data);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/milrp/characters/${steamid32}`
        );
        const data = await response.json();
        setMilrpPlayerData(data);
      } catch (error) {
        console.error(error);
      }

      // Fetch friends list from steam
      try {
        const response = await fetch(
          `http://localhost:5000/api/player/getfriends/${steamid64}`
        );
        const data = await response.json();
        console.log(data);
        console.log(data.friendslist);
        setFriendsList(data.friendslist);
      } catch (error) {
        console.error(error);
      }
    }

    if (steamid64) {
      fetchPlayerData();
    }
  }, [steamid64]);

  const filterFriends = () => {
    if (friendsList && friendsList.friends) {
      const convertedTags = tags.map((tag) => convertSteamID32ToSteamID64(tag));
      const filtered = friendsList.friends.filter((friend) =>
        convertedTags.includes(friend.steamid)
      );
      setFilteredFriends(filtered);
    }
  };

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  const addTags = (e) => {
    if (e.key === "Enter") {
      if (isValidSteamID(e.target.value)) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      } else {
        alert("Invalid SteamID32");
      }
    }
  };

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
        <div className="flex flex-col gap-2">
          <h1 className="text-white font-medium text-3xl">
            {playerData.Badmin.Name} &#8226;{" "}
            <span className="text-zinc-400">{playerData.SteamID32}</span>
          </h1>
          <div className="flex gap-2">
            <div className="p-2 bg-tetraDark w-1/2 text-center font-medium text-white rounded-xl">
              <span className="text-gray-400">First Join: </span>
              {convertUnixToDate(playerData.Badmin.FirstJoin)}
            </div>
            <div className="p-2 bg-tetraDark w-1/2 text-center font-medium text-white rounded-xl">
              <span className="text-gray-400">Last Seen: </span>
              {formatPlaytime(playerData.Badmin.LastSeen)} ago
            </div>
          </div>
        </div>
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

      <div className="flex flex-row gap-4 justify-center items-center my-10">
        <h1 className="font-bold text-xl text-white">Info</h1>
        <div className="rounded-xl bg-secondaryDark grow h-[3px]"></div>
      </div>

      <section className="flex flex-col gap-4">
        <section className="flex flex-col gap-4 md:flex-row">
          <Card
            content={playerData.Badmin.Ranks.DarkRP}
            title="DarkRP Rank"
            className={`w-1/3 border border-transparent ${getRankColor(
              playerData.Badmin.Ranks.DarkRP
            )}`}
          />
          <Card
            content={playerData.Badmin.Ranks.CWRP}
            title="CWRP Rank"
            className={`w-1/3 border border-transparent ${getRankColor(
              playerData.Badmin.Ranks.CWRP
            )}`}
          />
          <Card
            content={playerData.Badmin.Ranks.MilRP}
            title="MilRP Rank"
            className={`w-1/3 border border-transparent ${getRankColor(
              playerData.Badmin.Ranks.MilRP
            )}`}
          />
        </section>
        <section className="flex flex-col gap-4 md:flex-row">
          <Card
            content={formatPlaytime(playerData.Badmin.PlayTime)}
            title="Total Playtime"
            className={`w-1/3 border border-transparent hover:border-secondaryBlue`}
          />
          <Card
            content={getTimeForSsrpCharacters(cwrpPlayerData)}
            title="CWRP Playtime"
            className={`w-1/3 border border-transparent hover:border-secondaryBlue`}
          />
          <Card
            content={getTimeForSsrpCharacters(milrpPlayerData)}
            title="MilRP Playtime"
            className={`w-1/3 border border-transparent hover:border-secondaryBlue`}
          />
        </section>
      </section>
      <div className="flex flex-row gap-4 justify-center items-center my-10">
        <h1 className="font-bold text-xl text-white">DarkRP Stats</h1>
        <div className="rounded-xl bg-secondaryDark grow h-[3px]"></div>
      </div>

      <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        <Card
          content={formatCurrency(playerData.DarkRP.Money)}
          title="Money"
          className="border border-transparent hover:border-green-500"
        />
        <Card
          content={playerData.DarkRP.Karma}
          title="Karma"
          className="border border-transparent hover:border-purple-500"
        />
        <Card
          content={playerData.DarkRP.OrgName}
          className={`border border-transparent hover:border-[${playerData.DarkRP.OrgColor}]`}
          title="Org Name"
        />
        <Card
          content={playerData.DarkRP.Achievements.length}
          title="Total Achievements"
          className="border border-transparent hover:border-primaryBlue"
        />
      </section>
      <div className="flex flex-row gap-4 justify-center items-center">
        <h1 className="font-bold text-xl text-white">Previous Offences</h1>
        <div className="rounded-xl bg-secondaryDark grow h-[3px] my-10"></div>
      </div>

      <section className="container mx-auto rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondaryDark">
            <tr>
              <th className="px-4 py-2 text-white">Ban ID</th>
              <th className="px-4 py-2 text-white">Date</th>
              <th className="px-4 py-2 text-white">Server</th>
              <th className="px-4 py-2 text-white">Offender</th>
              <th className="px-4 py-2 text-white">Admin</th>
              <th className="px-4 py-2 text-white">Reason</th>
              <th className="px-4 py-2 text-white">Length</th>
              <th className="px-4 py-2 text-white">Unban Reason</th>
            </tr>
          </thead>
          <tbody>
            {playerData.Badmin.Bans.map((ban) => (
              <tr
                key={ban.BanID}
                className={`text-center ${
                  ban.UnbanReason
                    ? "bg-green-600"
                    : ban.IsActive
                    ? "bg-red-600"
                    : "bg-tetraDark"
                }`}
              >
                <td className="px-4 py-2 text-gray-300">{ban.BanID}</td>
                <td className="px-4 py-2 text-gray-300">
                  {convertUnixToDate(ban.Date)}
                </td>
                <td className="px-4 py-2 text-gray-300">{ban.Server}</td>
                <td className="px-4 py-2 text-gray-300">{ban.Name}</td>
                <td className="px-4 py-2 text-gray-300">{ban.AdminName}</td>
                <td className="px-4 py-2 text-gray-300">{ban.Reason}</td>
                <td className="px-4 py-2 text-gray-300">{ban.Length}</td>
                <td className="px-4 py-2 text-gray-300">{ban.UnbanReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="flex flex-row gap-4 justify-center items-center">
        <h1 className="font-bold text-xl text-white">Steam Friends</h1>
        <div className="rounded-xl bg-secondaryDark grow h-[3px] my-10"></div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-row gap-2 bg-secondaryDark rounded-xl p-2 grow">
          <ul className="flex gap-2">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="text-white bg-primaryBlue py-1 px-2 rounded-xl flex justify-between items-center gap-2"
              >
                {tag}
                <IoMdCloseCircleOutline
                  onClick={() => removeTags(index)}
                  className="hover:cursor-pointer"
                />
              </li>
            ))}
          </ul>
          <input
            placeholder="Input SteamID32"
            type="text"
            id="tagInput"
            onKeyUp={addTags}
            className="bg-transparent text-white outline-none border-none text-md"
          />
        </div>
        <button
          onClick={filterFriends}
          className="w-[5vw] bg-primaryBlue hover:bg-secondaryBlue rounded-xl text-white font-medium"
        >
          Filter
        </button>
      </div>

      <section className="container mx-auto rounded-xl overflow-hidden mt-4">
        {filteredFriends.length > 0 ? (
          <table className="w-full">
            <thead className="bg-secondaryDark">
              <tr>
                <th className="px-4 py-2 text-white">SteamID</th>
                <th className="px-4 py-2 text-white">Relationship</th>
                <th className="px-4 py-2 text-white">Friend Since</th>
              </tr>
            </thead>
            <tbody>
              {filteredFriends.map((friend) => (
                <tr key={friend.steamid} className="text-center bg-tetraDark">
                  <td className="px-4 py-2 text-gray-300">
                    {convertSteamID64ToSteamID32(friend.steamid)}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {friend.relationship}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {convertUnixToDate(friend.friend_since)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : friendsList.friends && friendsList.friends.length > 0 ? (
          <table className="w-full">
            <thead className="bg-secondaryDark">
              <tr>
                <th className="px-4 py-2 text-white">SteamID</th>
                <th className="px-4 py-2 text-white">Relationship</th>
                <th className="px-4 py-2 text-white">Friend Since</th>
              </tr>
            </thead>
            <tbody>
              {friendsList.friends.map((friend) => (
                <tr key={friend.steamid} className="text-center bg-tetraDark">
                  <td className="px-4 py-2 text-gray-300">
                    {convertSteamID64ToSteamID32(friend.steamid)}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {friend.relationship}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {convertUnixToDate(friend.friend_since)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-300">No friends found.</p>
        )}
      </section>
    </main>
  );
}
