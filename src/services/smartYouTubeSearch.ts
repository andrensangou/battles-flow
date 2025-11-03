// Service de recherche YouTube intelligent pour les battles hip-hop
export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
  publishedAt: string;
  description: string;
  viewCount: string;
  duration: string;
}

export interface SearchResult {
  videos: YouTubeVideo[];
  totalResults: number;
  query: string;
}

// Base de données de vidéos hip-hop populaires
const POPULAR_HIP_HOP_VIDEOS: YouTubeVideo[] = [
  {
    id: "0ePQKD9iBfU",
    title: "Nas - Ether (Jay-Z Diss)",
    channelTitle: "NasVEVO",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/0ePQKD9iBfU/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/0ePQKD9iBfU/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/0ePQKD9iBfU/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2012-06-16T07:00:01Z",
    description: "Nas - Ether (Jay-Z Diss) from the album Stillmatic",
    viewCount: "45000000",
    duration: "PT4M36S"
  },
  {
    id: "Aht7DVRRNiQ",
    title: "Jay-Z - Takeover (Nas Diss)",
    channelTitle: "Jay-Z",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/Aht7DVRRNiQ/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/Aht7DVRRNiQ/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/Aht7DVRRNiQ/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2009-10-27T04:09:33Z",
    description: "Jay-Z - Takeover from The Blueprint album",
    viewCount: "12000000",
    duration: "PT5M13S"
  },
  {
    id: "FxQTY-W6GIo",
    title: "Eminem - Killshot (Machine Gun Kelly Diss)",
    channelTitle: "EminemVEVO",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/FxQTY-W6GIo/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/FxQTY-W6GIo/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/FxQTY-W6GIo/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2018-09-14T17:00:11Z",
    description: "Eminem - Killshot (Machine Gun Kelly Diss)",
    viewCount: "380000000",
    duration: "PT4M13S"
  },
  {
    id: "bvRc7pwnt0U",
    title: "Ice Cube - No Vaseline (N.W.A Diss)",
    channelTitle: "IceCubeVEVO",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/bvRc7pwnt0U/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/bvRc7pwnt0U/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/bvRc7pwnt0U/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2012-10-03T07:00:01Z",
    description: "Ice Cube - No Vaseline (N.W.A Diss)",
    viewCount: "25000000",
    duration: "PT5M14S"
  },
  {
    id: "7JW133P0rZs",
    title: "50 Cent - Back Down (Ja Rule Diss)",
    channelTitle: "50CentVEVO",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/7JW133P0rZs/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/7JW133P0rZs/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/7JW133P0rZs/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2009-10-25T22:32:33Z",
    description: "50 Cent - Back Down (Ja Rule Diss)",
    viewCount: "8000000",
    duration: "PT4M02S"
  },
  {
    id: "mUK_GzuHvgM",
    title: "Pusha T - The Story of Adidon (Drake Diss)",
    channelTitle: "Pusha T",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/mUK_GzuHvgM/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/mUK_GzuHvgM/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/mUK_GzuHvgM/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2018-05-29T23:00:01Z",
    description: "Pusha T - The Story of Adidon (Drake Diss)",
    viewCount: "95000000",
    duration: "PT3M02S"
  },
  {
    id: "Lr7CKWxqhtw",
    title: "Drake - Duppy Freestyle (Pusha T Diss)",
    channelTitle: "Drake",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/Lr7CKWxqhtw/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/Lr7CKWxqhtw/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/Lr7CKWxqhtw/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2018-05-25T23:00:01Z",
    description: "Drake - Duppy Freestyle (Pusha T Diss)",
    viewCount: "42000000",
    duration: "PT3M49S"
  },
  {
    id: "KU_Jdts5rL0",
    title: "Machine Gun Kelly - Rap Devil (Eminem Diss)",
    channelTitle: "Machine Gun Kelly",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/KU_Jdts5rL0/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/KU_Jdts5rL0/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/KU_Jdts5rL0/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2018-09-03T16:00:01Z",
    description: "Machine Gun Kelly - Rap Devil (Eminem Diss)",
    viewCount: "280000000",
    duration: "PT4M31S"
  },
  {
    id: "GygEAcFFMVs",
    title: "Common - The Bitch in Yoo (Ice Cube Diss)",
    channelTitle: "CommonVEVO",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/GygEAcFFMVs/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/GygEAcFFMVs/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/GygEAcFFMVs/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2009-10-27T07:00:01Z",
    description: "Common - The Bitch in Yoo (Ice Cube Diss)",
    viewCount: "3500000",
    duration: "PT4M18S"
  },
  {
    id: "ZVUyyHYkBHk",
    title: "LL Cool J - Ripper Strikes Back (Canibus Diss)",
    channelTitle: "LL Cool J",
    thumbnails: {
      default: { url: "https://i.ytimg.com/vi/ZVUyyHYkBHk/default.jpg", width: 120, height: 90 },
      medium: { url: "https://i.ytimg.com/vi/ZVUyyHYkBHk/mqdefault.jpg", width: 320, height: 180 },
      high: { url: "https://i.ytimg.com/vi/ZVUyyHYkBHk/hqdefault.jpg", width: 480, height: 360 }
    },
    publishedAt: "2009-11-25T08:00:01Z",
    description: "LL Cool J - Ripper Strikes Back (Canibus Diss)",
    viewCount: "1800000",
    duration: "PT3M55S"
  }
];

