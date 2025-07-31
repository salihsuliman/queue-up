import fs from "fs";
import path from "path";

// Copy the seed data generator logic for Node.js
const gameRanks = {
  valorant: [
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Ascendant",
    "Immortal",
    "Radiant",
  ],
  "league-of-legends": [
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Master",
    "Grandmaster",
    "Challenger",
  ],
  "apex-legends": [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Master",
    "Predator",
  ],
  cs2: ["Silver", "Gold Nova", "MG", "DMG", "LEM", "SMFC", "Global Elite"],
  "overwatch-2": [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Master",
    "Grandmaster",
  ],
  fortnite: [
    "Open League",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Elite",
    "Champion",
    "Unreal",
  ],
  minecraft: ["Novice", "Apprentice", "Journeyman", "Expert", "Master"],
  "rocket-league": [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Champion",
    "Grand Champion",
    "Supersonic Legend",
  ],
  warzone: [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Crimson",
    "Iridescent",
    "Top 250",
  ],
};

const gamePlaystyles = {
  valorant: [
    "IGL",
    "Entry Fragger",
    "Support",
    "Lurker",
    "AWP",
    "Controller",
    "Initiator",
    "Duelist",
    "Sentinel",
  ],
  "league-of-legends": [
    "Top Lane",
    "Jungle",
    "Mid Lane",
    "ADC",
    "Support",
    "Tank",
    "Assassin",
    "Mage",
    "Marksman",
  ],
  "apex-legends": [
    "Assault",
    "Support",
    "Recon",
    "Controller",
    "Aggressive",
    "Defensive",
    "Flanker",
    "IGL",
  ],
  cs2: [
    "Entry Fragger",
    "Support",
    "AWP",
    "IGL",
    "Lurker",
    "Rifler",
    "Clutch",
    "Utility",
  ],
  "overwatch-2": [
    "Tank",
    "DPS",
    "Support",
    "Flanker",
    "Main Tank",
    "Off Tank",
    "Hitscan",
    "Projectile",
  ],
  fortnite: [
    "Aggressive",
    "Builder",
    "Editor",
    "IGL",
    "Support",
    "Fragger",
    "Zone Player",
  ],
  minecraft: [
    "Builder",
    "PvP",
    "Redstone",
    "Explorer",
    "Farmer",
    "Miner",
    "Creative",
  ],
  "rocket-league": [
    "Striker",
    "Goalkeeper",
    "Playmaker",
    "Defender",
    "Aerial",
    "Ground Play",
    "Rotation",
  ],
  warzone: [
    "Sniper",
    "Assault",
    "Support",
    "IGL",
    "Flanker",
    "Objective",
    "Loadout",
  ],
};

const avatars = [
  "🎯",
  "⚡",
  "🔥",
  "💀",
  "🎮",
  "👑",
  "💎",
  "🌟",
  "🚀",
  "🛡️",
  "🗡️",
  "🏹",
  "💣",
  "🌀",
  "👻",
  "🐺",
  "🦅",
  "🌸",
  "💨",
  "🔧",
];

const times = [
  "11:00 PM",
  "11:15 PM",
  "11:30 PM",
  "11:45 PM",
  "12:00 AM",
  "12:15 AM",
  "12:30 AM",
  "12:45 AM",
  "1:00 AM",
  "1:15 AM",
  "1:30 AM",
  "1:45 AM",
  "2:00 AM",
  "2:15 AM",
  "2:30 AM",
  "2:45 AM",
];

// New data arrays for enhanced player profiles
const locations = [
  "Los Angeles, CA",
  "New York, NY",
  "London, UK",
  "Tokyo, Japan",
  "Berlin, Germany",
  "Toronto, ON",
  "Sydney, Australia",
  "Seoul, South Korea",
  "São Paulo, Brazil",
  "Mexico City, Mexico",
  "Paris, France",
  "Amsterdam, Netherlands",
  "Stockholm, Sweden",
  "Singapore",
  "Dubai, UAE",
  "Vancouver, BC",
  "Chicago, IL",
  "Miami, FL",
  "Seattle, WA",
  "Austin, TX",
  "Boston, MA",
  "San Francisco, CA",
  "Montreal, QC",
  "Melbourne, Australia",
  "Manchester, UK",
  "Barcelona, Spain",
  "Rome, Italy",
  "Oslo, Norway",
  "Copenhagen, Denmark",
  "Helsinki, Finland",
  "Zurich, Switzerland",
  "Vienna, Austria",
  "Prague, Czech Republic",
  "Warsaw, Poland",
  "Budapest, Hungary",
  "Taipei, Taiwan",
  "Hong Kong",
  "Mumbai, India",
  "Bangkok, Thailand",
  "Jakarta, Indonesia",
];

