# 🎮 QueueUp - Gaming Partners Platform

QueueUp is a modern web application that helps gamers find teammates and friends to play their favorite games. Built with Next.js, Shadcn UI, and Tailwind CSS, it provides a sleek, dark-themed interface that's fully mobile-friendly.

## ✨ Features

### 🏠 Home Page

- **Game Selection**: Choose from 10 popular games including Valorant, League of Legends, CS2, and more
- **Time Planning**: Set how long you'll be playing (30 minutes to all night)
- **Smart Matching**: Find players based on your game choice and availability
- **Beautiful UI**: Dark-themed design with gradient backgrounds and glass morphism effects

### 🔍 Search Results

- **Player Cards**: Detailed player profiles with skill levels, playstyles, and availability
- **Skill Ratings**: Visual star rating system (Beginner to Pro)
- **Real-time Status**: See who's online and available to play
- **Quick Actions**: Easy "Queue Up" buttons to connect with players

### 👤 Profile Management

- **Avatar Customization**: Choose from 10 different emoji avatars
- **Personal Details**: Edit age, location, skill level, and availability
- **Favorite Games**: Select and manage your preferred games
- **Playstyle Tags**: Define your gaming style (Competitive, Casual, Strategic, etc.)
- **Editable Interface**: Toggle between view and edit modes seamlessly

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd queue-up
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Mobile Responsive

QueueUp is fully optimized for mobile devices with:

- Responsive grid layouts
- Touch-friendly buttons and interactions
- Optimized spacing and typography
- Adaptive navigation

## 🎨 Design Features

### Dark Theme

- Custom dark color palette
- High contrast for accessibility
- Consistent theming across all components
- Glass morphism effects with backdrop blur

### Modern UI Elements

- Gradient backgrounds
- Card-based layouts
- Smooth animations and transitions
- Clean typography with the Geist font family

## 🎯 User Flow

1. **Home Page**: Select your game and playing duration
2. **Search**: Click "Find Gaming Partners" to discover players
3. **Browse Results**: View available players with detailed profiles
4. **Connect**: Use "Queue Up" buttons to connect with teammates
5. **Profile**: Manage your gaming profile and preferences

## 🎮 Supported Games

- Valorant 🎯
- League of Legends ⚔️
- Apex Legends 🎮
- Counter-Strike 2 💣
- Overwatch 2 🚀
- Fortnite 🏗️
- Minecraft ⛏️
- Rocket League ⚽
- Call of Duty: Warzone 🔫
- Dota 2 🏛️

## 🔧 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with dark theme
│   ├── page.tsx        # Home page with game selection
│   ├── search/         # Search results page
│   └── profile/        # Profile management page
├── components/
│   └── ui/             # Shadcn UI components
├── lib/
│   ├── games.ts        # Game data and types
│   └── utils.ts        # Utility functions
└── globals.css         # Global styles and theme
```

## 🎨 Customization

### Adding New Games

Edit `src/lib/games.ts` to add new games:

```typescript
{
  id: "new-game",
  name: "New Game",
  logo: "🎲",
  category: "Genre",
  playerCount: "Team size"
}
```

### Theme Customization

Modify colors in `src/app/globals.css`:

```css
:root {
  --primary: oklch(0.205 0 0);
  --background: oklch(1 0 0);
  /* Add your custom colors */
}
```

## 📦 Build & Deploy

### Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npx vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- [ ] Real-time chat functionality
- [ ] Discord/Steam integration
- [ ] Advanced filtering and search
- [ ] User authentication
- [ ] Friend system
- [ ] Game statistics integration
- [ ] Push notifications
- [ ] Match history

## 📞 Support

For support or questions, please open an issue on GitHub.

---

**Built with ❤️ by the QueueUp team**
