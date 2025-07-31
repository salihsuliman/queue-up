"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { games } from "@/lib/games";
import { ArrowLeft, Camera, Edit, Save, X, Gamepad2, User } from "lucide-react";

interface UserProfile {
  username: string;
  email: string;
  avatar: string;
  bio: string;
  age: string;
  location: string;
  favoriteGames: string[];
  skillLevel: "Beginner" | "Intermediate" | "Advanced" | "Pro";
  playstyle: string[];
  availability: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    username: "GamerPro2024",
    email: "gamerpro@example.com",
    avatar: "🎮",
    bio: "Passionate gamer looking for teammates to climb the ranks!",
    age: "25",
    location: "San Francisco, CA",
    favoriteGames: ["valorant", "league-of-legends", "cs2"],
    skillLevel: "Advanced",
    playstyle: ["Competitive", "Team Player", "Strategic"],
    availability: "Evenings & Weekends",
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const toggleFavoriteGame = (gameId: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      favoriteGames: prev.favoriteGames.includes(gameId)
        ? prev.favoriteGames.filter((id) => id !== gameId)
        : [...prev.favoriteGames, gameId],
    }));
  };

  const playstyleOptions = [
    "Competitive",
    "Casual",
    "Team Player",
    "Solo",
    "Strategic",
    "Aggressive",
    "Supportive",
    "IGL",
    "Fragger",
    "Friendly",
  ];

  const togglePlaystyle = (style: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      playstyle: prev.playstyle.includes(style)
        ? prev.playstyle.filter((s) => s !== style)
        : [...prev.playstyle, style],
    }));
  };

  const avatarOptions = [
    "🎮",
    "🎯",
    "🚀",
    "💀",
    "😎",
    "🤖",
    "👑",
    "⚡",
    "🔥",
    "💎",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Optimized Background */}
      <div className="fixed inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
            linear-gradient(rgba(212, 255, 51, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 255, 51, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Optimized Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-[#d4ff33]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="w-14 h-14 p-4 hover:bg-[#d4ff33]/10 transition-colors duration-200"
              >
                <ArrowLeft className="w-10! h-10!" color="#d4ff33" />
              </Button>

              {/* Gaming Logo */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#d4ff33] via-[#b8e62e] to-[#9fd124] rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#d4ff33] rounded-full animate-pulse" />
              </div>

              <h1 className="text-2xl font-semibold text-[#d4ff33] tracking-wide">
                Queue<span className="text-white font-light">Up</span>
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-14 h-14 p-4 hover:bg-[#d4ff33]/10 transition-colors duration-200"
                    onClick={handleCancel}
                  >
                    <X className="w-10! h-10!" color="#d4ff33" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-14 h-14 p-4 hover:bg-[#d4ff33]/10 transition-colors duration-200"
                    onClick={handleSave}
                  >
                    <Save className="w-10! h-10!" color="#d4ff33" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  className="w-14 h-14 p-4 hover:bg-[#d4ff33]/10 transition-colors duration-200"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-10! h-10!" color="#d4ff33" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          {/* Profile Header */}
          <div className="animate-fadeIn">
            <Card className="bg-black/60 border-2 border-[#d4ff33]/30">
              <CardContent className="p-8">
                <div className="flex items-start space-x-8">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="w-28 h-28 text-4xl border-4 border-[#d4ff33]/50 transition-all duration-200 hover:border-[#d4ff33]/70">
                        <AvatarFallback className="bg-gradient-to-br from-[#d4ff33]/20 to-[#b8e62e]/10 text-white">
                          {isEditing ? editedProfile.avatar : profile.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <div className="absolute -bottom-2 -right-2 animate-bounce-subtle">
                          <div className="w-8 h-8 bg-[#d4ff33] rounded-full flex items-center justify-center">
                            <Camera className="w-4 h-4 text-black" />
                          </div>
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <div className="grid grid-cols-5 gap-2 max-w-[200px] animate-slideUp">
                        {avatarOptions.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() =>
                              setEditedProfile((prev) => ({
                                ...prev,
                                avatar: emoji,
                              }))
                            }
                            className={`w-8 h-8 rounded-lg hover:bg-[#d4ff33]/20 transition-all duration-200 flex items-center justify-center hover:scale-105 ${
                              editedProfile.avatar === emoji
                                ? "bg-[#d4ff33] text-black"
                                : "bg-black/50 text-white border border-[#d4ff33]/30"
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-4">
                    {isEditing ? (
                      <div className="space-y-4 animate-slideInLeft">
                        <Input
                          value={editedProfile.username}
                          onChange={(e) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          placeholder="Username"
                          className="text-2xl font-bold h-12 border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] bg-black/50 text-white transition-colors duration-200"
                        />
                        <Input
                          value={editedProfile.email}
                          onChange={(e) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="Email"
                          type="email"
                          className="border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] bg-black/50 text-white transition-colors duration-200"
                        />
                        <Input
                          value={editedProfile.bio}
                          onChange={(e) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          placeholder="Bio"
                          className="border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] bg-black/50 text-white transition-colors duration-200"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2 animate-slideInLeft">
                        <h2 className="text-3xl font-bold text-[#d4ff33]">
                          {profile.username}
                        </h2>
                        <p className="text-gray-300">{profile.email}</p>
                        <p className="text-white leading-relaxed">
                          {profile.bio}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personal Details */}
          <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
            <Card className="bg-black/60 border-2 border-[#d4ff33]/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#d4ff33]">
                  <span>👤</span>
                  Personal Details
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your basic information and gaming preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#d4ff33] uppercase tracking-wide">
                      Age
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.age}
                        onChange={(e) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            age: e.target.value,
                          }))
                        }
                        placeholder="Age"
                        className="border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] bg-black/50 text-white transition-colors duration-200"
                      />
                    ) : (
                      <div className="p-3 bg-black/30 rounded-lg border border-[#d4ff33]/30">
                        <span className="text-white">{profile.age}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#d4ff33] uppercase tracking-wide">
                      Location
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.location}
                        onChange={(e) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        placeholder="Location"
                        className="border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] bg-black/50 text-white transition-colors duration-200"
                      />
                    ) : (
                      <div className="p-3 bg-black/30 rounded-lg border border-[#d4ff33]/30">
                        <span className="text-white">{profile.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#d4ff33] uppercase tracking-wide">
                      Skill Level
                    </label>
                    {isEditing ? (
                      <Select
                        value={editedProfile.skillLevel}
                        onValueChange={(
                          value:
                            | "Beginner"
                            | "Intermediate"
                            | "Advanced"
                            | "Pro"
                        ) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            skillLevel: value,
                          }))
                        }
                      >
                        <SelectTrigger className="border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] bg-black/50 text-white transition-colors duration-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 border-2 border-[#d4ff33]/30">
                          <SelectItem
                            value="Beginner"
                            className="text-white hover:bg-[#d4ff33]/20"
                          >
                            Beginner
                          </SelectItem>
                          <SelectItem
                            value="Intermediate"
                            className="text-white hover:bg-[#d4ff33]/20"
                          >
                            Intermediate
                          </SelectItem>
                          <SelectItem
                            value="Advanced"
                            className="text-white hover:bg-[#d4ff33]/20"
                          >
                            Advanced
                          </SelectItem>
                          <SelectItem
                            value="Pro"
                            className="text-white hover:bg-[#d4ff33]/20"
                          >
                            Pro
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 bg-black/30 rounded-lg border border-[#d4ff33]/30">
                        <span className="text-white">{profile.skillLevel}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#d4ff33] uppercase tracking-wide">
                      Availability
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.availability}
                        onChange={(e) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            availability: e.target.value,
                          }))
                        }
                        placeholder="When are you usually available?"
                        className="border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] bg-black/50 text-white transition-colors duration-200"
                      />
                    ) : (
                      <div className="p-3 bg-black/30 rounded-lg border border-[#d4ff33]/30">
                        <span className="text-white">
                          {profile.availability}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Favorite Games */}
          <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
            <Card className="bg-black/60 border-2 border-[#d4ff33]/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#d4ff33]">
                  <span>🎮</span>
                  Favorite Games
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {isEditing
                    ? "Click to add/remove games from your favorites"
                    : "Games you love to play"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {games.map((game, index) => {
                    const isSelected = isEditing
                      ? editedProfile.favoriteGames.includes(game.id)
                      : profile.favoriteGames.includes(game.id);

                    return (
                      <div
                        key={game.id}
                        onClick={() => isEditing && toggleFavoriteGame(game.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 animate-slideInLeft ${
                          isSelected
                            ? "bg-gradient-to-br from-[#d4ff33]/20 to-[#b8e62e]/10 border-[#d4ff33] shadow-md"
                            : "bg-black/30 border-[#d4ff33]/30 hover:bg-black/50"
                        } ${
                          isEditing
                            ? "cursor-pointer hover:scale-105"
                            : "cursor-default"
                        }`}
                        style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-black/70 border border-[#d4ff33]/50 flex items-center justify-center overflow-hidden">
                            <Image
                              src={game.logo}
                              alt={`${game.name} logo`}
                              width={48}
                              height={48}
                              className="w-8 h-8 object-contain"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm text-white">
                              {game.name}
                            </div>
                            <div className="text-xs text-[#d4ff33]">
                              {game.category}
                            </div>
                            <div className="text-xs text-gray-400">
                              {game.developer}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 bg-[#d4ff33] rounded-full flex items-center justify-center animate-scale-in">
                              <span className="text-black text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Playstyle */}
          <div className="animate-slideUp" style={{ animationDelay: "0.3s" }}>
            <Card className="bg-black/60 border-2 border-[#d4ff33]/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#d4ff33]">
                  <span>🎯</span>
                  Playstyle
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {isEditing
                    ? "Click to add/remove playstyle tags"
                    : "How you like to play"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {playstyleOptions.map((style, index) => {
                    const isSelected = isEditing
                      ? editedProfile.playstyle.includes(style)
                      : profile.playstyle.includes(style);

                    return (
                      <button
                        key={style}
                        onClick={() => isEditing && togglePlaystyle(style)}
                        disabled={!isEditing}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border animate-slideInLeft ${
                          isSelected
                            ? "bg-gradient-to-r from-[#d4ff33] to-[#b8e62e] text-black border-[#d4ff33] shadow-md"
                            : "bg-black/50 text-white border-[#d4ff33]/30 hover:bg-black/70"
                        } ${
                          isEditing
                            ? "cursor-pointer hover:scale-105"
                            : "cursor-default"
                        }`}
                        style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                      >
                        {style}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
