// Service de vérification des vidéos YouTube
export interface VideoStatus {
  isAvailable: boolean;
  videoId: string;
  title: string;
  thumbnail?: string;
  error?: string;
}

export class YouTubeVerificationService {
  private static cache = new Map<string, VideoStatus>();
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Extrait l'ID de la vidéo depuis une URL YouTube
   */
  static extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  /**
   * Vérifie si une vidéo YouTube est disponible via oEmbed API
   */
  static async checkVideoAvailability(url: string): Promise<VideoStatus> {
    const videoId = this.extractVideoId(url);
    if (!videoId) {
      return {
        isAvailable: false,
        videoId: '',
        title: 'URL invalide',
        error: 'URL YouTube invalide'
      };
    }

    // Vérifier le cache
    const cacheKey = videoId;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Utiliser l'API oEmbed de YouTube
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      
      const response = await fetch(oembedUrl);
      
      if (response.ok) {
        const data = await response.json();
        const status: VideoStatus = {
          isAvailable: true,
          videoId,
          title: data.title || 'Titre indisponible',
          thumbnail: data.thumbnail_url
        };
        
        // Mettre en cache
        this.cache.set(cacheKey, status);
        setTimeout(() => this.cache.delete(cacheKey), this.CACHE_DURATION);
        
        return status;
      } else {
        const status: VideoStatus = {
          isAvailable: false,
          videoId,
          title: 'Vidéo indisponible',
          error: `Erreur ${response.status}: Vidéo supprimée ou privée`
        };
        
        // Mettre en cache les erreurs aussi (mais moins longtemps)
        this.cache.set(cacheKey, status);
        setTimeout(() => this.cache.delete(cacheKey), 60000); // 1 minute
        
        return status;
      }
    } catch (error) {
      const status: VideoStatus = {
        isAvailable: false,
        videoId,
        title: 'Erreur de connexion',
        error: 'Impossible de vérifier la vidéo'
      };
      
      return status;
    }
  }

  /**
   * Génère une URL de recherche YouTube pour un morceau
   */
  static generateSearchUrl(artist: string, title: string): string {
    const query = encodeURIComponent(`${artist} ${title} official`);
    return `https://www.youtube.com/results?search_query=${query}`;
  }

  /**
   * Génère une URL de recherche Google pour un morceau
   */
  static generateGoogleSearchUrl(artist: string, title: string): string {
    const query = encodeURIComponent(`${artist} ${title} youtube`);
    return `https://www.google.com/search?q=${query}`;
  }
}