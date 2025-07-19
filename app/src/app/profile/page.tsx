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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GAMES } from "@/lib/games";
import {
  ArrowLeft,
  Camera,
  Edit,
  Save,
  Star,
  Trophy,
  User,
  X,
} from "lucide-react";

/**
 * User profile interface
 */
interface UserProfile {
  username: string;
  email: string;
  avatar?: string;
  bio: string;
  favoriteGames: string[];
  preferredRole: string;
  rank: string;
  rating: number;
  gamesPlayed: number;
}

/**
 * Mock user profile data
 */
const INITIAL_PROFILE: UserProfile = {
  username: "GamerPro2024",
  email: "gamer@example.com",
  bio: "Passionate gamer looking for teammates to climb the ranks!",
  favoriteGames: ["valorant", "league-of-legends", "counter-strike"],
  preferredRole: "DPS",
  rank: "Diamond III",
  rating: 4.8,
  gamesPlayed: 247,
};

/**
 * Profile page component for viewing and editing user information
 */
export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [editedProfile, setEditedProfile] =
    useState<UserProfile>(INITIAL_PROFILE);

  /**
   * Handles saving profile changes
   */
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // In a real app, this would make an API call to save the profile
  };

  /**
   * Handles canceling profile changes
   */
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  /**
   * Handles adding a favorite game
   */
  const addFavoriteGame = (gameId: string) => {
    if (
      !editedProfile.favoriteGames.includes(gameId) &&
      editedProfile.favoriteGames.length < 5
    ) {
      setEditedProfile({
        ...editedProfile,
        favoriteGames: [...editedProfile.favoriteGames, gameId],
      });
    }
  };

  /**
   * Handles removing a favorite game
   */
  const removeFavoriteGame = (gameId: string) => {
    setEditedProfile({
      ...editedProfile,
      favoriteGames: editedProfile.favoriteGames.filter((id) => id !== gameId),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Profile</h1>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="gaming-gradient">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt={profile.username} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {profile.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={editedProfile.username}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            username: e.target.value,
                          })
                        }
                        className="text-xl font-bold"
                      />
                      <Input
                        value={editedProfile.email}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            email: e.target.value,
                          })
                        }
                        type="email"
                      />
                      <Input
                        value={editedProfile.bio}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            bio: e.target.value,
                          })
                        }
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold">{profile.username}</h2>
                      <p className="text-muted-foreground">{profile.email}</p>
                      <p className="mt-2">{profile.bio}</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{profile.rating}</span>
                      <span className="text-muted-foreground">Rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="font-medium">{profile.rank}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{profile.gamesPlayed}</span>
                      <span className="text-muted-foreground">Games</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gaming Preferences */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Gaming Preferences</CardTitle>
              <CardDescription>
                Your preferred role and gaming style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Role</label>
                {isEditing ? (
                  <Select
                    value={editedProfile.preferredRole}
                    onValueChange={(value) =>
                      setEditedProfile({
                        ...editedProfile,
                        preferredRole: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DPS">DPS / Damage</SelectItem>
                      <SelectItem value="Tank">Tank</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Entry">Entry Fragger</SelectItem>
                      <SelectItem value="IGL">In-Game Leader</SelectItem>
                      <SelectItem value="Flex">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-foreground">{profile.preferredRole}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Favorite Games */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Favorite Games</CardTitle>
              <CardDescription>Games you love to play (max 5)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Favorite Games */}
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile : profile).favoriteGames.map(
                  (gameId) => {
                    const game = GAMES.find((g) => g.id === gameId);
                    if (!game) return null;

                    return (
                      <div
                        key={gameId}
                        className="flex items-center space-x-2 bg-secondary rounded-lg px-3 py-2"
                      >
                        <span className="text-lg">{game.icon}</span>
                        <span className="font-medium">{game.name}</span>
                        {isEditing && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-5 w-5 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => removeFavoriteGame(gameId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    );
                  }
                )}
              </div>

              {/* Add Games (when editing) */}
              {isEditing && editedProfile.favoriteGames.length < 5 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Add Games</label>
                  <Select onValueChange={addFavoriteGame}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a game to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {GAMES.filter(
                        (game) => !editedProfile.favoriteGames.includes(game.id)
                      ).map((game) => (
                        <SelectItem key={game.id} value={game.id}>
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{game.icon}</span>
                            <div>
                              <div className="font-medium">{game.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {game.category}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
