import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = "Battles Flow - Les Battles Hip-Hop Légendaires du Rap Américain",
  description = "Découvrez les battles hip-hop légendaires qui ont marqué l'histoire du rap américain. Nas vs Jay-Z, Eminem vs MGK, Ice Cube vs NWA - Explorez les diss tracks les plus épiques.",
  keywords = "battles hip-hop, diss tracks, rap américain, Nas Jay-Z, Eminem MGK, Ice Cube NWA, battles rap, hip-hop français, culture hip-hop, confrontations rap",
  image = "https://battlesflow.com/images/battles_flow_mic_neon_20251028_135949.png",
  url = "https://battlesflow.com/",
  type = "website"
}: SEOProps) {
  
  useEffect(() => {
    // Mettre à jour le titre de la page
    document.title = title;
    
    // Mettre à jour ou créer les meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Meta tags standards
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Battles Flow', true);
    updateMetaTag('og:locale', 'fr_FR', true);
    
    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:url', url, true);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
  }, [title, description, keywords, image, url, type]);
  
  return null; // Ce composant ne rend rien visuellement
}

// Hook personnalisé pour le SEO dynamique
export function useSEO(seoProps: SEOProps) {
  useEffect(() => {
    const seoComponent = new (SEO as any)(seoProps);
    return () => {
      // Cleanup si nécessaire
    };
  }, [seoProps]);
}

// Données SEO pré-configurées pour différentes sections
export const SEO_DATA = {
  home: {
    title: "Battles Flow - Les Battles Hip-Hop Légendaires du Rap Américain",
    description: "Découvrez les battles hip-hop légendaires qui ont marqué l'histoire du rap américain. Nas vs Jay-Z, Eminem vs MGK, Ice Cube vs NWA - Explorez les diss tracks les plus épiques.",
    keywords: "battles hip-hop, diss tracks, rap américain, Nas Jay-Z, Eminem MGK, Ice Cube NWA, battles rap, hip-hop français, culture hip-hop, confrontations rap",
    url: "https://battlesflow.com/"
  },
  battles: {
    title: "Battles Hip-Hop Légendaires - Nas, Eminem, Ice Cube | Battles Flow",
    description: "Explorez les plus grandes battles de l'histoire du hip-hop : Nas vs Jay-Z (Ether), Ice Cube vs NWA (No Vaseline), Eminem vs MGK (Killshot). Découvrez les diss tracks qui ont marqué le rap.",
    keywords: "battles hip-hop, Nas Ether, Ice Cube No Vaseline, Eminem Killshot, Jay-Z Takeover, diss tracks légendaires, confrontations rap",
    url: "https://battlesflow.com/#battles"
  },
  chronologie: {
    title: "Chronologie des Battles Hip-Hop - Histoire du Rap Américain | Battles Flow",
    description: "Suivez l'évolution des battles hip-hop à travers les décennies. De Roxanne Wars aux battles modernes, découvrez comment les diss tracks ont façonné la culture rap.",
    keywords: "chronologie hip-hop, histoire rap américain, évolution battles, diss tracks par décennie, culture hip-hop",
    url: "https://battlesflow.com/#chronologie"
  },
  quiz: {
    title: "Quiz Hip-Hop - Testez vos Connaissances sur les Battles | Battles Flow",
    description: "Testez vos connaissances sur les battles hip-hop légendaires ! Quiz interactif sur Nas, Jay-Z, Eminem, Ice Cube et les plus grands diss tracks de l'histoire du rap.",
    keywords: "quiz hip-hop, test connaissances rap, quiz battles, quiz diss tracks, culture hip-hop",
    url: "https://battlesflow.com/#quiz"
  },
  youtube: {
    title: "Diss Tracks YouTube - Écoutez les Battles Hip-Hop | Battles Flow",
    description: "Écoutez les plus grands diss tracks sur YouTube. Collection complète des battles hip-hop : Ether, No Vaseline, Killshot, Takeover et bien plus encore.",
    keywords: "diss tracks YouTube, écouter battles hip-hop, Nas Ether YouTube, Ice Cube No Vaseline, Eminem Killshot",
    url: "https://battlesflow.com/#youtube"
  }
};