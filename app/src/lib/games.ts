/**
 * Game interface defining the structure for game data
 */
export interface Game {
  id: string;
  name: string;
  icon: string; // Emoji or icon identifier
  category: string;
  playerCount: string;
}

/**
 * Popular games available for matchmaking
 * Includes a variety of genres to appeal to different gaming preferences
 */
export const GAMES: Game[] = [
  {
    id: "valorant",
    name: "Valorant",
    icon: "🎯",
    category: "FPS",
    playerCount: "5v5",
  },
  {
    id: "league-of-legends",
    name: "League of Legends",
    icon: "⚔️",
    category: "MOBA",
    playerCount: "5v5",
  },
  {
    id: "counter-strike",
    name: "Counter-Strike 2",
    icon: "💥",
    category: "FPS",
    playerCount: "5v5",
  },
  {
    id: "apex-legends",
    name: "Apex Legends",
    icon: "🌊",
    category: "Battle Royale",
    playerCount: "3-man squads",
  },
  {
    id: "overwatch",
    name: "Overwatch 2",
    icon: "🛡️",
    category: "FPS",
    playerCount: "5v5",
  },
  {
    id: "rocket-league",
    name: "Rocket League",
    icon: "⚽",
    category: "Sports",
    playerCount: "3v3",
  },
  {
    id: "fortnite",
    name: "Fortnite",
    icon: "🏗️",
    category: "Battle Royale",
    playerCount: "Squads",
  },
  {
    id: "dota2",
    name: "Dota 2",
    icon: "🗡️",
    category: "MOBA",
    playerCount: "5v5",
  },
  {
    id: "minecraft",
    name: "Minecraft",
    icon: "🧱",
    category: "Sandbox",
    playerCount: "Multiplayer",
  },
  {
    id: "among-us",
    name: "Among Us",
    icon: "🚀",
    category: "Social",
    playerCount: "4-15 players",
  },
];

/**
 * Get game by ID
 * @param gameId - The ID of the game to retrieve
 * @returns Game object or undefined if not found
 */
export const getGameById = (gameId: string): Game | undefined => {
  return GAMES.find((game) => game.id === gameId);
};

/**
 * Get games by category
 * @param category - The category to filter by
 * @returns Array of games in the specified category
 */
export const getGamesByCategory = (category: string): Game[] => {
  return GAMES.filter((game) => game.category === category);
};
