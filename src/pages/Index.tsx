import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mic, Music, Trophy, Clock, Zap, Users, Brain, Youtube, Mail, Send, Info } from "lucide-react";
import { battles, Battle } from "@/data/battles";
import { BattleCard } from "@/components/BattleCard";
import { BattleDetails } from "@/components/BattleDetails";
import { Timeline } from "@/components/Timeline";
import { Statistics } from "@/components/Statistics";
import { SearchFilters } from "@/components/SearchFilters";
import { SearchResults } from "@/components/SearchResults";
import { QuizSection } from "@/components/QuizSection";
import { YouTubePlayer } from "@/components/YouTubePlayer";

export default function Index() {
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [activeTab, setActiveTab] = useState("battles");
  const [filteredBattles, setFilteredBattles] = useState<Battle[]>(battles);
  
  // États pour le formulaire de contact
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Trier les battles par impact (du plus élevé au plus bas)
  const sortedBattles = [...filteredBattles].sort((a, b) => b.impact - a.impact);

  const handleViewDetails = (battle: Battle) => {
    setSelectedBattle(battle);
    // Scroll vers le haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBattles = () => {
    setSelectedBattle(null);
    // Scroll vers le haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBattleFromTimeline = (battleId: string) => {
    const battle = battles.find(b => b.id === battleId);
    if (battle) {
      setSelectedBattle(battle);
      setActiveTab("battles");
      // Scroll vers le haut de la page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilteredResults = (filtered: Battle[]) => {
    setFilteredBattles(filtered);
  };

  // Gestion du formulaire de contact
  const handleContactInputChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validation côté client
      if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
        throw new Error('Tous les champs sont requis');
      }

      // ✅ CORRECTION : Appel à VOTRE API Next.js sur Vercel
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'envoi du message');
      }

      const result = await response.json();
      
      setSubmitMessage('✅ Message envoyé avec succès ! Nous vous répondrons bientôt.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Erreur envoi email:', error);
      setSubmitMessage(`❌ Erreur: ${error.message || 'Veuillez réessayer.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selectedBattle) {
    return (
      <div className="min-h-screen bg-black text-white graffiti-bg">
        <div className="container mx-auto px-4 py-8">
          <BattleDetails battle={selectedBattle} onBack={handleBackToBattles} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white graffiti-bg">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center urban-hero">
        <div className="relative z-10 container mx-auto max-w-4xl">
          {/* Logo Microphone */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src="./images/battles_flow_mic_neon_20251028_135949.png" 
                alt="Battles Flow - Microphone Logo" 
                className="h-20 w-auto object-contain filter drop-shadow-lg"
                onError={(e) => {
                  // Fallback vers une icône Lucide si l'image ne charge pas
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.innerHTML = '<div class="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center"><svg class="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v4"/><path d="M8 22h8"/></svg></div>';
                  e.currentTarget.parentNode?.appendChild(fallback);
                }}
              />
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40 px-4 py-2 text-sm font-bold">
              <Mic className="w-4 h-4 mr-2" />
              CULTURE HIP-HOP
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 street-title px-4">
            <span className="gradient-text">BATTLES FLOW</span>
            <br />
            <span className="text-white">DU HIP-HOP AMÉRICAIN</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed urban-subtitle max-w-3xl mx-auto px-4">
            Découvrez les confrontations légendaires qui ont marqué l'histoire du rap américain. 
            Des battles épiques aux diss tracks dévastateurs, explorez les moments qui ont défini la culture hip-hop.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 px-4">
            <Button 
              size="lg" 
              className="neon-button w-full sm:w-auto"
              onClick={() => setActiveTab("battles")}
            >
              <Trophy className="w-5 h-5 mr-2" />
              EXPLORER LES BATTLES
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-bold px-6 py-3 w-full sm:w-auto"
              onClick={() => setActiveTab("chronologie")}
            >
              <Clock className="w-5 h-5 mr-2" />
              CHRONOLOGIE
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-4 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <Statistics />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 bg-black/30">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Header avec logo micro */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-3">
                <Mic className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-yellow-500 street-title">BATTLES FLOW</h2>
                <Mic className="w-6 h-6 text-yellow-500 scale-x-[-1]" />
              </div>
            </div>
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-7 mb-8 bg-black/80 border-2 border-yellow-500/30 h-auto sm:h-10">
              <TabsTrigger value="battles" className="flex items-center gap-2 text-yellow-400 font-bold data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-xs sm:text-sm py-2 sm:py-1">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">BATTLES</span>
                <span className="sm:hidden">BATTLES</span>
              </TabsTrigger>
              <TabsTrigger value="chronologie" className="flex items-center gap-2 text-yellow-400 font-bold data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-xs sm:text-sm py-2 sm:py-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">CHRONOLOGIE</span>
                <span className="sm:hidden">TEMPS</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center gap-2 text-yellow-400 font-bold data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-xs sm:text-sm py-2 sm:py-1">
                <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">QUIZ</span>
                <span className="sm:hidden">QUIZ</span>
              </TabsTrigger>
              <TabsTrigger value="youtube" className="flex items-center gap-2 text-red-400 font-bold data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-1">
                <Youtube className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">YOUTUBE</span>
                <span className="sm:hidden">YT</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2 text-green-400 font-bold data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-1">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">CONTACT</span>
                <span className="sm:hidden">MAIL</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2 text-yellow-400 font-bold data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-xs sm:text-sm py-2 sm:py-1">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">À PROPOS</span>
                <span className="sm:hidden">INFO</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="battles" className="space-y-8">
              <div className="text-center mb-8 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 street-title">
                  <span className="graffiti-text">BATTLES LÉGENDAIRES</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto urban-subtitle text-sm sm:text-base">
                  Découvrez et filtrez les confrontations qui ont façonné l'histoire du hip-hop américain.
                </p>
              </div>

              {/* Système de recherche et filtres */}
              <SearchFilters battles={battles} onFilteredResults={handleFilteredResults} />
              
              {/* Résultats de recherche */}
              <SearchResults 
                filteredBattles={filteredBattles} 
                totalBattles={battles.length}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
                {sortedBattles.map((battle) => (
                  <BattleCard 
                    key={battle.id} 
                    battle={battle} 
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="chronologie" className="space-y-8">
              <div className="text-center mb-8 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 street-title">
                  <span className="graffiti-text">CHRONOLOGIE INTERACTIVE</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto urban-subtitle text-sm sm:text-base">
                  Suivez l'évolution des battles de diss à travers les décennies du hip-hop américain.
                </p>
              </div>
              
              <Timeline onSelectBattle={handleSelectBattleFromTimeline} />
            </TabsContent>

            <TabsContent value="quiz" className="space-y-8">
              <div className="text-center mb-8 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 street-title">
                  <span className="graffiti-text">QUIZ HIP-HOP</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto urban-subtitle text-sm sm:text-base">
                  Testez vos connaissances sur les battles légendaires et gagnez des badges exclusifs !
                </p>
              </div>
              
              <QuizSection />
            </TabsContent>

            <TabsContent value="youtube" className="space-y-8">
              <div className="text-center mb-8 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 street-title">
                  <span className="text-red-500">🎥 YOUTUBE HUB</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto urban-subtitle text-sm sm:text-base">
                  Explorez l'univers YouTube des battles hip-hop avec des statistiques en temps réel, des playlists interactives et une recherche avancée.
                </p>
              </div>

              {/* Lecteur YouTube principal */}
              <YouTubePlayer
                initialQuery="hip hop diss track battle"
                autoSearch={false}
                showSearch={true}
                className="max-w-6xl mx-auto"
              />

              {/* Suggestions de recherches populaires */}
              <Card className="hip-hop-card max-w-4xl mx-auto">
                <CardHeader className="p-4">
                  <CardTitle className="text-yellow-400 street-title">
                    🔥 RECHERCHES POPULAIRES
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      "Nas Ether",
                      "Ice Cube No Vaseline", 
                      "Eminem Killshot",
                      "Pusha T Story of Adidon",
                      "Jay-Z Takeover",
                      "Kendrick Not Like Us",
                      "50 Cent Back Down",
                      "LL Cool J Mama Said"
                    ].map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs"
                        onClick={() => {
                          // Cette fonctionnalité sera implémentée dans le composant YouTubePlayer
                          console.log(`Recherche: ${query}`);
                        }}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-8">
              <div className="text-center mb-8 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 street-title">
                  <span className="text-green-500">📧 CONTACTEZ-NOUS</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto urban-subtitle text-sm sm:text-base">
                  Une question, une suggestion ou envie de partager votre passion pour les battles hip-hop ? 
                  Nous serions ravis d'échanger avec vous !
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card className="hip-hop-card">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center gap-2 text-xl text-green-400 street-title">
                      <Send className="w-5 h-5" />
                      FORMULAIRE DE CONTACT
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6 pt-0">
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nom *
                          </label>
                          <Input
                            type="text"
                            value={contactForm.name}
                            onChange={(e) => handleContactInputChange('name', e.target.value)}
                            placeholder="Votre nom"
                            required
                            className="bg-black/50 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => handleContactInputChange('email', e.target.value)}
                            placeholder="votre@email.com"
                            required
                            className="bg-black/50 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Sujet *
                        </label>
                        <Input
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => handleContactInputChange('subject', e.target.value)}
                          placeholder="Sujet de votre message"
                          required
                          className="bg-black/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message *
                        </label>
                        <Textarea
                          value={contactForm.message}
                          onChange={(e) => handleContactInputChange('message', e.target.value)}
                          placeholder="Votre message..."
                          required
                          rows={6}
                          className="bg-black/50 border-gray-600 text-white placeholder-gray-400 resize-none"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full neon-button"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            ENVOI EN COURS...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            ENVOYER LE MESSAGE
                          </>
                        )}
                      </Button>
                      
                      {submitMessage && (
                        <div className={`text-center p-3 rounded-lg ${
                          submitMessage.includes('✅') 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/50'
                        }`}>
                          {submitMessage}
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
                
                {/* Informations supplémentaires */}
                <Card className="hip-hop-card mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-yellow-400 mb-4 street-title">
                      💡 AUTRES MOYENS DE NOUS CONTACTER
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Email direct : contact@battlesflow.com</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">Suivez-nous sur les réseaux sociaux pour les dernières actualités</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">Temps de réponse habituel : 24-48h</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <Card className="hip-hop-card">
                  <CardHeader>
                    <CardTitle className="text-3xl gradient-text text-center">
                      L'Art du Diss Track
                    </CardTitle>
                    <CardDescription className="text-center text-lg">
                      Comprendre la culture des battles dans le hip-hop américain
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Music className="w-5 h-5 text-primary" />
                          Qu'est-ce qu'un Diss Track ?
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Un diss track est un morceau de rap spécifiquement créé pour attaquer, critiquer ou humilier un autre rappeur. 
                          Ces morceaux sont devenus un élément central de la culture hip-hop, permettant aux artistes de régler leurs différends 
                          de manière créative et publique.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-primary" />
                          L'Impact Culturel
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Les battles de diss ont façonné l'industrie du hip-hop, créant des légendes, détruisant des carrières, 
                          et poussant les artistes à repousser leurs limites créatives. Elles représentent l'essence compétitive 
                          du rap et son pouvoir de transformation sociale.
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-semibold mb-3">Les Règles Non-Écrites</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border border-border/50">
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Authenticité</h4>
                            <p className="text-sm text-muted-foreground">
                              Les attaques doivent être basées sur des faits réels pour avoir un impact maximum.
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-border/50">
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Créativité</h4>
                            <p className="text-sm text-muted-foreground">
                              L'originalité des punchlines et des métaphores est cruciale pour marquer les esprits.
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-border/50">
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Timing</h4>
                            <p className="text-sm text-muted-foreground">
                              La rapidité de réponse peut déterminer qui prend l'avantage dans la battle.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