const professions = [
  "Software Engineer",
  "Student",
  "Graphic Designer",
  "Marketing Manager",
  "Data Analyst",
  "Teacher",
  "Content Creator",
  "Sales Representative",
  "Product Manager",
  "Freelancer",
  "Accountant",
  "Web Developer",
  "Nurse",
  "Consultant",
  "Engineer",
  "Artist",
  "Photographer",
  "Writer",
  "Entrepreneur",
  "Research Scientist",
  "UX Designer",
  "Project Manager",
  "Financial Analyst",
  "Social Media Manager",
  "Customer Support",
  "Game Developer",
  "Streamer",
  "Video Editor",
  "3D Artist",
  "Translator",
  "Musician",
  "Chef",
  "Fitness Trainer",
  "Therapist",
  "Lawyer",
  "Doctor",
  "Pharmacist",
  "Real Estate Agent",
  "Insurance Agent",
  "Bank Teller",
];

function generatePlayersForGame(gameId) {
  const players = [];
  const ranks = gameRanks[gameId];
  const playstyles = gamePlaystyles[gameId];

  for (let i = 1; i <= 20; i++) {
    const skillLevels = ["Beginner", "Intermediate", "Advanced", "Pro"];
    const skill = skillLevels[Math.floor(Math.random() * skillLevels.length)];

    // Ensure at least 5 players are currently in game
    const currentlyInGame = i <= 5 || Math.random() < 0.25;

    // Generate realistic age (16-35 range, weighted towards 18-28)
    const ageRanges = [
      16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
      34, 35,
    ];
    const ageWeights = [
      1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 16, 14, 12, 10, 8, 6, 4, 3, 2, 1,
    ];
    let randomAge;
    let totalWeight = ageWeights.reduce((sum, weight) => sum + weight, 0);
    let randomWeight = Math.random() * totalWeight;

    for (let j = 0; j < ageRanges.length; j++) {
      randomWeight -= ageWeights[j];
      if (randomWeight <= 0) {
        randomAge = ageRanges[j];
        break;
      }
    }

    // Generate realistic username variations
    const usernameTemplates = [
      `${gameId.charAt(0).toUpperCase()}${gameId.slice(1)}Pro${i
        .toString()
        .padStart(2, "0")}`,
      `${skill}Player${i}`,
      `${playstyles[i % playstyles.length].replace(/\s+/g, "")}${i}`,
      `Gamer${skill}${i}`,
      `Elite${gameId.slice(0, 3).toUpperCase()}${i}`,
    ];

    const player = {
      id: `${gameId.replace(/-/g, "_")}_${i.toString().padStart(3, "0")}`,
      username: usernameTemplates[i % usernameTemplates.length],
      avatar: avatars[i % avatars.length],
      game: gameId,
      availableUntil: times[Math.floor(Math.random() * times.length)],
      skill,
      playstyle: [
        playstyles[Math.floor(Math.random() * playstyles.length)],
        playstyles[Math.floor(Math.random() * playstyles.length)],
        playstyles[Math.floor(Math.random() * playstyles.length)],
      ].filter((value, index, self) => self.indexOf(value) === index), // Remove duplicates
      online: Math.random() < 0.9, // 90% chance of being online
      currentlyInGame,
      rank: ranks[Math.floor(Math.random() * ranks.length)],
      hoursPlayed: Math.floor(Math.random() * 5000) + 100,
      // New fields
      age: randomAge,
      location: locations[Math.floor(Math.random() * locations.length)],
      profession: professions[Math.floor(Math.random() * professions.length)],
    };

    players.push(player);
  }

  return players;
}

