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
