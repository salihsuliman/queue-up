"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Gamepad2,
  User,
  Users,
  Zap,
  Trophy,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  Briefcase,
  MapPin,
  Star,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { games } from "@/lib/games";
import { getAllPlayers } from "@/lib/seedDataGenerator";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Basic search states
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [playingUntil, setPlayingUntil] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter states
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [professionFilter, setProfessionFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [rankFilter, setRankFilter] = useState<string>("all");

  // Load filters from URL parameters on component mount
  useEffect(() => {
    const game = searchParams.get("game") || "";
    const until = searchParams.get("until") || "";
    const age = searchParams.get("age") || "all";
    const profession = searchParams.get("profession") || "all";
    const location = searchParams.get("location") || "all";
    const rank = searchParams.get("rank") || "all";

    setSelectedGame(game);
    setPlayingUntil(until);
    setAgeFilter(age);
    setProfessionFilter(profession);
    setLocationFilter(location);
    setRankFilter(rank);

    // Show filters if any are active
    if (
      age !== "all" ||
      profession !== "all" ||
      location !== "all" ||
      rank !== "all"
    ) {
      setShowFilters(true);
    }
  }, [searchParams]);

  // Get unique values for filter options from all players
  const allPlayers = getAllPlayers();

  const getUniqueProfessions = (): string[] => {
    return [...new Set(allPlayers.map((player) => player.profession))].sort();
  };

  const getUniqueLocations = (): string[] => {
    return [...new Set(allPlayers.map((player) => player.location))].sort();
  };

  const getUniqueRanks = (): string[] => {
    return [
      ...new Set(
        allPlayers
          .map((player) => player.rank)
          .filter((rank): rank is string => Boolean(rank))
      ),
    ].sort();
  };

  const clearFilters = () => {
    setAgeFilter("all");
    setProfessionFilter("all");
    setLocationFilter("all");
    setRankFilter("all");
  };

  const hasActiveFilters =
    ageFilter !== "all" ||
    professionFilter !== "all" ||
    locationFilter !== "all" ||
    rankFilter !== "all";

  const handleSearch = () => {
    if (selectedGame && playingUntil) {
      setIsLoading(true);

      // Random duration between 2-5 seconds (2000-5000ms)
      const randomDuration = Math.floor(Math.random() * 3000) + 2000;

      // Build URL parameters
      const params = new URLSearchParams({
        game: selectedGame,
        until: playingUntil,
      });

      // Add filter parameters if they're not "all"
      if (ageFilter !== "all") params.set("age", ageFilter);
      if (professionFilter !== "all")
        params.set("profession", professionFilter);
      if (locationFilter !== "all") params.set("location", locationFilter);
      if (rankFilter !== "all") params.set("rank", rankFilter);

      // Navigate after random duration with all parameters
      setTimeout(() => {
        router.push(`/search?${params.toString()}`);
      }, randomDuration);
    }
  };

  // Enhanced mock player data for better matching animation
  const mockPlayers = [
    {
      name: "ProGamer_X",
      rank: "Diamond",
      avatar: "🎮",
      compatibility: 98,
      location: "Los Angeles, CA",
    },
    {
      name: "SkillMaster",
      rank: "Platinum",
      avatar: "⚡",
      compatibility: 95,
      location: "Tokyo, Japan",
    },
    {
      name: "TeamPlayer",
      rank: "Gold",
      avatar: "🏆",
      compatibility: 92,
      location: "London, UK",
    },
    {
      name: "EpicGamer",
      rank: "Diamond",
      avatar: "🔥",
      compatibility: 89,
      location: "Berlin, Germany",
    },
    {
      name: "NightOwl",
      rank: "Master",
      avatar: "🦉",
      compatibility: 96,
      location: "Sydney, Australia",
    },
    {
      name: "CyberNinja",
      rank: "Platinum",
      avatar: "🥷",
      compatibility: 94,
      location: "Seoul, South Korea",
    },
    {
      name: "GameChanger",
      rank: "Diamond",
      avatar: "⭐",
      compatibility: 91,
      location: "New York, NY",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
        {/* Enhanced Background with more particles */}
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

          {/* Enhanced floating particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-floating ${
                i % 3 === 0
                  ? "w-2 h-2 bg-[#d4ff33]/40"
                  : i % 3 === 1
                  ? "w-1 h-1 bg-[#b8e62e]/30"
                  : "w-3 h-3 bg-[#d4ff33]/20"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}

          {/* Pulsing circles for energy */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`pulse-${i}`}
              className="absolute w-32 h-32 rounded-full border border-[#d4ff33]/10 animate-pulse"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Loading Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 max-h-screen overflow-y-auto">
          <div className="text-center space-y-8 animate-fadeIn">
            {/* Enhanced Main Logo */}
            <div className="animate-slideUp relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#d4ff33] via-[#b8e62e] to-[#9fd124] rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-scale shadow-2xl shadow-[#d4ff33]/50">
                <Gamepad2 className="w-12 h-12 text-black" />
              </div>

              {/* Orbiting elements around logo */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`orbit-${i}`}
                  className="absolute w-4 h-4 bg-[#d4ff33] rounded-full animate-spin-slow"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-8px",
                    marginTop: "-8px",
                    transform: `rotate(${i * 120}deg) translateX(60px)`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "3s",
                  }}
                />
              ))}

              {/* Enhanced title with glitch effect */}
              <h2 className="text-4xl md:text-5xl font-bold text-[#d4ff33] mb-4 animate-typewriter relative">
                <span className="inline-block">🔍 Finding Your Squad...</span>
                <div className="absolute inset-0 animate-pulse opacity-50">
                  <span className="text-[#b8e62e]">
                    🔍 Finding Your Squad...
                  </span>
                </div>
              </h2>

              <p
                className="text-gray-300 text-lg animate-slideUp"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="inline-block animate-bounce">⚡</span>{" "}
                Analyzing {allPlayers.length}+ players and compatibility
                <span
                  className="inline-block animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  ⚡
                </span>
              </p>
            </div>

            {/* Enhanced Progress Steps with dynamic timing */}
            <div
              className="space-y-4 animate-fadeIn"
              style={{ animationDelay: "1s" }}
            >
              {[
                {
                  step: "🌐 Scanning global player database...",
                  icon: "🔍",
                  delay: "0.8s",
                },
                {
                  step: "🧠 Analyzing skill compatibility matrix...",
                  icon: "⚡",
                  delay: "1.2s",
                },
                {
                  step: "🎯 Matching playstyle preferences...",
                  icon: "🎮",
                  delay: "1.6s",
                },
                {
                  step: "🏆 Ranking optimal squad combinations...",
                  icon: "🔥",
                  delay: "2s",
                },
                {
                  step: "✨ Finalizing perfect matches...",
                  icon: "🎉",
                  delay: "2.4s",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-3 animate-slideInLeft"
                  style={{ animationDelay: item.delay }}
                >
                  <div className="w-4 h-4 rounded-full bg-[#d4ff33] animate-pulse relative">
                    <div className="absolute inset-0 rounded-full bg-[#d4ff33] animate-ping" />
                  </div>
                  <span className="text-gray-300 text-sm md:text-base font-medium">
                    {item.step}
                  </span>
                  <span
                    className="text-lg animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.icon}
                  </span>
                </div>
              ))}
            </div>

            {/* Enhanced Player Matching Animation */}
            <div
              className="space-y-4 animate-fadeIn"
              style={{ animationDelay: "1.5s" }}
            >
              <h3 className="text-xl font-semibold text-[#d4ff33] mb-4 animate-pulse">
                🎯 Live Matching Results
              </h3>

              {mockPlayers.slice(0, 5).map((player, index) => (
                <div
                  key={player.name}
                  className="flex items-center justify-center animate-slideInLeft"
                  style={{ animationDelay: `${1.8 + index * 0.4}s` }}
                >
                  <div className="relative group">
                    <Card className="bg-black/70 border-2 border-[#d4ff33]/40 w-80 md:w-96 hover:border-[#d4ff33]/60 transition-all duration-300 hover:scale-105">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#d4ff33] to-[#b8e62e] rounded-full flex items-center justify-center text-xl animate-pulse">
                              {player.avatar}
                            </div>
                            {/* Animated rings around avatar */}
                            <div className="absolute inset-0 rounded-full border-2 border-[#d4ff33]/30 animate-ping" />
                            <div
                              className="absolute inset-0 rounded-full border border-[#b8e62e]/20 animate-pulse"
                              style={{ animationDelay: "0.5s" }}
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-base flex items-center space-x-2">
                              <span>{player.name}</span>
                              {player.compatibility > 95 && (
                                <span className="text-[#d4ff33] animate-bounce">
                                  ⭐
                                </span>
                              )}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <p className="text-[#d4ff33] text-sm font-medium">
                                {player.rank}
                              </p>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-gray-400 text-xs">
                                {player.location}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <div
                                  className="h-2 bg-gradient-to-r from-green-500 via-[#d4ff33] to-green-400 rounded-full transition-all duration-1000"
                                  style={{
                                    width: `${player.compatibility}%`,
                                    animationDelay: `${2 + index * 0.4}s`,
                                  }}
                                />
                              </div>
                              <span className="text-green-400 text-sm font-bold animate-pulse">
                                {player.compatibility}% Match
                              </span>
                            </div>
                          </div>

                          <div className="w-10 h-10 bg-[#d4ff33] rounded-full flex items-center justify-center animate-bounce-subtle">
                            <Users className="w-5 h-5 text-black" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enhanced match confirmation with glow */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-scale-in shadow-lg shadow-green-500/50"
                      style={{ animationDelay: `${2.2 + index * 0.4}s` }}
                    >
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>

                    {/* Glowing effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#d4ff33]/5 via-transparent to-[#d4ff33]/5 animate-pulse pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Progress Bar with multiple layers */}
            <div
              className="mt-8 animate-fadeIn"
              style={{ animationDelay: "1s" }}
            >
              <div className="relative">
                <div
                  className="h-3 bg-black/50 rounded-full mx-auto border-2 border-[#d4ff33]/30 overflow-hidden"
                  style={{ maxWidth: "400px" }}
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4ff33]/10 to-transparent animate-pulse" />

                  {/* Main progress */}
                  <div className="h-full bg-gradient-to-r from-[#d4ff33] via-[#b8e62e] to-[#d4ff33] rounded-full animate-progress-fill relative overflow-hidden">
                    {/* Enhanced shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

                    {/* Particle effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-bounce"
                          style={{
                            left: `${20 + i * 30}%`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: "1s",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced status text with typewriter effect */}
                <div className="text-center mt-4">
                  <span className="text-[#d4ff33] font-bold text-xl animate-pulse">
                    🚀 Matching in progress...
                  </span>
                  <div className="flex justify-center space-x-1 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-[#d4ff33] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time stats */}
            <div
              className="grid grid-cols-3 gap-4 mt-8 animate-slideUp"
              style={{ animationDelay: "2s" }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#d4ff33] animate-pulse">
                  {Math.floor(Math.random() * 50) + 150}+
                </div>
                <div className="text-xs text-gray-400">Players Online</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#b8e62e] animate-pulse">
                  {Math.floor(Math.random() * 20) + 80}%
                </div>
                <div className="text-xs text-gray-400">Match Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 animate-pulse">
                  {Math.floor(Math.random() * 5) + 15}
                </div>
                <div className="text-xs text-gray-400">Perfect Matches</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

              {/* Gaming accent */}
              <div className="hidden md:flex items-center space-x-1">
                <div className="w-2 h-2 bg-[#d4ff33] rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-[#d4ff33]/70 rounded-full" />
                <div
                  className="w-2 h-2 bg-[#d4ff33] rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-14 h-14 p-4 hover:bg-[#d4ff33]/10 transition-colors duration-200"
              onClick={() => router.push("/profile")}
            >
              <User className="w-10! h-10!" color="#d4ff33" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 pt-32">
        <div className="w-full max-w-5xl space-y-8">
          {/* Gaming Logo and Title */}
          <div className="text-center space-y-6 animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="relative animate-slideUp">
                <div className="w-20 h-20 bg-gradient-to-br from-[#d4ff33] via-[#b8e62e] to-[#9fd124] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#d4ff33]/40">
                  <Gamepad2 className="w-10 h-10 text-black" />
                </div>
                {/* Gaming accents around logo */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#d4ff33] rounded-full animate-bounce-subtle" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#d4ff33] rounded-square rotate-45" />
              </div>
            </div>

            <h1
              className="text-5xl md:text-7xl font-light text-[#d4ff33] tracking-wider animate-slideUp"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                textShadow: "0 0 20px rgba(212, 255, 51, 0.6)",
                letterSpacing: "2px",
                animationDelay: "0.2s",
              }}
            >
              Queue<span className="text-white font-extralight">Up</span>
            </h1>

            <p
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light animate-fadeIn"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                animationDelay: "0.4s",
              }}
            >
              Connect with elite gamers • Find your perfect squad • Dominate
              together
            </p>
          </div>

          {/* Search Card */}
          <div className="animate-slideUp" style={{ animationDelay: "0.6s" }}>
            <Card className="bg-black/70 border-2 border-[#d4ff33]/40 overflow-hidden">
              <CardContent className="space-y-6 p-8">
                {/* Game and Time Selection Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Game Selection */}
                  <div
                    className="space-y-3 animate-slideInLeft"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <label
                      className="text-sm font-medium text-[#d4ff33] block tracking-wide uppercase"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Select Game
                    </label>
                    <Select
                      value={selectedGame}
                      onValueChange={setSelectedGame}
                    >
                      <SelectTrigger
                        className="w-full h-16! border-2 border-[#d4ff33]/30 hover:border-[#d4ff33]/60 transition-all duration-300 bg-black/60 text-white rounded-lg px-6 py-4 text-xl"
                        style={{
                          fontFamily: "system-ui, -apple-system, sans-serif",
                        }}
                      >
                        <SelectValue placeholder="Choose your battlefield..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-64 bg-black/95 border-2 border-[#d4ff33]/30 backdrop-blur-sm">
                        {games.map((game) => (
                          <SelectItem
                            key={game.id}
                            value={game.id}
                            className="p-4 hover:bg-[#d4ff33]/10 transition-colors text-white"
                          >
                            <div className="flex items-center space-x-4 w-full">
                              <div className="w-10 h-10 rounded-lg bg-black/70 border border-[#d4ff33]/50 flex items-center justify-center overflow-hidden">
                                <Image
                                  src={game.logo}
                                  alt={`${game.name} logo`}
                                  width={40}
                                  height={40}
                                  className="w-8 h-8 object-contain"
                                  unoptimized
                                />
                              </div>
                              <div
                                className="flex-1 text-left"
                                style={{
                                  fontFamily:
                                    "system-ui, -apple-system, sans-serif",
                                }}
                              >
                                <div className="font-medium text-base text-white">
                                  {game.name}
                                </div>
                                <div className="text-sm text-[#d4ff33]">
                                  {game.category}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Selection */}
                  <div
                    className="space-y-3 animate-slideInRight"
                    style={{ animationDelay: "1s" }}
                  >
                    <label
                      className="text-sm font-medium text-[#d4ff33] block tracking-wide uppercase"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Playing Until
                    </label>

                    {/* Gaming Session Presets */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        {
                          label: "Quick Match",
                          duration: "1 hour",
                          time: (() => {
                            const now = new Date();
                            now.setHours(now.getHours() + 1);
                            return now.toTimeString().slice(0, 5);
                          })(),
                        },
                        {
                          label: "Gaming Session",
                          duration: "3 hours",
                          time: (() => {
                            const now = new Date();
                            now.setHours(now.getHours() + 3);
                            return now.toTimeString().slice(0, 5);
                          })(),
                        },
                        {
                          label: "Long Session",
                          duration: "5 hours",
                          time: (() => {
                            const now = new Date();
                            now.setHours(now.getHours() + 5);
                            return now.toTimeString().slice(0, 5);
                          })(),
                        },
                        {
                          label: "Until Midnight",
                          duration: "late night",
                          time: "23:59",
                        },
                      ].map((preset, index) => (
                        <Button
                          key={preset.label}
                          variant="outline"
                          onClick={() => setPlayingUntil(preset.time)}
                          className={`h-12 border-2 transition-all duration-200 text-sm font-medium ${
                            playingUntil === preset.time
                              ? "border-[#d4ff33] bg-[#d4ff33]/10 text-[#d4ff33]"
                              : "border-[#d4ff33]/30 text-gray-300 hover:border-[#d4ff33]/60 hover:bg-[#d4ff33]/5"
                          }`}
                          style={{ animationDelay: `${1.1 + index * 0.1}s` }}
                        >
                          <div className="text-center">
                            <div className="font-semibold">{preset.label}</div>
                            <div className="text-xs opacity-75">
                              {preset.duration}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>

                    {/* Custom Time Picker */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">
                          Custom Time
                        </span>
                        {playingUntil && (
                          <span className="text-xs text-[#d4ff33] font-medium">
                            Until {playingUntil}
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        {/* Time Display */}
                        <div
                          className="w-full h-16 border-2 border-[#d4ff33]/30 hover:border-[#d4ff33]/60 transition-all duration-300 bg-black/60 text-white rounded-lg px-6 py-4 text-xl flex items-center justify-center cursor-pointer group"
                          onClick={() =>
                            document.getElementById("time-input")?.focus()
                          }
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#d4ff33] via-[#b8e62e] to-[#9fd124] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <span className="text-black text-sm font-bold">
                                ⏰
                              </span>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#d4ff33] tabular-nums">
                                {playingUntil || "--:--"}
                              </div>
                              <div className="text-xs text-gray-400">
                                {playingUntil ? "Custom Time" : "Set your time"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Hidden HTML time input */}
                        <input
                          id="time-input"
                          type="time"
                          value={playingUntil}
                          onChange={(e) => setPlayingUntil(e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          style={{
                            fontFamily: "system-ui, -apple-system, sans-serif",
                          }}
                        />
                      </div>

                      {/* Time Quick Adjustments */}
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (playingUntil) {
                              const [hours, minutes] = playingUntil
                                .split(":")
                                .map(Number);
                              const newTime = new Date();
                              newTime.setHours(hours, minutes - 30, 0, 0);
                              if (newTime.getDate() === new Date().getDate()) {
                                setPlayingUntil(
                                  newTime.toTimeString().slice(0, 5)
                                );
                              }
                            }
                          }}
                          className="text-gray-400 hover:text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
                          disabled={!playingUntil}
                        >
                          -30m
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (playingUntil) {
                              const [hours, minutes] = playingUntil
                                .split(":")
                                .map(Number);
                              const newTime = new Date();
                              newTime.setHours(hours, minutes + 30, 0, 0);
                              setPlayingUntil(
                                newTime.toTimeString().slice(0, 5)
                              );
                            }
                          }}
                          className="text-gray-400 hover:text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
                          disabled={!playingUntil}
                        >
                          +30m
                        </Button>
                        <div className="w-px h-4 bg-[#d4ff33]/30 mx-2" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (playingUntil) {
                              const [hours, minutes] = playingUntil
                                .split(":")
                                .map(Number);
                              const newTime = new Date();
                              newTime.setHours(hours - 1, minutes, 0, 0);
                              if (
                                newTime.getDate() === new Date().getDate() &&
                                newTime > new Date()
                              ) {
                                setPlayingUntil(
                                  newTime.toTimeString().slice(0, 5)
                                );
                              }
                            }
                          }}
                          className="text-gray-400 hover:text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
                          disabled={!playingUntil}
                        >
                          -1h
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (playingUntil) {
                              const [hours, minutes] = playingUntil
                                .split(":")
                                .map(Number);
                              const newTime = new Date();
                              newTime.setHours(hours + 1, minutes, 0, 0);
                              setPlayingUntil(
                                newTime.toTimeString().slice(0, 5)
                              );
                            }
                          }}
                          className="text-gray-400 hover:text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
                          disabled={!playingUntil}
                        >
                          +1h
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Filters Section */}
                <div className="border-t border-[#d4ff33]/20 pt-6">
                  <div
                    className="cursor-pointer transition-all duration-200 hover:bg-black/40 rounded-lg p-3 -m-3"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#d4ff33] via-[#b8e62e] to-[#9fd124] rounded-lg flex items-center justify-center">
                          <Filter className="w-4 h-4 text-black" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-[#d4ff33] tracking-wide uppercase">
                            Advanced Filters
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            {hasActiveFilters
                              ? `${
                                  [
                                    ageFilter !== "all",
                                    professionFilter !== "all",
                                    locationFilter !== "all",
                                    rankFilter !== "all",
                                  ].filter(Boolean).length
                                } filters active`
                              : "Filter by age, profession, location, and rank"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {hasActiveFilters && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearFilters();
                            }}
                            className="text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors duration-200 px-2 py-1 h-auto text-xs"
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Clear
                          </Button>
                        )}
                        <div
                          className={`transition-transform duration-200 ${
                            showFilters ? "rotate-180" : ""
                          }`}
                        >
                          <ChevronDown className="w-4 h-4 text-[#d4ff33]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {showFilters && (
                    <div className="mt-6 pt-4 border-t border-[#d4ff33]/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 animate-slideUp">
                        {/* Age Filter */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3 text-[#d4ff33]" />
                            <label className="text-xs font-medium text-white uppercase tracking-wide">
                              Age Range
                            </label>
                          </div>
                          <Select
                            value={ageFilter}
                            onValueChange={setAgeFilter}
                          >
                            <SelectTrigger className="bg-black/60 border-[#d4ff33]/30 text-white hover:border-[#d4ff33]/60 focus:border-[#d4ff33] transition-colors duration-200 h-10 text-sm">
                              <SelectValue placeholder="Any age" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-[#d4ff33]/50 backdrop-blur-sm">
                              <SelectItem
                                value="all"
                                className="text-white hover:bg-[#d4ff33]/10"
                              >
                                Any age
                              </SelectItem>
                              <SelectItem
                                value="16-20"
                                className="text-white hover:bg-[#d4ff33]/10"
                              >
                                16-20 years
                              </SelectItem>
                              <SelectItem
                                value="21-25"
                                className="text-white hover:bg-[#d4ff33]/10"
                              >
                                21-25 years
                              </SelectItem>
                              <SelectItem
                                value="26-30"
                                className="text-white hover:bg-[#d4ff33]/10"
                              >
                                26-30 years
                              </SelectItem>
                              <SelectItem
                                value="31-35"
                                className="text-white hover:bg-[#d4ff33]/10"
                              >
                                31-35 years
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Profession Filter */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Briefcase className="w-3 h-3 text-[#d4ff33]" />
                            <label className="text-xs font-medium text-white uppercase tracking-wide">
                              Profession
                            </label>
                          </div>
                          <Select
                            value={professionFilter}
                            onValueChange={setProfessionFilter}
                          >
                            <SelectTrigger className="bg-black/60 border-[#d4ff33]/30 text-white hover:border-[#d4ff33]/60 focus:border-[#d4ff33] transition-colors duration-200 h-10 text-sm">
                              <SelectValue placeholder="Any profession" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-[#d4ff33]/50 backdrop-blur-sm max-h-60">
                              <SelectItem
                                value="all"
                                className="text-white hover:bg-[#d4ff33]/10"
                              >
                                Any profession
                              </SelectItem>
                              {getUniqueProfessions().map((profession) => (
                                <SelectItem
                                  key={profession}
                                  value={profession}
                                  className="text-white hover:bg-[#d4ff33]/10"
                                >
                                  {profession}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Location Filter */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-3 h-3 text-[#d4ff33]" />
                            <label className="text-xs font-medium text-white uppercase tracking-wide">
                              Location
                            </label>
                          </div>
                          <Select
                            value={locationFilter}
                            onValueChange={setLocationFilter}
                          >
                            <SelectTrigger className="bg-black/60 border-[#d4ff33]/30 text-white hover:border-[#d4ff33]/60 focus:border-[#d4ff33] transition-colors duration-200 h-10 text-sm">
                              <SelectValue placeholder="Any location" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-[#d4ff33]/50 backdrop-blur-sm max-h-60">
                              <SelectItem
                                value="all"
                                className="text-white hover:bg-[#d4ff33]/10"
                              >
                                Any location
                              </SelectItem>
                              {getUniqueLocations().map((location) => (
                                <SelectItem
                                  key={location}
                                  value={location}
                                  className="text-white hover:bg-[#d4ff33]/10"
                                >
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Rank Filter */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Star className="w-3 h-3 text-[#d4ff33]" />
                            <label className="text-xs font-medium text-white uppercase tracking-wide">
                              Rank
                            </label>
                          </div>
                          <Select
                            value={rankFilter}
                            onValueChange={setRankFilter}
                          >
                            <SelectTrigger className="bg-black/60 border-[#d4ff33]/30 text-white hover:border-[#d4ff33]/60 focus:border-[#d4ff33] transition-colors duration-200 h-10 text-sm">
                              <SelectValue placeholder="Any rank" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-[#d4ff33]/50 backdrop-blur-sm max-h-60">
                              <SelectItem
                                value="all"
                                className="text-white hover:bg-[#d4ff33]/10"
                              >
                                Any rank
                              </SelectItem>
                              {getUniqueRanks().map((rank) => (
                                <SelectItem
                                  key={rank}
                                  value={rank}
                                  className="text-white hover:bg-[#d4ff33]/10"
                                >
                                  {rank}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <div
                  className="pt-4 animate-slideUp"
                  style={{ animationDelay: "1.2s" }}
                >
                  <Button
                    onClick={handleSearch}
                    disabled={!selectedGame || !playingUntil}
                    className="w-full h-16 bg-gradient-to-r from-[#d4ff33] via-[#b8e62e] to-[#d4ff33] hover:from-[#b8e62e] hover:via-[#d4ff33] hover:to-[#b8e62e] text-black font-semibold text-lg tracking-wide transition-all duration-300 rounded-lg disabled:opacity-50 hover:scale-105"
                    size="lg"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    <span className="flex items-center justify-center gap-3">
                      Find Gaming Squad
                      {hasActiveFilters && (
                        <span className="px-2 py-1 bg-black/30 rounded text-xs">
                          With Filters
                        </span>
                      )}
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