function generateAllSeedData() {
  const gameIds = [
    "valorant",
    "league-of-legends",
    "apex-legends",
    "cs2",
    "overwatch-2",
    "fortnite",
    "minecraft",
    "rocket-league",
    "warzone",
  ];

  const allPlayers = [];

  for (const gameId of gameIds) {
    const gamePlayers = generatePlayersForGame(gameId);
    allPlayers.push(...gamePlayers);
  }

  return allPlayers;
}

// Generate the data
const allPlayers = generateAllSeedData();
const seedData = {
  players: allPlayers,
  metadata: {
    totalPlayers: allPlayers.length,
    gamesIncluded: 9,
    playersPerGame: 20,
    currentlyInGameCount: allPlayers.filter((p) => p.currentlyInGame).length,
    generatedAt: new Date().toISOString(),
    description:
      "Comprehensive seed data for Queue Up gaming app with enhanced player profiles including age, location, and profession data. 20 players per game, ensuring at least 5 players per game are currently in active sessions.",
  },
  gameBreakdown: {},
};

// Add game breakdown
const gameIds = [
  "valorant",
  "league-of-legends",
  "apex-legends",
  "cs2",
  "overwatch-2",
  "fortnite",
  "minecraft",
  "rocket-league",
  "warzone",
];
gameIds.forEach((gameId) => {
  const gamePlayers = allPlayers.filter((p) => p.game === gameId);
  seedData.gameBreakdown[gameId] = {
    totalPlayers: gamePlayers.length,
    currentlyInGame: gamePlayers.filter((p) => p.currentlyInGame).length,
    skillDistribution: {
      Beginner: gamePlayers.filter((p) => p.skill === "Beginner").length,
      Intermediate: gamePlayers.filter((p) => p.skill === "Intermediate")
        .length,
      Advanced: gamePlayers.filter((p) => p.skill === "Advanced").length,
      Pro: gamePlayers.filter((p) => p.skill === "Pro").length,
    },
    ageDistribution: {
      "16-20": gamePlayers.filter((p) => p.age >= 16 && p.age <= 20).length,
      "21-25": gamePlayers.filter((p) => p.age >= 21 && p.age <= 25).length,
      "26-30": gamePlayers.filter((p) => p.age >= 26 && p.age <= 30).length,
      "31-35": gamePlayers.filter((p) => p.age >= 31 && p.age <= 35).length,
    },
    topLocations: [...new Set(gamePlayers.map((p) => p.location))].slice(0, 5),
    topProfessions: [...new Set(gamePlayers.map((p) => p.profession))].slice(
      0,
      5
    ),
  };
});

// Create output directory if it doesn't exist
const outputDir = path.join(process.cwd(), "generated");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the seed data to a file
const outputPath = path.join(outputDir, "comprehensive-seed-data.json");
fs.writeFileSync(outputPath, JSON.stringify(seedData, null, 2));

console.log(`✅ Enhanced comprehensive seed data generated successfully!`);
console.log(`📁 File location: ${outputPath}`);
console.log(`📊 Total players: ${seedData.metadata.totalPlayers}`);
console.log(`🎮 Games included: ${seedData.metadata.gamesIncluded}`);
console.log(`🎯 Players per game: ${seedData.metadata.playersPerGame}`);
console.log(`⚡ Currently in game: ${seedData.metadata.currentlyInGameCount}`);
console.log(`\n📈 Game Breakdown:`);

Object.entries(seedData.gameBreakdown).forEach(([game, data]) => {
  console.log(
    `  ${game}: ${data.totalPlayers} players (${data.currentlyInGame} in game)`
  );
});

console.log(`\n🌍 Enhanced Data Features:`);
console.log(`  • Age distribution: 16-35 years (weighted towards 18-28)`);
console.log(`  • ${locations.length} unique locations worldwide`);
console.log(`  • ${professions.length} different professions`);
console.log(`  • Realistic demographic data for each player`);

console.log(`\n🕒 Generated at: ${seedData.metadata.generatedAt}`);
