import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Play, 
  Youtube,
  ExternalLink,
  Music,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { SmartYouTubeSearch } from "@/services/smartYouTubeSearch";

interface SimpleYouTubePlayerProps {
  className?: string;
}

export function SimpleYouTubePlayer({ className = "" }: SimpleYouTubePlayerProps) {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoStatus, setVideoStatus] = useState<{[key: string]: 'loading' | 'available' | 'unavailable'}>({});

  // Fonction pour vérifier la disponibilité d'une vidéo
  const checkVideoAvailability = async (videoId: string): Promise<boolean> => {
    try {
      // Utiliser l'API oEmbed de YouTube pour vérifier la disponibilité
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  // Vérifier la disponibilité des vidéos
  useEffect(() => {
    const checkVideos = async () => {
      if (videos.length > 0) {
        const statusUpdates: {[key: string]: 'loading' | 'available' | 'unavailable'} = {};
        
        for (const video of videos) {
          statusUpdates[video.id] = 'loading';
          setVideoStatus(prev => ({ ...prev, ...statusUpdates }));
          
          const isAvailable = await checkVideoAvailability(video.id);
          statusUpdates[video.id] = isAvailable ? 'available' : 'unavailable';
        }
        
        setVideoStatus(prev => ({ ...prev, ...statusUpdates }));
      }
    };
    
    checkVideos();
  }, [videos]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const result = SmartYouTubeSearch.searchTracks(query, 6);
      setVideos(result.videos);
      if (result.videos.length > 0) {
        setSelectedVideo(result.videos[0]);
      }
    } catch (error) {
      console.error('Erreur de recherche:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoSelect = async (video: any) => {
    setSelectedVideo(video);
    
    // Vérifier la disponibilité de la vidéo sélectionnée si pas encore fait
    if (!videoStatus[video.id]) {
      setVideoStatus(prev => ({ ...prev, [video.id]: 'loading' }));
      const isAvailable = await checkVideoAvailability(video.id);
      setVideoStatus(prev => ({ ...prev, [video.id]: isAvailable ? 'available' : 'unavailable' }));
    }
  };

  const retryVideo = async (video: any) => {
    setVideoStatus(prev => ({ ...prev, [video.id]: 'loading' }));
    const isAvailable = await checkVideoAvailability(video.id);
    setVideoStatus(prev => ({ ...prev, [video.id]: isAvailable ? 'available' : 'unavailable' }));
  };

  const popularSearches = [
    "Eminem MGK",
    "Nas Jay-Z", 
    "Drake Kendrick",
    "Ice Cube NWA",
    "Pusha T Drake"
  ];

  const VideoUnavailableCard = ({ video }: { video: any }) => (
    <div className="aspect-video bg-gradient-to-br from-red-900/20 to-gray-900/50 rounded-lg overflow-hidden relative border border-red-500/30">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(/images/video_unavailable_hip_hop_20251029_105536.png)`
        }}
      />
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mb-3" />
        <h3 className="text-white font-bold mb-2">Vidéo Indisponible</h3>
        <p className="text-gray-300 text-sm mb-1">{video.title}</p>
        <p className="text-gray-400 text-xs mb-4">Cette vidéo n'est plus accessible</p>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => retryVideo(video)}
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Réessayer
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(video.title)}`, '_blank')}
            className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
          >
            <Search className="w-3 h-3 mr-1" />
            Chercher
          </Button>
        </div>
      </div>
    </div>
  );

  const VideoLoadingCard = () => (
    <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-gray-900/50 rounded-lg overflow-hidden relative border border-blue-500/30">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(/images/video_loading_hip_hop_20251029_105555.png)`
        }}
      />
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-blue-400 font-medium">Vérification...</p>
        <p className="text-gray-400 text-sm">Contrôle de disponibilité</p>
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Barre de recherche */}
      <Card className="border border-yellow-500/30 bg-black/50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher un diss track... (ex: Eminem, Nas, Drake)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="bg-red-600 hover:bg-red-700 text-white px-6"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Youtube className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {/* Recherches populaires */}
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-2">Recherches populaires :</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <Button
                  key={search}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQuery(search);
                    setTimeout(() => handleSearch(), 100);
                  }}
                  className="text-xs border-gray-600 text-gray-300 hover:bg-yellow-500/10 hover:border-yellow-500/50"
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lecteur principal */}
      {selectedVideo && (
        <Card className="border border-yellow-500/30 bg-black/50">
          <CardContent className="p-0">
            {videoStatus[selectedVideo.id] === 'loading' ? (
              <VideoLoadingCard />
            ) : videoStatus[selectedVideo.id] === 'unavailable' ? (
              <VideoUnavailableCard video={selectedVideo} />
            ) : (
              <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-yellow-400 mb-2">{selectedVideo.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{selectedVideo.channelTitle}</span>
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  {parseInt(selectedVideo.viewCount).toLocaleString()} vues
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.id}`, '_blank')}
                  className="text-gray-400 hover:text-white p-0 h-auto"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Ouvrir sur YouTube
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Résultats de recherche */}
      {videos.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
            <Music className="w-5 h-5" />
            Résultats ({videos.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <Card 
                key={video.id} 
                className={`cursor-pointer transition-all border ${
                  selectedVideo?.id === video.id 
                    ? 'border-yellow-500 bg-yellow-500/10' 
                    : 'border-gray-600 hover:border-yellow-500/50 bg-black/30'
                }`}
                onClick={() => handleVideoSelect(video)}
              >
                <CardContent className="p-3">
                  {videoStatus[video.id] === 'loading' ? (
                    <div className="aspect-video bg-gray-800 rounded mb-2 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : videoStatus[video.id] === 'unavailable' ? (
                    <div className="aspect-video bg-red-900/20 rounded mb-2 flex items-center justify-center border border-red-500/30">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-black rounded mb-2 overflow-hidden relative group">
                      <img
                        src={video.thumbnails.medium.url}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
                  <h4 className="font-medium text-sm text-white mb-1 line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {video.channelTitle}
                  </p>
                  {videoStatus[video.id] === 'unavailable' && (
                    <p className="text-xs text-red-400 mt-1">Vidéo indisponible</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* État vide */}
      {!selectedVideo && videos.length === 0 && !isLoading && (
        <Card className="border border-gray-600 bg-black/30">
          <CardContent className="p-8 text-center">
            <Youtube className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Recherchez vos diss tracks préférés
            </h3>
            <p className="text-sm text-gray-500">
              Tapez le nom d'un artiste ou d'une battle pour commencer
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}