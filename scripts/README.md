# Scripts Directory

This directory contains utility scripts for the Queue Up gaming app.

## Seed Data Generation

### `generateSeedData.js`

Generates comprehensive seed data for all games in the application.

**Features:**

- Creates 20 players for each of the 9 supported games (180 total players)
- Ensures at least 5 players per game are currently in active gaming sessions
- Includes realistic usernames, avatars, skill levels, playstyles, and ranks
- Generates game-appropriate ranks and playstyles for each game
- Provides detailed statistics and breakdowns

**Usage:**

```bash
# Using npm script
npm run generate-seed

# Or directly with Node.js
node scripts/generateSeedData.js
```

**Output:**

- Generates `generated/comprehensive-seed-data.json` with complete data
- Displays statistics in the console including:
  - Total players per game
  - Players currently in active sessions
  - Skill level distribution
  - Generation timestamp

**Games Supported:**

- Valorant
- League of Legends
- Apex Legends
- Counter-Strike 2
- Overwatch 2
- Fortnite
- Minecraft
- Rocket League
- Call of Duty: Warzone

**Data Structure:**
Each player includes:

- Unique ID
- Username
- Avatar emoji
- Game association
- Available until time
- Skill level (Beginner/Intermediate/Advanced/Pro)
- Playstyles array
- Online status
- Currently in game status
- Game-specific rank
- Hours played

The generated data is automatically used by the application through the `seedDataGenerator.ts` module.
