import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Eye, 
  ThumbsUp, 
  MessageCircle, 
  Clock, 
  ExternalLink,
  Youtube,
  TrendingUp,
  Calendar
} from "lucide-react";
import { YouTubeVideo, youtubeService } from "@/services/youtube";

interface BattlePlaylistProps {
  battleTitle: string;
  tracks: Array<{
    title: string;
    artist: string;
    youtubeUrl: string;
    description: string;
  }>;
  className?: string;
}

export function BattlePlaylist({ battleTitle, tracks, className = "" }: BattlePlaylistProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    loadVideosDetails();
  }, [tracks]);

  const loadVideosDetails = async () => {
    setIsLoading(true);
    const videoDetails: YouTubeVideo[] = [];

    for (const track of tracks) {
      const videoId = youtubeService.extractVideoId(track.youtubeUrl);
      if (videoId) {
        const details = await youtubeService.getVideoDetails(videoId);
        if (details) {
          videoDetails.push(details);
        }
      }
    }

    setVideos(videoDetails);
    if (videoDetails.length > 0) {
      setSelectedVideo(videoDetails[0]);
    }
    setIsLoading(false);
  };

  const handleVideoSelect = (video: YouTubeVideo, index: number) => {
    setSelectedVideo(video);
    setCurrentTrackIndex(index);
  };

  const getTrackInfo = (index: number) => {
    return tracks[index] || null;
  };

  const getTotalStats = () => {
    const totalViews = videos.reduce((sum, video) => {
      return sum + (video.viewCount ? parseInt(video.viewCount) : 0);
    }, 0);

    const totalLikes = videos.reduce((sum, video) => {
      return sum + (video.likeCount ? parseInt(video.likeCount) : 0);
    }, 0);

    return { totalViews, totalLikes };
  };

  const stats = getTotalStats();

  if (isLoading) {
    return (
      <Card className={`hip-hop-card ${className}`}>
        <CardContent className="p-8 text-center">
          <Youtube className="w-8 h-8 animate-pulse mx-auto mb-4 text-yellow-400" />
          <p className="text-gray-400">Chargement de la playlist...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header de la playlist */}
      <Card className="hip-hop-card">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-yellow-400 street-title">
                🎵 PLAYLIST: {battleTitle}
              </CardTitle>
              <p className="text-gray-400 text-sm mt-1">
                {videos.length} morceaux • Battle hip-hop
              </p>
            </div>
            <Badge className="bg-red-600 text-white">
              <Youtube className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          </div>
        </CardHeader>
        
        {/* Statistiques globales */}
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-yellow-400" />
              <div>
                <p className="text-xs text-gray-400">Morceaux</p>
                <p className="text-sm font-bold text-white">{videos.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Vues totales</p>
                <p className="text-sm font-bold text-white">
                  {youtubeService.formatNumber(stats.totalViews)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Likes totaux</p>
                <p className="text-sm font-bold text-white">
                  {youtubeService.formatNumber(stats.totalLikes)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Popularité</p>
                <p className="text-sm font-bold text-white">
                  {stats.totalViews > 10000000 ? 'VIRAL' : stats.totalViews > 1000000 ? 'POPULAIRE' : 'CLASSIQUE'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lecteur principal */}
      {selectedVideo && (
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
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                    Morceau {currentTrackIndex + 1}/{videos.length}
                  </Badge>
                  {getTrackInfo(currentTrackIndex) && (
                    <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                      {getTrackInfo(currentTrackIndex)?.artist}
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.id}`, '_blank')}
                variant="outline"
                size="sm"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 flex-shrink-0"
              >
                <Youtube className="w-4 h-4 mr-1" />
                YouTube
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 pt-0">
            {/* Lecteur YouTube intégré */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Statistiques détaillées */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
              {selectedVideo.viewCount && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Vues</p>
                    <p className="text-sm font-bold text-white">
                      {youtubeService.formatNumber(selectedVideo.viewCount)}
                    </p>
                  </div>
                </div>
              )}
              
              {selectedVideo.likeCount && (
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-xs text-gray-400">Likes</p>
                    <p className="text-sm font-bold text-white">
                      {youtubeService.formatNumber(selectedVideo.likeCount)}
                    </p>
                  </div>
                </div>
              )}
              
              {selectedVideo.commentCount && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-400">Commentaires</p>
                    <p className="text-sm font-bold text-white">
                      {youtubeService.formatNumber(selectedVideo.commentCount)}
                    </p>
                  </div>
                </div>
              )}
              
              {selectedVideo.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">Durée</p>
                    <p className="text-sm font-bold text-white">
                      {youtubeService.formatDuration(selectedVideo.duration)}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Publié</p>
                  <p className="text-sm font-bold text-white">
                    {new Date(selectedVideo.publishedAt).getFullYear()}
                  </p>
                </div>
              </div>
            </div>

            {/* Description du track */}
            {getTrackInfo(currentTrackIndex) && (
              <div className="bg-black/30 rounded-lg p-3 border border-yellow-500/20">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {getTrackInfo(currentTrackIndex)?.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Liste des morceaux */}
      <Card className="hip-hop-card">
        <CardHeader className="p-4">
          <CardTitle className="text-lg text-yellow-400 street-title">
            MORCEAUX DE LA BATTLE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {videos.map((video, index) => {
              const trackInfo = getTrackInfo(index);
              const isSelected = selectedVideo?.id === video.id;
              
              return (
                <Card 
                  key={video.id}
                  className={`cursor-pointer transition-all hover:border-yellow-500/50 ${
                    isSelected ? 'border-yellow-500 bg-yellow-500/5' : 'border-border/50'
                  }`}
                  onClick={() => handleVideoSelect(video, index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnails.medium.url}
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                        {video.duration && (
                          <Badge className="absolute bottom-0 right-0 bg-black/80 text-white text-xs">
                            {youtubeService.formatDuration(video.duration)}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Informations */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-white line-clamp-1 mb-1">
                          {trackInfo?.title || video.title}
                        </h4>
                        <p className="text-xs text-yellow-400 mb-1">
                          {trackInfo?.artist || video.channelTitle}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          {video.viewCount && (
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {youtubeService.formatNumber(video.viewCount)}
                            </span>
                          )}
                          {video.likeCount && (
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {youtubeService.formatNumber(video.likeCount)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Indicateur de lecture */}
                      {isSelected && (
                        <div className="flex-shrink-0">
                          <Badge className="bg-yellow-500 text-black">
                            EN COURS
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}