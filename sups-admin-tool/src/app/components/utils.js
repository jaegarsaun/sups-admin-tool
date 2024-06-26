export function formatPlaytime(int) {
  const hours = Math.floor(int / 3600);
  const mins = Math.floor((int % 3600) / 60);
  const secs = int % 60;

  // Format the time components to add leading zeros if necessary
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = mins.toString().padStart(2, "0");
  const formattedSeconds = secs.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function convertUnixToDate(unixTimestamp) {
  // Convert the string to an integer
  const timestamp = parseInt(unixTimestamp, 10);

  // Create a new Date object based on the Unix timestamp
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  // Format the date and time in a readable format
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function formatCurrency(value, locale = "en-US", currency = "USD") {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  });

  // Format the number and return it
  return formatter.format(value);
}

export function getRankColor(rank) {
  switch (rank) {
    case "User":
      return "hover:border-gray-500";
    case "VIP":
      return "hover:border-yellow-500";
    case "Double Admin":
      return "hover:border-pink-500";
    case "Moderator":
      return "hover:border-green-500";
    case "Admin":
      return "hover:border-purple-500";
    case "Super Admin":
      return "hover:border-red-500";
    case "Council":
      return "hover:border-secondaryBlue";
    default:
      return "hover:border-gray-500";
  }
}

export function getTimeForSsrpCharacters(SsrpPlayerData) {
  let totalPlaytime = 0;

  if (
    SsrpPlayerData &&
    SsrpPlayerData.response &&
    SsrpPlayerData.response.characters
  ) {
    let SsrpCharacterList = SsrpPlayerData.response.characters;

    for (let i = 0; i < SsrpCharacterList.length; i++) {
      totalPlaytime += SsrpCharacterList[i].playtime;
    }
    return formatPlaytime(totalPlaytime);
  }
  return "Loading...";
}

export function convertSteamID64ToSteamID32(steamID64) {
  const base = 76561197960265728n; // Base value for SteamID64 to SteamID conversion as BigInt
  const steamID64BigInt = BigInt(steamID64); // Ensure the input is treated as BigInt
  const result = steamID64BigInt - base;
  const remainder = result % 2n; // Use BigInt for modulo
  const zValue = result / 2n; // Use BigInt division

  return `STEAM_0:${remainder.toString()}:${zValue.toString()}`;
}

export function convertSteamID32ToSteamID64(steamID32) {
    const parts = steamID32.split(':');

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

    return steamID64.toString();
  }

  export function isValidSteamID(steamID) {
    const regex = /^STEAM_\d:\d:\d+$/;
    return regex.test(steamID);
}
