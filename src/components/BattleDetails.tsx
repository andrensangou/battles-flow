import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Users, Music, Target, Award, ArrowLeft, Play, Youtube } from "lucide-react";
import { Battle } from "@/data/battles";

interface BattleDetailsProps {
  battle: Battle;
  onBack: () => void;
}
export function BattleDetails({
  battle,
  onBack
}: BattleDetailsProps) {
  const [activeTab, setActiveTab] = useState<'tracks'>('tracks');

  // S'assurer que la page commence en haut quand on ouvre les détails
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [battle.id]);
  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 w-fit">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text">{battle.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Image principale */}
        <div className="lg:col-span-1">
          <Card className="hip-hop-card">
            <CardContent className="p-0">
              <img src={battle.image} alt={battle.title} className="w-full sm:h-64 lg:h-80 rounded-lg h-[320px] object-cover" />
            </CardContent>
          </Card>
        </div>

        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="hip-hop-card">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="tracking-tight text-xl sm:text-2xl font-semibold">Informations générales</CardTitle>
                <Badge className="bg-primary text-primary-foreground">
                  Impact: {battle.impact}/10
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-medium">Année:</span>
                  <span className="font-normal">{battle.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-medium">Participants:</span>
                  <span>{battle.participants.join(" vs ")}</span>
                </div>
              </div>
              <Separator />
              <p className="leading-relaxed text-[rgb(255,255,255)]">
                {battle.description}
              </p>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Morceaux clés avec liens YouTube */}
      <Card className="hip-hop-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl street-title text-yellow-400">
            <Music className="w-5 h-5 text-yellow-400" />
            MORCEAUX CLÉS
          </CardTitle>
          <p className="text-gray-300 text-sm sm:text-base urban-subtitle">
            Les diss tracks qui ont marqué cette battle - Cliquez pour écouter sur YouTube
          </p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {battle.keyTracks.map((track, index) => <Card key={index} className="border border-border/50 hip-hop-card">
                <CardHeader className="pb-3 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg text-yellow-400 street-title">{track.title}</CardTitle>
                    <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">{track.year}</Badge>
                  </div>
                  <p className="font-medium text-yellow-300 text-sm">
                    {track.artist}
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
                    {track.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </CardContent>
      </Card>
      
      {/* Morceaux YouTube intégrés */}
      <Card className="hip-hop-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl street-title text-yellow-400">
            <Youtube className="w-5 h-5 text-red-500" />
            MORCEAUX ORIGINAUX
          </CardTitle>
          <p className="text-gray-300 text-sm sm:text-base urban-subtitle mt-2">
            Écoutez les diss tracks directement intégrés depuis YouTube
          </p>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {battle.keyTracks.map((track, index) => (
              <Card key={index} className="border border-border/50 hip-hop-card">
                <CardContent className="p-4">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-3">
                    <iframe
                      src={`https://www.youtube.com/embed/${track.youtubeUrl.split('v=')[1]?.split('&')[0] || track.youtubeUrl.split('/').pop()}`}
                      title={track.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h4 className="font-bold text-yellow-400 text-sm mb-1">{track.title}</h4>
                  <p className="text-yellow-300 text-xs mb-2">{track.artist} • {track.year}</p>
                  <p className="text-gray-300 text-xs leading-relaxed">{track.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contexte de la battle */}
      <Card className="hip-hop-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl street-title text-yellow-400">
            <Target className="w-5 h-5 text-yellow-400" />
            CONTEXTE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {battle.context}
          </p>
        </CardContent>
      </Card>
      {/* Résultat et impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="hip-hop-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Résultat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-[rgb(255,255,255)]">
              {battle.outcome}
            </p>
          </CardContent>
        </Card>

        <Card className="hip-hop-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Impact culturel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-[rgb(255,255,255)]">
              {battle.culturalImpact}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};