import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Brain, 
  Clock,
  Award,
  TrendingUp,
  Play,
  RotateCcw
} from "lucide-react";
import { quizQuestions, badges } from "@/data/quiz";
import { useQuiz } from "@/hooks/useQuiz";
import { QuizGame } from "./QuizGame";
import { QuizResult } from "@/data/quiz";

export function QuizSection() {
  const [gameMode, setGameMode] = useState<'menu' | 'playing' | 'results'>('menu');
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  const { userStats, getUserLevel, getSuccessRate, resetStats, completeQuiz } = useQuiz();

  const startQuiz = (category?: string, difficulty?: string) => {
    let questions = [...quizQuestions];

    // Filtrer par catégorie
    if (category && category !== 'all') {
      questions = questions.filter(q => q.category === category);
    }

    // Filtrer par difficulté
    if (difficulty && difficulty !== 'all') {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    // Mélanger et prendre 5 questions
    const shuffled = questions.sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, Math.min(5, shuffled.length)));
    setGameMode('playing');
  };

  const handleQuizComplete = (results: QuizResult[]) => {
    setQuizResults(results);
    const badges = completeQuiz(results);
    setNewBadges(badges);
    setGameMode('results');
  };

  const backToMenu = () => {
    setGameMode('menu');
    setQuizResults([]);
    setNewBadges([]);
  };

  const userLevel = getUserLevel();
  const successRate = getSuccessRate();

  if (gameMode === 'playing') {
    return (
      <QuizGame
        questions={selectedQuestions}
        onComplete={handleQuizComplete}
        onExit={backToMenu}
      />
    );
  }

  if (gameMode === 'results') {
    const correctAnswers = quizResults.filter(r => r.isCorrect).length;
    const totalPoints = quizResults.reduce((sum, r) => sum + r.pointsEarned, 0);
    const averageTime = quizResults.reduce((sum, r) => sum + r.timeSpent, 0) / quizResults.length / 1000;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="hip-hop-card">
          <CardHeader className="text-center p-6">
            <CardTitle className="text-3xl street-title text-yellow-400 mb-4">
              QUIZ TERMINÉ !
            </CardTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/30 rounded-lg p-4">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{correctAnswers}/{quizResults.length}</div>
                <div className="text-xs text-gray-400">Bonnes réponses</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{totalPoints}</div>
                <div className="text-xs text-gray-400">Points gagnés</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{averageTime.toFixed(1)}s</div>
                <div className="text-xs text-gray-400">Temps moyen</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{Math.round((correctAnswers / quizResults.length) * 100)}%</div>
                <div className="text-xs text-gray-400">Réussite</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Nouveaux badges */}
        {newBadges.length > 0 && (
          <Card className="hip-hop-card">
            <CardHeader className="p-6">
              <CardTitle className="text-xl street-title text-yellow-400 text-center mb-4">
                🎉 NOUVEAUX BADGES DÉBLOQUÉS !
              </CardTitle>
              <div className="flex flex-wrap justify-center gap-4">
                {newBadges.map(badgeId => {
                  const badge = badges.find(b => b.id === badgeId);
                  return badge ? (
                    <div key={badgeId} className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className="font-bold text-yellow-400">{badge.name}</div>
                      <div className="text-xs text-gray-300">{badge.description}</div>
                    </div>
                  ) : null;
                })}
              </div>
            </CardHeader>
          </Card>
        )}

        <div className="flex justify-center gap-4">
          <Button onClick={() => startQuiz()} className="neon-button">
            <Play className="w-4 h-4 mr-2" />
            NOUVEAU QUIZ
          </Button>
          <Button onClick={backToMenu} variant="outline" className="border-yellow-500/50 text-yellow-400">
            RETOUR AU MENU
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats utilisateur */}
      <Card className="hip-hop-card">
        <CardHeader className="p-6">
          <CardTitle className="text-2xl street-title text-yellow-400 text-center mb-6">
            VOS STATISTIQUES
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{userLevel.level}</div>
              <div className="text-xs text-gray-400">{userLevel.name}</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{userStats.totalPoints}</div>
              <div className="text-xs text-gray-400">Points totaux</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{successRate}%</div>
              <div className="text-xs text-gray-400">Taux de réussite</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{userStats.bestStreak}</div>
              <div className="text-xs text-gray-400">Meilleure série</div>
            </div>
          </div>

          {/* Barre de progression niveau */}
          {userLevel.nextLevel && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Niveau {userLevel.level}: {userLevel.name}</span>
                <span>{userStats.totalPoints}/{userLevel.nextLevel}</span>
              </div>
              <Progress 
                value={(userStats.totalPoints / userLevel.nextLevel) * 100} 
                className="h-3"
              />
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Modes de quiz */}
      <Card className="hip-hop-card">
        <CardHeader className="p-6">
          <CardTitle className="text-2xl street-title text-yellow-400 text-center mb-6">
            CHOISISSEZ VOTRE DÉFI
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Quiz général */}
            <Button
              onClick={() => startQuiz()}
              className="h-auto p-6 flex flex-col items-center gap-3 neon-button"
            >
              <Brain className="w-8 h-8" />
              <div className="text-center">
                <div className="font-bold">QUIZ GÉNÉRAL</div>
                <div className="text-xs opacity-80">Toutes catégories</div>
              </div>
            </Button>

            {/* Quiz par catégorie */}
            <Button
              onClick={() => startQuiz('battles')}
              className="h-auto p-6 flex flex-col items-center gap-3 bg-black/50 hover:bg-yellow-500/20 text-white border border-yellow-500/30"
            >
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div className="text-center">
                <div className="font-bold">BATTLES</div>
                <div className="text-xs opacity-80">Confrontations légendaires</div>
              </div>
            </Button>

            <Button
              onClick={() => startQuiz('lyrics')}
              className="h-auto p-6 flex flex-col items-center gap-3 bg-black/50 hover:bg-yellow-500/20 text-white border border-yellow-500/30"
            >
              <Star className="w-8 h-8 text-yellow-400" />
              <div className="text-center">
                <div className="font-bold">PAROLES</div>
                <div className="text-xs opacity-80">Citations célèbres</div>
              </div>
            </Button>

            <Button
              onClick={() => startQuiz('history')}
              className="h-auto p-6 flex flex-col items-center gap-3 bg-black/50 hover:bg-yellow-500/20 text-white border border-yellow-500/30"
            >
              <Clock className="w-8 h-8 text-yellow-400" />
              <div className="text-center">
                <div className="font-bold">HISTOIRE</div>
                <div className="text-xs opacity-80">Chronologie hip-hop</div>
              </div>
            </Button>

            <Button
              onClick={() => startQuiz('artists')}
              className="h-auto p-6 flex flex-col items-center gap-3 bg-black/50 hover:bg-yellow-500/20 text-white border border-yellow-500/30"
            >
              <Target className="w-8 h-8 text-yellow-400" />
              <div className="text-center">
                <div className="font-bold">ARTISTES</div>
                <div className="text-xs opacity-80">Rappeurs légendaires</div>
              </div>
            </Button>

            {/* Quiz difficile */}
            <Button
              onClick={() => startQuiz('all', 'hard')}
              className="h-auto p-6 flex flex-col items-center gap-3 bg-red-500/20 hover:bg-red-500/30 text-white border border-red-500/50"
            >
              <Zap className="w-8 h-8 text-red-400" />
              <div className="text-center">
                <div className="font-bold">MODE EXPERT</div>
                <div className="text-xs opacity-80">Questions difficiles</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      {userStats.badges.length > 0 && (
        <Card className="hip-hop-card">
          <CardHeader className="p-6">
            <CardTitle className="text-xl street-title text-yellow-400 text-center mb-4">
              VOS BADGES ({userStats.badges.length}/{badges.length})
            </CardTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map(badge => {
                const earned = userStats.badges.includes(badge.id);
                return (
                  <div 
                    key={badge.id}
                    className={`p-4 rounded-lg text-center transition-all ${
                      earned 
                        ? 'bg-yellow-500/20 border border-yellow-500/50' 
                        : 'bg-gray-800/50 border border-gray-600/50 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className={`font-bold text-sm ${earned ? 'text-yellow-400' : 'text-gray-500'}`}>
                      {badge.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {badge.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Bouton reset (pour les tests) */}
      {userStats.totalQuizzes > 0 && (
        <div className="text-center">
          <Button
            onClick={resetStats}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-400"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser les statistiques
          </Button>
        </div>
      )}
    </div>
  );
}