"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GAMES } from "@/lib/games";
import { Clock, Gamepad2, Users, Search } from "lucide-react";

/**
 * Home page component for QueueUp
 * Allows users to select a game and specify their availability time
 */
export default function Home() {
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [playUntil, setPlayUntil] = useState<string>("");
  const router = useRouter();

  /**
   * Handles the search submission
   * Redirects to search results page with selected game and time
   */
  const handleSearch = () => {
    if (selectedGame && playUntil) {
      const searchParams = new URLSearchParams({
        game: selectedGame,
        until: playUntil,
      });
      router.push(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold gaming-gradient bg-clip-text text-transparent">
                QueueUp
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/profile")}
              className="border-primary/20 hover:border-primary"
            >
              Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Find Your Gaming Squad</h2>
            <p className="text-muted-foreground text-lg">
              Connect with fellow gamers and queue up for your favorite games
            </p>
          </div>

          {/* Search Form */}
          <Card className="border-border bg-card game-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <span>Start Your Queue</span>
              </CardTitle>
              <CardDescription>
                Select your game and tell us when you'll be playing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Game Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Choose Your Game
                </label>
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a game to play" />
                  </SelectTrigger>
                  <SelectContent>
                    {GAMES.map((game) => (
                      <SelectItem key={game.id} value={game.id}>
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{game.icon}</span>
                          <div>
                            <div className="font-medium">{game.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {game.category} • {game.playerCount}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Playing Until</span>
                </label>
                <Input
                  type="time"
                  value={playUntil}
                  onChange={(e) => setPlayUntil(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                disabled={!selectedGame || !playUntil}
                className="w-full gaming-gradient hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Players
              </Button>
            </CardContent>
          </Card>

          {/* Popular Games Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Popular Games</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {GAMES.slice(0, 5).map((game) => (
                <Card
                  key={game.id}
                  className="cursor-pointer game-card border-border bg-card hover:border-primary/30"
                  onClick={() => setSelectedGame(game.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{game.icon}</div>
                    <div className="text-sm font-medium">{game.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {game.category}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
