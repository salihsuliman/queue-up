"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { games, getPlayersForGame, type Player } from "@/lib/games";
import {
  ArrowLeft,
  Clock,
  Star,
  Users,
  Gamepad2,
  User,
  Send,
  Check,
  X,
  MessageCircle,
  RefreshCcw,
  MapPin,
  Calendar,
  Briefcase,
  Filter,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get("game");
  const playingUntil = searchParams.get("until");

  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [professionFilter, setProfessionFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [rankFilter, setRankFilter] = useState<string>("all");

  const game = games.find((g) => g.id === gameId);

  useEffect(() => {
    // Get players for the selected game using seed data
    if (gameId) {
      const gamePlayers = getPlayersForGame(gameId);
      setAllPlayers(gamePlayers);
      setFilteredPlayers(gamePlayers);
      setIsLoading(false);

      // Load filters from URL parameters
      const age = searchParams.get("age") || "all";
      const profession = searchParams.get("profession") || "all";
      const location = searchParams.get("location") || "all";
      const rank = searchParams.get("rank") || "all";

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
    }
  }, [gameId, searchParams]);

  // Apply filters whenever filter states change
  useEffect(() => {
    let filtered = [...allPlayers];

    // Age filter
    if (ageFilter !== "all") {
      const [minAge, maxAge] = ageFilter.split("-").map(Number);
      filtered = filtered.filter(
        (player) => player.age >= minAge && player.age <= maxAge
      );
    }

    // Profession filter
    if (professionFilter !== "all") {
      filtered = filtered.filter(
        (player) => player.profession === professionFilter
      );
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter(
        (player) => player.location === locationFilter
      );
    }

    // Rank filter
    if (rankFilter !== "all") {
      filtered = filtered.filter((player) => player.rank === rankFilter);
    }

    setFilteredPlayers(filtered);
  }, [allPlayers, ageFilter, professionFilter, locationFilter, rankFilter]);

  // Get unique values for filter options
  const getUniqueProfessions = () => {
    return [...new Set(allPlayers.map((player) => player.profession))].sort();
  };

  const getUniqueLocations = () => {
    return [...new Set(allPlayers.map((player) => player.location))].sort();
  };

  const getUniqueRanks = () => {
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

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case "Beginner":
        return "text-green-400";
      case "Intermediate":
        return "text-yellow-400";
      case "Advanced":
        return "text-[#d4ff33]";
      case "Pro":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getSkillStars = (skill: string) => {
    switch (skill) {
      case "Beginner":
        return 1;
      case "Intermediate":
        return 2;
      case "Advanced":
        return 3;
      case "Pro":
        return 4;
      default:
        return 1;
    }
  };

  // Function to determine rank tier for visual representation
  const getRankTier = (rank: string, gameId: string) => {
    const rankTiers: { [key: string]: { [rank: string]: number } } = {
      valorant: {
        Iron: 1,
        Bronze: 2,
        Silver: 3,
        Gold: 4,
        Platinum: 5,
        Diamond: 6,
        Ascendant: 7,
        Immortal: 8,
        Radiant: 9,
      },
      "league-of-legends": {
        Iron: 1,
        Bronze: 2,
        Silver: 3,
        Gold: 4,
        Platinum: 5,
        Diamond: 6,
        Master: 7,
        Grandmaster: 8,
        Challenger: 9,
      },
      "apex-legends": {
        Bronze: 1,
        Silver: 2,
        Gold: 3,
        Platinum: 4,
        Diamond: 5,
        Master: 6,
        Predator: 7,
      },
      cs2: {
        Silver: 1,
        "Gold Nova": 2,
        MG: 3,
        DMG: 4,
        LEM: 5,
        SMFC: 6,
        "Global Elite": 7,
      },
      // Add other games as needed
    };

    const gameTiers = rankTiers[gameId];
    if (gameTiers && gameTiers[rank]) {
      return Math.min(Math.ceil(gameTiers[rank] / 2), 4); // Convert to 1-4 stars
    }

    // Fallback to skill-based stars
    return getSkillStars(rank);
  };

  const handlePlayerClick = (player: Player) => {
    if (!player.online || sentRequests.has(player.id)) return;
    setSelectedPlayer(player);
    setRequestMessage(
      `Hey ${player.username}! Want to team up for ${game?.name}? I'll be playing until ${playingUntil}.`
    );
    setIsPopupOpen(true);
  };

  const handleSendRequest = () => {
    if (selectedPlayer) {
      setSentRequests((prev) => new Set([...prev, selectedPlayer.id]));
      setIsPopupOpen(false);
      setSelectedPlayer(null);
      setRequestMessage("");
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPlayer(null);
    setRequestMessage("");
  };

  if (!game) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
        {/* Simplified Background */}
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

        <Card className="bg-black/60 border-2 border-[#d4ff33]/30 p-8 text-center max-w-md relative z-10 animate-fadeIn">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold mb-4 text-[#d4ff33]">
            Game not found
          </h2>
          <p className="text-gray-300 mb-6">
            The game you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="w-full bg-gradient-to-r from-[#d4ff33] via-[#b8e62e] to-[#d4ff33] hover:from-[#b8e62e] hover:via-[#d4ff33] hover:to-[#b8e62e] text-black font-semibold transition-all duration-200"
          >
            Back to Home
          </Button>
        </Card>
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

      {/* Request Popup Modal */}
      {isPopupOpen && selectedPlayer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <Card className="bg-black/90 border-2 border-[#d4ff33]/50 max-w-md w-full animate-slideUp">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 border-2 border-[#d4ff33]/50">
                    <AvatarFallback className="bg-gradient-to-br from-[#d4ff33]/20 to-[#b8e62e]/10 text-white">
                      {selectedPlayer.avatar ||
                        selectedPlayer.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-[#d4ff33]">
                      Send Game Request
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Request to play with {selectedPlayer.username}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClosePopup}
                  className="text-gray-400 hover:text-white hover:bg-red-500/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#d4ff33] block mb-2">
                  Message
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  className="w-full h-24 p-3 bg-black/50 border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] focus:border-[#d4ff33] rounded-lg text-white placeholder-gray-400 transition-colors duration-200 resize-none"
                  placeholder="Write a message to invite them to play..."
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleClosePopup}
                  variant="outline"
                  className="flex-1 border-[#d4ff33]/50 text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendRequest}
                  disabled={!requestMessage.trim()}
                  className="flex-1 bg-gradient-to-r from-[#d4ff33] via-[#b8e62e] to-[#d4ff33] hover:from-[#b8e62e] hover:via-[#d4ff33] hover:to-[#b8e62e] text-black font-semibold transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
      <main className="relative z-10 pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Search Info */}
          <div
            className={`mb-8 transition-all duration-300 ${
              isLoading
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            <Card className="bg-black/60 border-2 border-[#d4ff33]/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-black/50 border border-[#d4ff33]/50 flex items-center justify-center overflow-hidden">
                    <Image
                      src={game.logo}
                      alt={`${game.name} logo`}
                      width={64}
                      height={64}
                      className="w-12 h-12 object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#d4ff33]">
                      {game.name}
                    </h2>
                    <p className="text-gray-300">
                      Playing until {playingUntil} • {allPlayers.length} total
                      player
                      {allPlayers.length !== 1 ? "s" : ""} •{" "}
                      {filteredPlayers.length} matching filters
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <span>{game.category}</span>
                      <span>•</span>
                      <span>{game.playerCount}</span>
                      <span>•</span>
                      <span>{game.developer}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <Card className="bg-black/70 border-2 border-[#d4ff33]/40 overflow-hidden">
              <div
                className="cursor-pointer transition-all duration-200 hover:bg-black/80"
                onClick={() => setShowFilters(!showFilters)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#d4ff33] via-[#b8e62e] to-[#9fd124] rounded-lg flex items-center justify-center">
                        <Filter className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#d4ff33] mb-1">
                          Player Filters
                        </h3>
                        <p className="text-sm text-gray-400">
                          {hasActiveFilters
                            ? `${filteredPlayers.length} of ${allPlayers.length} players shown`
                            : "Click to filter by age, profession, location, or rank"}
                        </p>
                      </div>
                      {hasActiveFilters && (
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 text-xs bg-[#d4ff33]/20 text-[#d4ff33] rounded-full border border-[#d4ff33]/30 font-medium">
                            {
                              [
                                ageFilter !== "all",
                                professionFilter !== "all",
                                locationFilter !== "all",
                                rankFilter !== "all",
                              ].filter(Boolean).length
                            }{" "}
                            Active
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearFilters();
                            }}
                            className="text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors duration-200 px-3 py-1 h-auto"
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Clear
                          </Button>
                        </div>
                      )}
                    </div>
                    <div
                      className={`ml-4 transition-transform duration-200 ${
                        showFilters ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="w-5 h-5 text-[#d4ff33]" />
                    </div>
                  </div>
                </CardContent>
              </div>

              {showFilters && (
                <div className="border-t border-[#d4ff33]/20 bg-black/50">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-slideUp">
                      {/* Age Filter */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-[#d4ff33]" />
                          <label className="text-sm font-medium text-white">
                            Age Range
                          </label>
                        </div>
                        <Select value={ageFilter} onValueChange={setAgeFilter}>
                          <SelectTrigger className="bg-black/60 border-[#d4ff33]/30 text-white hover:border-[#d4ff33]/60 focus:border-[#d4ff33] transition-colors duration-200 h-11">
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
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-[#d4ff33]" />
                          <label className="text-sm font-medium text-white">
                            Profession
                          </label>
                        </div>
                        <Select
                          value={professionFilter}
                          onValueChange={setProfessionFilter}
                        >
                          <SelectTrigger className="bg-black/60 border-[#d4ff33]/30 text-white hover:border-[#d4ff33]/60 focus:border-[#d4ff33] transition-colors duration-200 h-11">
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
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-[#d4ff33]" />
                          <label className="text-sm font-medium text-white">
                            Location
                          </label>
                        </div>
                        <Select
                          value={locationFilter}
                          onValueChange={setLocationFilter}
                        >
                          <SelectTrigger className="bg-black/60 border-[#d4ff33]/30 text-white hover:border-[#d4ff33]/60 focus:border-[#d4ff33] transition-colors duration-200 h-11">
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
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-[#d4ff33]" />
                          <label className="text-sm font-medium text-white">
                            Game Rank
                          </label>
                        </div>
                        <Select
                          value={rankFilter}
                          onValueChange={setRankFilter}
                        >
                          <SelectTrigger className="bg-black/60 border-[#d4ff33]/30 text-white hover:border-[#d4ff33]/60 focus:border-[#d4ff33] transition-colors duration-200 h-11">
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

                    {/* Filter Actions */}
                    {hasActiveFilters && (
                      <div className="mt-6 pt-4 border-t border-[#d4ff33]/20">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400">
                            Showing{" "}
                            <span className="text-[#d4ff33] font-medium">
                              {filteredPlayers.length}
                            </span>{" "}
                            of{" "}
                            <span className="text-white font-medium">
                              {allPlayers.length}
                            </span>{" "}
                            players
                          </p>
                          <Button
                            onClick={clearFilters}
                            variant="outline"
                            size="sm"
                            className="border-[#d4ff33]/50 text-[#d4ff33] hover:bg-[#d4ff33]/10 hover:border-[#d4ff33] transition-all duration-200"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Clear All Filters
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>
              )}
            </Card>
          </div>

          {/* Players Grid */}
          <div className="space-y-6">
            {filteredPlayers.length === 0 ? (
              <div
                className={`transition-all duration-300 ${
                  isLoading
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                <Card className="bg-black/60 border-2 border-[#d4ff33]/30 p-8 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2 text-[#d4ff33]">
                    {allPlayers.length === 0
                      ? "No players found"
                      : "No players match your filters"}
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-md mx-auto">
                    {allPlayers.length === 0
                      ? `No one is currently looking for ${game.name} players. Try a different game or check back later!`
                      : "Try adjusting your filters or clear them to see more players."}
                  </p>
                  <div className="flex gap-3 justify-center">
                    {hasActiveFilters && (
                      <Button
                        onClick={clearFilters}
                        variant="outline"
                        className="border-[#d4ff33]/50 text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Clear Filters
                      </Button>
                    )}
                    <Button
                      onClick={() => router.push("/")}
                      variant="outline"
                      className="border-[#d4ff33]/50 text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
                    >
                      Search Different Game
                    </Button>
                    <Button
                      onClick={() => window.location.reload()}
                      className="bg-gradient-to-r from-[#d4ff33] via-[#b8e62e] to-[#d4ff33] hover:from-[#b8e62e] hover:via-[#d4ff33] hover:to-[#b8e62e] text-black font-semibold transition-all duration-200"
                    >
                      Refresh Results
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <>
                <div
                  className={`flex items-center justify-between mb-6 transition-all duration-300 ${
                    isLoading
                      ? "opacity-0 translate-y-4"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <h3 className="text-lg font-semibold text-[#d4ff33]">
                    Available Players ({filteredPlayers.length})
                    {hasActiveFilters && (
                      <span className="text-gray-400 font-normal text-sm ml-2">
                        • Filtered from {allPlayers.length} total
                      </span>
                    )}
                  </h3>
                  <Button
                    variant="ghost"
                    className="w-14 h-14 p-4 mr-4 hover:bg-[#d4ff33]/10 transition-colors duration-200"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCcw className="w-10! h-10!" color="#d4ff33" />
                  </Button>
                </div>

                {/* Players Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlayers.map((player, index) => {
                    const hasRequestSent = sentRequests.has(player.id);
                    const isClickable = player.online && !hasRequestSent;

                    return (
                      <div
                        key={player.id}
                        className={`transition-all duration-300 animate-slideUp ${
                          isClickable ? "cursor-pointer" : "cursor-default"
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => isClickable && handlePlayerClick(player)}
                      >
                        <Card
                          className={`bg-black/60 border-2 border-[#d4ff33]/30 transition-all duration-200 group relative ${
                            isClickable
                              ? "hover:bg-black/70 hover:border-[#d4ff33]/50 hover:scale-105 hover:shadow-lg hover:shadow-[#d4ff33]/20"
                              : ""
                          } ${!player.online ? "opacity-60" : ""}`}
                        >
                          {/* Request Status Indicator */}
                          {hasRequestSent && (
                            <div className="absolute -top-2 -right-2 z-10">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-scale-in border-2 border-black">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}

                          <CardContent className="p-6">
                            <div className="space-y-4">
                              {/* Avatar & Online Status */}
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <Avatar className="w-16 h-16 border-2 border-[#d4ff33]/50 transition-all duration-200 group-hover:border-[#d4ff33]/70">
                                    <AvatarFallback className="text-xl bg-gradient-to-br from-[#d4ff33]/20 to-[#b8e62e]/10 text-white">
                                      {player.avatar ||
                                        player.username.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {player.online && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-lg text-white truncate">
                                    {player.username}
                                  </h3>
                                  <div className="flex items-center space-x-1 mt-1">
                                    <span className="text-sm font-medium text-gray-300">
                                      {player.rank || player.skill}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Player Demographics */}
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-sm text-gray-300">
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {player.age} years old
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-300">
                                  <MapPin className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {player.location}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-300">
                                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {player.profession}
                                  </span>
                                </div>
                              </div>

                              {/* Available Until */}
                              <div className="flex items-center space-x-2 text-sm text-gray-300">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">
                                  Until {player.availableUntil}
                                </span>
                              </div>

                              {/* Playstyle Tags */}
                              <div className="flex flex-wrap gap-2">
                                {player.playstyle.slice(0, 2).map((style) => (
                                  <span
                                    key={style}
                                    className="px-2 py-1 text-xs bg-black/60 text-[#d4ff33] rounded-full border border-[#d4ff33]/30 transition-colors duration-200"
                                  >
                                    {style}
                                  </span>
                                ))}
                                {player.playstyle.length > 2 && (
                                  <span className="px-2 py-1 text-xs bg-black/60 text-gray-400 rounded-full border border-gray-500/30">
                                    +{player.playstyle.length - 2}
                                  </span>
                                )}
                              </div>

                              {/* Action Button */}
                              <div className="pt-2">
                                {hasRequestSent ? (
                                  <Button
                                    disabled
                                    className="w-full bg-green-600/20 text-green-400 border border-green-500/30 cursor-default"
                                  >
                                    <Check className="w-4 h-4 mr-2" />
                                    Request Sent
                                  </Button>
                                ) : !player.online ? (
                                  <Button
                                    disabled
                                    className="w-full bg-gray-600/20 text-gray-400 border border-gray-500/30 cursor-default"
                                  >
                                    <User className="w-4 h-4 mr-2" />
                                    Offline
                                  </Button>
                                ) : (
                                  <Button className="w-full bg-gradient-to-r from-[#d4ff33] via-[#b8e62e] to-[#d4ff33] hover:from-[#b8e62e] hover:via-[#d4ff33] hover:to-[#b8e62e] text-black font-semibold transition-all duration-200">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Request Game
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Quick Actions */}
          {filteredPlayers.length > 0 && (
            <div
              className="mt-8 flex justify-center space-x-4 animate-fadeIn"
              style={{ animationDelay: "300ms" }}
            >
              {hasActiveFilters && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-[#d4ff33]/50 text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="border-[#d4ff33]/50 text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
              >
                Search Different Game
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-[#d4ff33]/50 text-[#d4ff33] hover:bg-[#d4ff33]/10 transition-colors duration-200"
              >
                Refresh Results
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
          {/* Simplified Loading Background */}
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

          <div className="text-center relative z-10 animate-fadeIn">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#d4ff33] via-[#b8e62e] to-[#9fd124] rounded-lg flex items-center justify-center animate-pulse">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <p className="text-gray-300">Loading players...</p>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
