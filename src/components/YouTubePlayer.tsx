import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  Pause, 
  Search, 
  Eye, 
  ThumbsUp, 
  MessageCircle, 
  Clock, 
  ExternalLink,
  Loader2,
  Youtube
} from "lucide-react";
import { YouTubeVideo, youtubeService } from "@/services/youtube";

interface YouTubePlayerProps {
  initialQuery?: string;
  autoSearch?: boolean;
  showSearch?: boolean;
  className?: string;
}

export function YouTubePlayer({ 
  initialQuery = "", 
  autoSearch = false, 
  showSearch = true,
  className = "" 
}: YouTubePlayerProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recherche automatique au chargement
  useEffect(() => {
    if (autoSearch && initialQuery) {
      handleSearch(initialQuery);
    }
  }, [autoSearch, initialQuery]);

  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Recherche YouTube:', query);
      const result = await youtubeService.searchVideos(query + " hip hop diss track", 6);
      console.log('Résultats YouTube:', result);
      
      setVideos(result.videos);
      if (result.videos.length > 0 && !selectedVideo) {
        setSelectedVideo(result.videos[0]);
      }
    } catch (error) {
      console.error('Erreur de recherche YouTube:', error);
      setError(`Erreur de recherche: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoSelect = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Barre de recherche */}
      {showSearch && (
        <Card className="hip-hop-card">
          <CardHeader className="p-4">
            <CardTitle className="flex items-center gap-2 text-lg text-yellow-400">
              <Youtube className="w-5 h-5" />
              RECHERCHE YOUTUBE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex gap-2">
              <Input
                placeholder="Rechercher des diss tracks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSearch()}
                disabled={isLoading}
                className="neon-button"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Affichage des erreurs */}
      {error && (
        <Card className="hip-hop-card border-red-500/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-400">
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* État de chargement */}
      {isLoading && (
        <Card className="hip-hop-card">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-yellow-400" />
            <p className="text-gray-300">Recherche en cours...</p>
          </CardContent>
        </Card>
      )}
      {selectedVideo && selectedVideo.id && (
        <Card className="hip-hop-card">
          <CardHeader className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg text-yellow-400 street-title break-words">
                  {selectedVideo.title}
                </CardTitle>
                <p className="text-gray-400 text-sm mt-1">
                  {selectedVideo.channelTitle}
                </p>
              </div>
              <Button
                onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.id}`, '_blank')}
                variant="outline"
                size="sm"
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 flex-shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 pt-0">
            {/* Lecteur YouTube intégré */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}${isPlaying ? '?autoplay=1' : ''}`}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Statistiques de la vidéo */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {selectedVideo.viewCount && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {youtubeService.formatViewCount(selectedVideo.viewCount || '0')}
                  </span>
                </div>
              )}
              
              {selectedVideo.likeCount && (
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {youtubeService.formatViewCount(selectedVideo.likeCount || '0')}
                  </span>
                </div>
              )}
              
              {selectedVideo.commentCount && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {youtubeService.formatViewCount(selectedVideo.commentCount || '0')}
                  </span>
                </div>
              )}
              
              {selectedVideo.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {youtubeService.formatDuration(selectedVideo.duration)}
                  </span>
                </div>
              )}
            </div>

            {/* Description courte */}
            {selectedVideo.description && (
              <p className="text-xs text-gray-400 line-clamp-2">
                {selectedVideo.description.substring(0, 150)}...
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Liste des vidéos */}
      {videos.length > 0 && (
        <Card className="hip-hop-card">
          <CardHeader className="p-4">
            <CardTitle className="text-lg text-yellow-400 street-title">
              RÉSULTATS DE RECHERCHE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <Card 
                  key={video.id}
                  className={`cursor-pointer transition-all hover:border-yellow-500/50 ${
                    selectedVideo?.id === video.id ? 'border-yellow-500 bg-yellow-500/5' : 'border-border/50'
                  }`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative">
                    <img
                      src={video.thumbnails.medium.url}
                      alt={video.title}
                      className="w-full aspect-video object-cover rounded-t-lg"
                    />
                    {video.duration && (
                      <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs">
                        {youtubeService.formatDuration(video.duration)}
                      </Badge>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-t-lg">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm text-white line-clamp-2 mb-2">
                      {video.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-2">
                      {video.channelTitle}
                    </p>
                    
                    {video.viewCount && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {youtubeService.formatViewCount(video.viewCount || '0')}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* État de chargement */}
      {isLoading && (
        <Card className="hip-hop-card">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-yellow-400" />
            <p className="text-gray-400">Recherche en cours...</p>
          </CardContent>
        </Card>
      )}

      {/* Aucun résultat */}
      {!isLoading && videos.length === 0 && searchQuery && (
        <Card className="hip-hop-card">
          <CardContent className="p-8 text-center">
            <Youtube className="w-12 h-12 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400 mb-2">Aucune vidéo trouvée</p>
            <p className="text-sm text-gray-500">
              Essayez avec d'autres mots-clés
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}