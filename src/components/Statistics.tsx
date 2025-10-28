import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Trophy, Calendar, TrendingUp } from "lucide-react";
import { battles } from "@/data/battles";

export function Statistics() {
  const totalBattles = battles.length;
  const averageImpact = (battles.reduce((sum, battle) => sum + battle.impact, 0) / totalBattles).toFixed(1);
  const mostImpactfulBattle = battles.reduce((prev, current) => 
    prev.impact > current.impact ? prev : current
  );
  const decadeStats = battles.reduce((acc, battle) => {
    const decade = Math.floor(battle.year / 10) * 10;
    acc[decade] = (acc[decade] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const mostActiveDécade = Object.entries(decadeStats).reduce((prev, current) => 
    prev[1] > current[1] ? prev : current
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4">
      <Card className="hip-hop-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-yellow-400 street-title">TOTAL</CardTitle>
          <Music className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-xl sm:text-3xl font-bold text-white street-title">{totalBattles}</div>
          <p className="text-xs text-gray-400 urban-subtitle">
            Battles documentées
          </p>
        </CardContent>
      </Card>

      <Card className="hip-hop-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-yellow-400 street-title">IMPACT</CardTitle>
          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-xl sm:text-3xl font-bold text-white street-title">{averageImpact}/10</div>
          <p className="text-xs text-gray-400 urban-subtitle">
            Score moyen
          </p>
        </CardContent>
      </Card>

      <Card className="hip-hop-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-yellow-400 street-title">TOP BATTLE</CardTitle>
          <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-sm sm:text-lg font-bold text-white street-title leading-tight">{mostImpactfulBattle.title}</div>
          <Badge variant="secondary" className="mt-1 bg-yellow-500 text-black font-bold text-xs">
            {mostImpactfulBattle.impact}/10
          </Badge>
        </CardContent>
      </Card>

      <Card className="hip-hop-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-yellow-400 street-title">DÉCENNIE</CardTitle>
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-xl sm:text-3xl font-bold text-white street-title">{mostActiveDécade[0]}s</div>
          <p className="text-xs text-gray-400 urban-subtitle">
            {mostActiveDécade[1]} battles
          </p>
        </CardContent>
      </Card>
    </div>
  );
}