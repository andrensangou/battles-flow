import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X, Calendar, TrendingUp, MapPin } from "lucide-react";
import { Battle } from "@/data/battles";

interface SearchFiltersProps {
  battles: Battle[];
  onFilteredResults: (filteredBattles: Battle[]) => void;
}

export function SearchFilters({ battles, onFilteredResults }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDecade, setSelectedDecade] = useState<string>("all");
  const [selectedImpact, setSelectedImpact] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Extraire les décennies uniques
  const decades = [...new Set(battles.map(battle => Math.floor(battle.year / 10) * 10))].sort();
  
  // Définir les régions basées sur les artistes
  const getRegion = (participants: string[]) => {
    const eastCoast = ["Nas", "Jay-Z", "The Notorious B.I.G.", "LL Cool J", "Canibus"];
    const westCoast = ["Ice Cube", "N.W.A", "Dr. Dre", "Eazy-E", "2Pac"];
    const south = ["Drake", "Pusha T"];
    const midwest = ["Eminem", "Machine Gun Kelly", "Common"];
    
    for (const participant of participants) {
      if (eastCoast.some(artist => participant.includes(artist))) return "East Coast";
      if (westCoast.some(artist => participant.includes(artist))) return "West Coast";
      if (south.some(artist => participant.includes(artist))) return "South";
      if (midwest.some(artist => participant.includes(artist))) return "Midwest";
    }
    return "Autre";
  };

  const filterBattles = () => {
    let filtered = battles;

    // Recherche textuelle
    if (searchTerm) {
      filtered = filtered.filter(battle =>
        battle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        battle.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
        battle.keyTracks.some(track => 
          track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        battle.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        battle.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par décennie
    if (selectedDecade !== "all") {
      const decade = parseInt(selectedDecade);
      filtered = filtered.filter(battle => 
        Math.floor(battle.year / 10) * 10 === decade
      );
    }

    // Filtre par impact
    if (selectedImpact !== "all") {
      const impactRange = selectedImpact.split("-");
      const minImpact = parseInt(impactRange[0]);
      const maxImpact = parseInt(impactRange[1]);
      filtered = filtered.filter(battle => 
        battle.impact >= minImpact && battle.impact <= maxImpact
      );
    }

    // Filtre par région
    if (selectedRegion !== "all") {
      filtered = filtered.filter(battle => 
        getRegion(battle.participants) === selectedRegion
      );
    }

    onFilteredResults(filtered);
    updateActiveFilters();
  };

  const updateActiveFilters = () => {
    const filters: string[] = [];
    if (searchTerm) filters.push(`Recherche: "${searchTerm}"`);
    if (selectedDecade !== "all") filters.push(`Années ${selectedDecade}s`);
    if (selectedImpact !== "all") filters.push(`Impact ${selectedImpact}/10`);
    if (selectedRegion !== "all") filters.push(selectedRegion);
    setActiveFilters(filters);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedDecade("all");
    setSelectedImpact("all");
    setSelectedRegion("all");
    setActiveFilters([]);
    onFilteredResults(battles);
  };

  const removeFilter = (filterToRemove: string) => {
    if (filterToRemove.startsWith("Recherche:")) {
      setSearchTerm("");
    } else if (filterToRemove.includes("Années")) {
      setSelectedDecade("all");
    } else if (filterToRemove.includes("Impact")) {
      setSelectedImpact("all");
    } else {
      setSelectedRegion("all");
    }
    setTimeout(filterBattles, 0);
  };

  return (
    <Card className="hip-hop-card mb-6">
      <CardContent className="p-4 sm:p-6">
        {/* Barre de recherche */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-4 h-4" />
            <Input
              placeholder="Rechercher par artiste, battle, morceau ou tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-500"
            />
          </div>
          <Button 
            onClick={filterBattles}
            className="neon-button w-full sm:w-auto"
          >
            <Filter className="w-4 h-4 mr-2" />
            FILTRER
          </Button>
        </div>

        {/* Tags populaires */}
        <div className="mb-4">
          <label className="text-sm font-medium text-yellow-400 mb-2 block">Tags populaires :</label>
          <div className="flex flex-wrap gap-2">
            {["Légende", "Brutal", "Technique", "Personnel", "East Coast", "West Coast", "Moderne"].map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20 cursor-pointer transition-colors"
                onClick={() => {
                  setSearchTerm(tag);
                  setTimeout(filterBattles, 0);
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filtres avancés */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {/* Filtre par décennie */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-yellow-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Décennie
            </label>
            <Select value={selectedDecade} onValueChange={setSelectedDecade}>
              <SelectTrigger className="bg-black/50 border-yellow-500/30 text-white">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent className="bg-black border-yellow-500/30">
                <SelectItem value="all" className="text-white">Toutes les décennies</SelectItem>
                {decades.map(decade => (
                  <SelectItem key={decade} value={decade.toString()} className="text-white">
                    Années {decade}s
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtre par impact */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-yellow-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Impact
            </label>
            <Select value={selectedImpact} onValueChange={setSelectedImpact}>
              <SelectTrigger className="bg-black/50 border-yellow-500/30 text-white">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent className="bg-black border-yellow-500/30">
                <SelectItem value="all" className="text-white">Tous les niveaux</SelectItem>
                <SelectItem value="9-10" className="text-white">Légendaire (9-10)</SelectItem>
                <SelectItem value="7-8" className="text-white">Majeur (7-8)</SelectItem>
                <SelectItem value="5-6" className="text-white">Notable (5-6)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtre par région */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-yellow-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Région
            </label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-black/50 border-yellow-500/30 text-white">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent className="bg-black border-yellow-500/30">
                <SelectItem value="all" className="text-white">Toutes les régions</SelectItem>
                <SelectItem value="East Coast" className="text-white">East Coast</SelectItem>
                <SelectItem value="West Coast" className="text-white">West Coast</SelectItem>
                <SelectItem value="South" className="text-white">South</SelectItem>
                <SelectItem value="Midwest" className="text-white">Midwest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtres actifs */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-yellow-400 font-medium">Filtres actifs:</span>
            {activeFilters.map((filter, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40 cursor-pointer hover:bg-yellow-500/30"
                onClick={() => removeFilter(filter)}
              >
                {filter}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
            >
              Tout effacer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}