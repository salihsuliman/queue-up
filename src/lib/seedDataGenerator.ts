// Import the pre-generated comprehensive seed data
import seedDataRaw from "../../generated/comprehensive-seed-data.json";

interface SeedPlayer {
  id: string;
  username: string;
  avatar: string;
  game: string;
  availableUntil: string;
  skill: "Beginner" | "Intermediate" | "Advanced" | "Pro";
  playstyle: string[];
  online: boolean;
  currentlyInGame: boolean;
  rank: string;
  hoursPlayed: number;
  // Enhanced profile fields
  age: number;
  location: string;
  profession: string;
}

interface GameBreakdown {
  totalPlayers: number;
  currentlyInGame: number;
  skillDistribution: {
    Beginner: number;
    Intermediate: number;
    Advanced: number;
    Pro: number;
  };
  ageDistribution: {
    "16-20": number;
    "21-25": number;
    "26-30": number;
    "31-35": number;
  };
  topLocations: string[];
  topProfessions: string[];
}

// Type-safe conversion of the imported data
const seedData = seedDataRaw as {
  players: SeedPlayer[];
  metadata: {
    totalPlayers: number;
    gamesIncluded: number;
    playersPerGame: number;
    currentlyInGameCount: number;
    generatedAt: string;
    description: string;
  };
  gameBreakdown: Record<string, GameBreakdown>;
};

// Cache the player data for performance
const allPlayers: SeedPlayer[] = seedData.players;

export function getPlayersByGame(gameId: string): SeedPlayer[] {
  return allPlayers.filter((player) => player.game === gameId);
}

export function getAllPlayers(): SeedPlayer[] {
  return allPlayers;
}

export function getPlayerById(playerId: string): SeedPlayer | undefined {
  return allPlayers.find((player) => player.id === playerId);
}

// Get statistics about the data
export function getSeedDataStats() {
  return {
    totalPlayers: allPlayers.length,
    playersByGame: seedData.gameBreakdown,
    metadata: seedData.metadata,
  };
}

// Legacy function for backward compatibility (now uses pre-generated data)
export function generateAllSeedData(): SeedPlayer[] {
  console.warn(
    "generateAllSeedData() is deprecated. Using pre-generated data instead."
  );
  return allPlayers;
}

// Legacy function for backward compatibility
export function generateSeedDataFile() {
  console.warn(
    "generateSeedDataFile() is deprecated. Use the generateSeedData.js script instead."
  );
  return seedData;
}
