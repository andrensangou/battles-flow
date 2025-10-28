import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Calendar, Users } from "lucide-react";
import { Battle } from "@/data/battles";

interface SearchResultsProps {
  filteredBattles: Battle[];
  totalBattles: number;
  searchTerm?: string;
}

export function SearchResults({ filteredBattles, totalBattles, searchTerm }: SearchResultsProps) {
  const averageImpact = filteredBattles.length > 0 
    ? (filteredBattles.reduce((sum, battle) => sum + battle.impact, 0) / filteredBattles.length).toFixed(1)
    : "0";

  const decadeDistribution = filteredBattles.reduce((acc, battle) => {
    const decade = Math.floor(battle.year / 10) * 10;
    acc[decade] = (acc[decade] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const mostActiveDécade = Object.entries(decadeDistribution).reduce((prev, current) => 
    prev[1] > current[1] ? prev : current, ["0", 0]
  );

  if (filteredBattles.length === 0 && searchTerm) {
    return (
      <Card className="hip-hop-card mb-6">
        <CardContent className="p-6 text-center">
          <Search className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-yellow-400 street-title mb-2">
            AUCUN RÉSULTAT TROUVÉ
          </h3>
          <p className="text-gray-300 urban-subtitle">
            Aucune battle ne correspond à votre recherche "{searchTerm}".
            <br />
            Essayez avec d'autres termes ou supprimez les filtres.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hip-hop-card mb-6">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-yellow-400 street-title">
              RÉSULTATS DE LA RECHERCHE
            </h3>
            <p className="text-gray-300 text-sm sm:text-base urban-subtitle">
              {filteredBattles.length} battle{filteredBattles.length > 1 ? 's' : ''} trouvée{filteredBattles.length > 1 ? 's' : ''} 
              {totalBattles !== filteredBattles.length && ` sur ${totalBattles} au total`}
            </p>
          </div>
          
          {filteredBattles.length > 0 && (
            <Badge className="bg-yellow-500 text-black font-bold text-sm mt-2 sm:mt-0">
              {((filteredBattles.length / totalBattles) * 100).toFixed(0)}% des battles
            </Badge>
          )}
        </div>

        {filteredBattles.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Nombre de résultats */}
            <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm text-yellow-400 font-medium street-title">BATTLES</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white street-title">
                {filteredBattles.length}
              </div>
            </div>

            {/* Impact moyen */}
            <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm text-yellow-400 font-medium street-title">IMPACT</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white street-title">
                {averageImpact}/10
              </div>
            </div>

            {/* Décennie la plus représentée */}
            <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm text-yellow-400 font-medium street-title">PÉRIODE</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white street-title">
                {mostActiveDécade[0]}s
              </div>
            </div>

            {/* Artistes uniques */}
            <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm text-yellow-400 font-medium street-title">RAPPEURS</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white street-title">
                {[...new Set(filteredBattles.flatMap(b => b.participants))].length}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}