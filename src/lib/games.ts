import { getPlayersByGame } from "./seedDataGenerator";

export interface Game {
  id: string;
  name: string;
  logo: string;
  category: string;
  playerCount: string;
  developer: string;
}

export const games: Game[] = [
  {
    id: "valorant",
    name: "Valorant",
    logo: "https://images.steamusercontent.com/ugc/1009310639741043947/C4780FD7B53B39EFE4A536842FC1281A48A1256F/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    category: "FPS",
    playerCount: "5v5",
    developer: "Riot Games",
  },
  {
    id: "league-of-legends",
    name: "League of Legends",
    logo: "https://images.seeklogo.com/logo-png/38/1/league-of-legends-logo-png_seeklogo-385125.png",
    category: "MOBA",
    playerCount: "5v5",
    developer: "Riot Games",
  },
  {
    id: "apex-legends",
    name: "Apex Legends",
    logo: "https://logodownload.org/wp-content/uploads/2019/02/apex-legends-logo-1.png",
    category: "Battle Royale",
    playerCount: "3-player squads",
    developer: "Respawn Entertainment",
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    logo: "https://cdn2.steamgriddb.com/icon_thumb/767a40871fcc018629b26f3a9ff39e19.png",
    category: "FPS",
    playerCount: "5v5",
    developer: "Valve",
  },
  {
    id: "overwatch-2",
    name: "Overwatch 2",
    logo: "https://images.seeklogo.com/logo-png/49/2/overwatch-2-logo-png_seeklogo-493763.png",
    category: "FPS",
    playerCount: "5v5",
    developer: "Blizzard Entertainment",
  },
  {
    id: "fortnite",
    name: "Fortnite",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png",
    category: "Battle Royale",
    playerCount: "Squads/Duos/Solo",
    developer: "Epic Games",
  },
  {
    id: "minecraft",
    name: "Minecraft",
    logo: "https://i.pinimg.com/1200x/7f/c4/9c/7fc49c4adbc07dfa36156c131d4c4f7a.jpg",
    category: "Sandbox",
    playerCount: "Varies",
    developer: "Mojang Studios",
  },
  {
    id: "rocket-league",
    name: "Rocket League",
    logo: "https://e7.pngegg.com/pngimages/484/347/png-clipart-blue-and-white-logo-rocket-league-video-game-psyonix-logo-decal-rocket-league-miscellaneous-game-thumbnail.png",
    category: "Sports",
    playerCount: "3v3",
    developer: "Psyonix",
  },
  {
    id: "warzone",
    name: "Call of Duty: Warzone",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4U-YDi3C9tB5XH4Jcytw1OgHGEzIIRFNHQ&s",
    category: "Battle Royale",
    playerCount: "Squads/Trios/Duos",
    developer: "Activision",
  },
];

export interface Player {
  id: string;
  username: string;
  avatar?: string;
  game: string;
  availableUntil: string;
  skill: "Beginner" | "Intermediate" | "Advanced" | "Pro";
  playstyle: string[];
  online: boolean;
  currentlyInGame?: boolean;
  rank?: string;
  hoursPlayed?: number;
  // Enhanced profile fields
  age: number;
  location: string;
  profession: string;
}

// Function to get players for a specific game
export function getPlayersForGame(gameId: string): Player[] {
  return getPlayersByGame(gameId);
}

// Legacy mock players for backward compatibility (now uses seed data)
export const mockPlayers: Player[] = getPlayersByGame("valorant");
