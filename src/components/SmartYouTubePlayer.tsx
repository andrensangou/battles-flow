import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  AlertTriangle,
  Music,
  Youtube,
  Loader2
} from "lucide-react";
import { YouTubeVerificationService, VideoStatus } from "@/services/youtubeVerification";

interface Track {
  title: string;
  artist: string;
  year: number;
  description: string;
  youtubeUrl: string;
}

interface SmartYouTubePlayerProps {
  track: Track;
  className?: string;
}

export function SmartYouTubePlayer({ track, className = "" }: SmartYouTubePlayerProps) {
  const [videoStatus, setVideoStatus] = useState<VideoStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  // Vérifier la disponibilité de la vidéo au chargement
  useEffect(() => {
    checkVideo();
  }, [track.youtubeUrl]);

  const checkVideo = async () => {
    setIsLoading(true);
    try {
      const status = await YouTubeVerificationService.checkVideoAvailability(track.youtubeUrl);
      setVideoStatus(status);
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      setVideoStatus({
        isAvailable: false,
        videoId: '',
        title: track.title,
        error: 'Erreur de vérification'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setShowPlayer(false);
    checkVideo();
  };

  const handleSearchAlternative = () => {
    const searchUrl = YouTubeVerificationService.generateSearchUrl(track.artist, track.title);
    window.open(searchUrl, '_blank');
  };

  const handleGoogleSearch = () => {
    const searchUrl = YouTubeVerificationService.generateGoogleSearchUrl(track.artist, track.title);
    window.open(searchUrl, '_blank');
  };

  const handlePlayVideo = () => {
    setShowPlayer(true);
  };

  // Interface de chargement
  if (isLoading) {
    return (
      <Card className={`border border-border/50 hip-hop-card ${className}`}>
        <CardContent className="p-4">
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-3 flex items-center justify-center relative">
            {/* Image de fond pour le chargement */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: 'url(./images/video_loading_hip_hop_20251029_105555.png)' }}
            />
            <div className="text-center text-gray-400 relative z-10">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-yellow-500" />
              <p className="text-sm">Vérification de la vidéo...</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-yellow-400 text-sm sm:text-base">{track.title}</h3>
            <p className="text-gray-300 text-xs sm:text-sm">{track.artist} • {track.year}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Interface de secours pour vidéo indisponible
  if (!videoStatus?.isAvailable) {
    return (
      <Card className={`border border-red-500/30 hip-hop-card ${className}`}>
        <CardContent className="p-4">
          {/* Zone de secours avec design hip-hop */}
          <div className="aspect-video bg-gradient-to-br from-red-900/20 to-black rounded-lg overflow-hidden mb-3 flex items-center justify-center border border-red-500/20 relative">
            {/* Image de fond pour vidéo indisponible */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: 'url(./images/video_unavailable_hip_hop_20251029_105536.png)' }}
            />
            <div className="text-center p-4 relative z-10">
              {/* Icône principale */}
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Music className="w-3 h-3 text-black" />
                </div>
              </div>
              
              {/* Message d'erreur stylé */}
              <div className="space-y-2">
                <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                  <Youtube className="w-3 h-3 mr-1" />
                  Vidéo indisponible
                </Badge>
                <p className="text-xs text-gray-400">
                  {videoStatus?.error || 'Cette vidéo a été supprimée ou rendue privée'}
                </p>
              </div>
            </div>
          </div>

          {/* Informations du morceau */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="font-bold text-yellow-400 text-sm sm:text-base flex items-center gap-2">
                <Music className="w-4 h-4" />
                {track.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                <span className="font-medium">{track.artist}</span> • {track.year}
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                {track.description}
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleSearchAlternative}
                size="sm"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0"
              >
                <Search className="w-3 h-3 mr-1" />
                <span className="text-xs">Chercher sur YouTube</span>
              </Button>
              
              <Button
                onClick={handleGoogleSearch}
                size="sm"
                variant="outline"
                className="flex-1 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                <span className="text-xs">Recherche Google</span>
              </Button>
            </div>

            <Button
              onClick={handleRetry}
              size="sm"
              variant="ghost"
              className="w-full text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              <span className="text-xs">Réessayer</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Interface normale pour vidéo disponible
  return (
    <Card className={`border border-green-500/30 hip-hop-card ${className}`}>
      <CardContent className="p-4">
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-3 relative">
          {showPlayer ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoStatus.videoId}?autoplay=1`}
              title={track.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div 
              className="w-full h-full bg-gradient-to-br from-green-900/20 to-black flex items-center justify-center cursor-pointer group border border-green-500/20"
              onClick={handlePlayVideo}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500/30 transition-colors border border-green-500/30">
                  <Play className="w-8 h-8 text-green-400 ml-1" />
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Youtube className="w-3 h-3 mr-1" />
                  Vidéo disponible
                </Badge>
                <p className="text-xs text-gray-400 mt-2">Cliquez pour lire</p>
              </div>
            </div>
          )}
        </div>

        {/* Informations du morceau */}
        <div className="space-y-2">
          <h3 className="font-bold text-yellow-400 text-sm sm:text-base flex items-center gap-2">
            <Music className="w-4 h-4" />
            {track.title}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm">
            <span className="font-medium">{track.artist}</span> • {track.year}
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            {track.description}
          </p>
          
          {!showPlayer && (
            <Button
              onClick={handlePlayVideo}
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700 text-white border-0 mt-3"
            >
              <Play className="w-3 h-3 mr-1" />
              <span className="text-xs">Lire la vidéo</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}