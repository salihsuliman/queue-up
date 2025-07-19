"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getGameById } from "@/lib/games";
import {
  ArrowLeft,
  Clock,
  MessageCircle,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { Suspense } from "react";

/**
 * Player interface for search results
 */
interface Player {
  id: string;
  username: string;
  avatar?: string;
  rank: string;
  rating: number;
  playingUntil: string;
  favoriteRole: string;
  isOnline: boolean;
}

/**
 * Mock player data for demonstration
 * In a real app, this would come from an API
 */
const MOCK_PLAYERS: Player[] = [
  {
    id: "1",
    username: "GamerPro2024",
    avatar: "/avatars/player1.jpg",
    rank: "Diamond III",
    rating: 4.8,
    playingUntil: "23:30",
    favoriteRole: "DPS",
    isOnline: true,
  },
  {
    id: "2",
    username: "SniperQueen",
    rank: "Platinum I",
    rating: 4.6,
    playingUntil: "22:45",
    favoriteRole: "Support",
    isOnline: true,
  },
  {
    id: "3",
    username: "TacticalNinja",
    rank: "Diamond I",
    rating: 4.9,
    playingUntil: "00:15",
    favoriteRole: "Tank",
    isOnline: false,
  },
  {
    id: "4",
    username: "CasualGamer",
    rank: "Gold II",
    rating: 4.2,
    playingUntil: "22:00",
    favoriteRole: "Flex",
    isOnline: true,
  },
  {
    id: "5",
    username: "ProShooter",
    rank: "Immortal",
    rating: 4.95,
    playingUntil: "01:00",
    favoriteRole: "Entry",
    isOnline: true,
  },
];

/**
 * Player card component displaying player information
 */
function PlayerCard({ player }: { player: Player }) {
  return (
    <Card className="border-border bg-card game-card hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={player.avatar} alt={player.username} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {player.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {player.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{player.username}</CardTitle>
              <CardDescription className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>{player.rank}</span>
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{player.rating}</span>
            </div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Playing until {player.playingUntil}</span>
          </div>
          <div className="text-muted-foreground">
            Role: {player.favoriteRole}
          </div>
        </div>
        <Button className="w-full gaming-gradient hover:opacity-90">
          <MessageCircle className="h-4 w-4 mr-2" />
          Send Invite
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * Search results content component
 */
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const gameId = searchParams.get("game");
  const until = searchParams.get("until");

  const game = gameId ? getGameById(gameId) : null;

  if (!game || !until) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Invalid search parameters</p>
        <Button onClick={() => router.push("/")} className="mt-4">
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{game.icon}</span>
              <div>
                <h1 className="text-xl font-bold">{game.name} Players</h1>
                <p className="text-sm text-muted-foreground">
                  Available until {until}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Available Players</h2>
              <p className="text-muted-foreground">
                {MOCK_PLAYERS.length} players found for {game.name}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {MOCK_PLAYERS.filter((p) => p.isOnline).length} online
              </span>
            </div>
          </div>

          {/* Player Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PLAYERS.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>

          {/* No Results Message */}
          {MOCK_PLAYERS.length === 0 && (
            <Card className="border-border bg-card">
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No players found</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to queue up for {game.name}!
                </p>
                <Button onClick={() => router.push("/")}>
                  Try Another Game
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

/**
 * Search results page component with Suspense wrapper
 * Shows available players for the selected game and time
 */
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading players...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