// Mots-clés pour améliorer la recherche
const SEARCH_KEYWORDS = {
  battles: ["battle", "diss", "beef", "vs", "against", "response", "reply"],
  artists: ["nas", "jay-z", "eminem", "ice cube", "50 cent", "drake", "pusha t", "mgk", "machine gun kelly", "ja rule"],
  tracks: ["ether", "takeover", "killshot", "no vaseline", "back down", "story of adidon", "duppy freestyle", "rap devil"]
};

export class SmartYouTubeSearch {
  /**
   * Recherche intelligente de tracks hip-hop
   */
  static searchTracks(query: string, maxResults: number = 10): SearchResult {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Si la requête est vide, retourner les vidéos populaires
    if (!normalizedQuery) {
      return {
        videos: POPULAR_HIP_HOP_VIDEOS.slice(0, maxResults),
        totalResults: POPULAR_HIP_HOP_VIDEOS.length,
        query: query
      };
    }

    // Recherche par correspondance exacte d'abord
    let results = POPULAR_HIP_HOP_VIDEOS.filter(video => {
      const title = video.title.toLowerCase();
      const channel = video.channelTitle.toLowerCase();
      const description = video.description.toLowerCase();
      
      return title.includes(normalizedQuery) || 
             channel.includes(normalizedQuery) || 
             description.includes(normalizedQuery);
    });

    // Si pas assez de résultats, recherche par mots-clés
    if (results.length < maxResults) {
      const keywordMatches = POPULAR_HIP_HOP_VIDEOS.filter(video => {
        if (results.some(r => r.id === video.id)) return false; // Éviter les doublons
        
        const title = video.title.toLowerCase();
        const queryWords = normalizedQuery.split(' ');
        
        return queryWords.some(word => {
          // Recherche dans les artistes
          if (SEARCH_KEYWORDS.artists.some(artist => artist.includes(word) || word.includes(artist))) {
            return title.includes(word) || video.channelTitle.toLowerCase().includes(word);
          }
          
          // Recherche dans les tracks
          if (SEARCH_KEYWORDS.tracks.some(track => track.includes(word) || word.includes(track))) {
            return title.includes(word);
          }
          
          // Recherche dans les mots-clés de battle
          if (SEARCH_KEYWORDS.battles.some(battle => battle.includes(word) || word.includes(battle))) {
            return title.includes(word) || video.description.toLowerCase().includes(word);
          }
          
          return false;
        });
      });
      
      results = [...results, ...keywordMatches];
    }

    // Trier par pertinence (nombre de vues et correspondance)
    results.sort((a, b) => {
      const aViews = parseInt(a.viewCount);
      const bViews = parseInt(b.viewCount);
      
      // Priorité aux correspondances exactes dans le titre
      const aExactMatch = a.title.toLowerCase().includes(normalizedQuery);
      const bExactMatch = b.title.toLowerCase().includes(normalizedQuery);
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      // Sinon, trier par nombre de vues
      return bViews - aViews;
    });

    return {
      videos: results.slice(0, maxResults),
      totalResults: results.length,
      query: query
    };
  }

  /**
   * Obtenir les suggestions de recherche populaires
   */
  static getPopularSearches(): string[] {
    return [
      "Eminem MGK",
      "Nas Jay-Z", 
      "Drake Pusha T",
      "Ice Cube NWA",
      "50 Cent Ja Rule",
      "LL Cool J Canibus",
      "Common Ice Cube",
      "Killshot",
      "Ether",
      "No Vaseline"
    ];
  }

  /**
   * Obtenir les vidéos par artiste
   */
  static getVideosByArtist(artist: string): YouTubeVideo[] {
    const normalizedArtist = artist.toLowerCase();
    return POPULAR_HIP_HOP_VIDEOS.filter(video => 
      video.channelTitle.toLowerCase().includes(normalizedArtist) ||
      video.title.toLowerCase().includes(normalizedArtist)
    );
  }

  /**
   * Obtenir une vidéo par ID
   */
  static getVideoById(id: string): YouTubeVideo | null {
    return POPULAR_HIP_HOP_VIDEOS.find(video => video.id === id) || null;
  }

  /**
   * Obtenir les vidéos les plus populaires
   */
  static getMostPopular(limit: number = 5): YouTubeVideo[] {
    return [...POPULAR_HIP_HOP_VIDEOS]
      .sort((a, b) => parseInt(b.viewCount) - parseInt(a.viewCount))
      .slice(0, limit);
  }

  /**
   * Recherche par décennie
   */
  static getVideosByDecade(decade: string): YouTubeVideo[] {
    const decadeMap: {[key: string]: string[]} = {
      "90s": ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999"],
      "2000s": ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009"],
      "2010s": ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
      "2020s": ["2020", "2021", "2022", "2023", "2024", "2025"]
    };

    const years = decadeMap[decade] || [];
    return POPULAR_HIP_HOP_VIDEOS.filter(video => {
      const year = new Date(video.publishedAt).getFullYear().toString();
      return years.includes(year);
    });
  }
}