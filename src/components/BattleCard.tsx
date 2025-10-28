import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Users, Trophy, Music2 } from "lucide-react";
import { Battle } from "@/data/battles";

interface BattleCardProps {
  battle: Battle;
  onViewDetails: (battle: Battle) => void;
}

export function BattleCard({ battle, onViewDetails }: BattleCardProps) {
  return (
    <Card className="hip-hop-card group cursor-pointer overflow-hidden" onClick={() => onViewDetails(battle)}>
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={battle.image} 
          alt={battle.title}
          className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2">
          <Badge variant="secondary" className="bg-yellow-500 text-black font-bold border-0 text-xs sm:text-sm">
            IMPACT: {battle.impact}/10
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>
      
      <CardHeader className="relative z-10 p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl font-bold street-title text-yellow-400 leading-tight">
            {battle.title.toUpperCase()}
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1 border-yellow-500/50 text-yellow-400 text-xs sm:text-sm w-fit">
            <Calendar className="w-3 h-3" />
            {battle.year}
          </Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm text-gray-300 urban-subtitle leading-relaxed">
          {battle.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 p-3 sm:p-6 pt-0">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="font-medium text-yellow-400">Participants:</span>
            </div>
            <span className="sm:ml-0 ml-5">{battle.participants.join(" vs ")}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-300 mb-4">
            <div className="flex items-center gap-2">
              <Music2 className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="font-medium text-yellow-400">Morceaux clés:</span>
            </div>
            <div className="sm:ml-0 ml-5 flex flex-wrap gap-1">
              {battle.keyTracks.slice(0, 2).map((track, index) => (
                <Badge key={index} variant="outline" className="border-yellow-500/30 text-yellow-300 text-xs">
                  {track.title}
                </Badge>
              ))}
              {battle.keyTracks.length > 2 && (
                <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 text-xs">
                  +{battle.keyTracks.length - 2}
                </Badge>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {battle.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-yellow-500/30 text-yellow-300 text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
            {battle.tags.length > 3 && (
              <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 text-xs px-2 py-1">
                +{battle.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Indicateur de vote utilisateur */}
          
          <Button
            className="w-full neon-button group-hover:shadow-lg transition-all text-xs sm:text-sm py-2 sm:py-3"
            variant="outline"
          >
            <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            VOIR LES DÉTAILS
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}