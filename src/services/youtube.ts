// Configuration YouTube API
export const YOUTUBE_CONFIG = {
  API_KEY: import.meta.env.VITE_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY',
  BASE_URL: 'https://www.googleapis.com/youtube/v3',
  MAX_RESULTS: 10
};

// Types pour l'API YouTube
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
  channelTitle: string;
  publishedAt: string;
  duration?: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
}

export interface YouTubeSearchResult {
  videos: YouTubeVideo[];
  nextPageToken?: string;
  totalResults: number;
}

// Service YouTube API
export class YouTubeService {
  private apiKey: string;

  constructor() {
    this.apiKey = YOUTUBE_CONFIG.API_KEY;
  }

  // Rechercher des vidéos avec la vraie API YouTube
  async searchVideos(query: string, maxResults: number = YOUTUBE_CONFIG.MAX_RESULTS): Promise<YouTubeSearchResult> {
    try {
      console.log('YouTubeService: Début de la recherche pour:', query);
      
      // Vérifier si la clé API est configurée
      if (!this.apiKey || this.apiKey === 'YOUR_YOUTUBE_API_KEY') {
        console.warn('Clé API YouTube non configurée, utilisation des données de fallback');
        return this.getFallbackResults(query, maxResults);
      }

      console.log('YouTubeService: Utilisation de l\'API YouTube avec clé:', this.apiKey.substring(0, 10) + '...');
      const searchUrl = `${YOUTUBE_CONFIG.BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${this.apiKey}`;
      console.log('YouTubeService: URL de recherche:', searchUrl.replace(this.apiKey, 'API_KEY_HIDDEN'));
      
      
      const response = await fetch(searchUrl);
      console.log('YouTubeService: Réponse API reçue, status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`YouTube API error: ${response.status} ${response.statusText}`, errorText);
        
        if (response.status === 403) {
          const errorData = JSON.parse(errorText);
          if (errorData.error?.errors?.[0]?.reason === 'quotaExceeded') {
            console.warn('Quota YouTube dépassé, utilisation du fallback automatique');
          } else {
            console.error('Erreur 403: Vérifiez que votre clé API YouTube est valide et que l\'API YouTube Data v3 est activée');
          }
        }
        return this.getFallbackResults(query, maxResults);
      }
      
      const data = await response.json();
      console.log('YouTubeService: Données reçues:', data);
      
      if (!data.items || data.items.length === 0) {
        console.warn('Aucun résultat trouvé pour:', query);
        return { videos: [], totalResults: 0 };
      }
      
      // Obtenir les statistiques des vidéos
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const statsUrl = `${YOUTUBE_CONFIG.BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${this.apiKey}`;
      
      const statsResponse = await fetch(statsUrl);
      let statsData = { items: [] };
      
      if (statsResponse.ok) {
        statsData = await statsResponse.json();
      }
      
      const videos: YouTubeVideo[] = data.items.map((item: any, index: number) => {
        const stats = statsData.items[index]?.statistics || {};
        const contentDetails = statsData.items[index]?.contentDetails || {};
        
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnails: item.snippet.thumbnails,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          duration: contentDetails.duration,
          viewCount: stats.viewCount,
          likeCount: stats.likeCount,
          commentCount: stats.commentCount
        };
      });

      return {
        videos,
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults
      };
    } catch (error) {
      console.error('Erreur lors de la recherche YouTube:', error);
      return this.getFallbackResults(query, maxResults);
    }
  }

  // Données de fallback en cas de problème avec l'API
  private getFallbackResults(query: string, maxResults: number): YouTubeSearchResult {
    const fallbackTracks = [
      {
        id: "0ePQKD9iBfU",
        title: "Nas - Ether (Jay-Z Diss)",
        description: "Le diss track légendaire de Nas contre Jay-Z",
        channelTitle: "NasVEVO",
        publishedAt: "2001-12-04T00:00:00Z",
        viewCount: "45000000",
        likeCount: "850000"
      },
      {
        id: "FxQTY-W6GIo",
        title: "Eminem - KILLSHOT (MGK Diss)",
        description: "La réponse dévastatrice d'Eminem à Machine Gun Kelly",
        channelTitle: "EminemMusic",
        publishedAt: "2018-09-14T00:00:00Z",
        viewCount: "503000000",
        likeCount: "4200000"
      },
      {
        id: "H58vbez_m4E",
        title: "Kendrick Lamar - Not Like Us (Drake Diss)",
        description: "Le diss track de Kendrick Lamar contre Drake qui a dominé 2024",
        channelTitle: "KendrickLamarVEVO",
        publishedAt: "2024-05-04T00:00:00Z",
        viewCount: "408000000",
        likeCount: "3800000"
      },
      {
        id: "rSK8jTzl1Kw",
        title: "Ice Cube - No Vaseline (N.W.A Diss)",
        description: "Le diss track brutal d'Ice Cube contre N.W.A",
        channelTitle: "IceCubeVEVO",
        publishedAt: "1991-10-01T00:00:00Z",
        viewCount: "89000000",
        likeCount: "1200000"
      }
    ];

    // Filtrer selon la requête
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    let filteredTracks = fallbackTracks;
    
    if (searchTerms.length > 0) {
      filteredTracks = fallbackTracks.filter(track => {
        const trackText = (track.title + ' ' + track.description).toLowerCase();
        return searchTerms.some(term => trackText.includes(term));
      });
    }

    const videos: YouTubeVideo[] = filteredTracks.slice(0, maxResults).map(track => ({
      id: track.id,
      title: track.title,
      description: track.description,
      thumbnails: {
        default: { 
          url: `https://img.youtube.com/vi/${track.id}/default.jpg`, 
          width: 120, 
          height: 90 
        },
        medium: { 
          url: `https://img.youtube.com/vi/${track.id}/mqdefault.jpg`, 
          width: 320, 
          height: 180 
        },
        high: { 
          url: `https://img.youtube.com/vi/${track.id}/hqdefault.jpg`, 
          width: 480, 
          height: 360 
        }
      },
      channelTitle: track.channelTitle,
      publishedAt: track.publishedAt,
      duration: "PT3M45S",
      viewCount: track.viewCount,
      likeCount: track.likeCount,
      commentCount: "15000"
    }));

    return {
      videos,
      totalResults: videos.length
    };
  }

  // Obtenir les détails d'une vidéo par ID
  async getVideoDetails(videoId: string): Promise<YouTubeVideo | null> {
    try {
      if (!this.apiKey || this.apiKey === 'YOUR_YOUTUBE_API_KEY') {
        return null;
      }

      const url = `${YOUTUBE_CONFIG.BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${this.apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.items.length === 0) {
        return null;
      }
      
      const item = data.items[0];
      const stats = item.statistics || {};
      const contentDetails = item.contentDetails || {};
      
      return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        duration: contentDetails.duration,
        viewCount: stats.viewCount,
        likeCount: stats.likeCount,
        commentCount: stats.commentCount
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des détails YouTube:', error);
      return null;
    }
  }

  // Extraire l'ID YouTube d'une URL
  extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    return null;
  }

  // Formater la durée ISO 8601 en format lisible
  formatDuration(duration: string): string {
    if (!duration) return '';
    
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '';
    
    const hours = match[1] ? parseInt(match[1].slice(0, -1)) : 0;
    const minutes = match[2] ? parseInt(match[2].slice(0, -1)) : 0;
    const seconds = match[3] ? parseInt(match[3].slice(0, -1)) : 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Formater le nombre de vues
  formatViewCount(viewCount: string): string {
    if (!viewCount) return '0 vues';
    
    const count = parseInt(viewCount);
    if (count >= 1000000000) {
      return `${(count / 1000000000).toFixed(1)}B vues`;
    }
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M vues`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K vues`;
    }
    return `${count} vues`;
  }

  // Vérifier si l'API est configurée
  isConfigured(): boolean {
    return !!(this.apiKey && this.apiKey !== 'YOUR_YOUTUBE_API_KEY');
  }
}

// Instance singleton du service
export const youtubeService = new YouTubeService();