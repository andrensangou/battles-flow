import { useState, useEffect } from 'react';
import { QuizResult, UserQuizStats, badges } from '@/data/quiz';

const QUIZ_STORAGE_KEY = 'hip_hop_quiz_stats';

export function useQuiz() {
  const [userStats, setUserStats] = useState<UserQuizStats>({
    totalQuizzes: 0,
    totalPoints: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    badges: [],
    bestStreak: 0,
    averageTime: 0
  });

  const [currentStreak, setCurrentStreak] = useState(0);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);

  // Charger les stats depuis localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (savedStats) {
      try {
        const stats = JSON.parse(savedStats);
        setUserStats(stats.userStats || userStats);
        setQuizHistory(stats.quizHistory || []);
      } catch (error) {
        console.error('Erreur lors du chargement des stats quiz:', error);
      }
    }
  }, []);

  // Sauvegarder les stats
  const saveStats = (newStats: UserQuizStats, newHistory: QuizResult[]) => {
    const data = {
      userStats: newStats,
      quizHistory: newHistory
    };
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(data));
    setUserStats(newStats);
    setQuizHistory(newHistory);
  };

  // Soumettre une réponse
  const submitAnswer = (result: QuizResult) => {
    const newHistory = [...quizHistory, result];
    const newStats = { ...userStats };

    // Mettre à jour les stats
    newStats.totalAnswers++;
    if (result.isCorrect) {
      newStats.correctAnswers++;
      newStats.totalPoints += result.pointsEarned;
      setCurrentStreak(prev => prev + 1);
    } else {
      setCurrentStreak(0);
    }

    // Mettre à jour la meilleure série
    if (currentStreak > newStats.bestStreak) {
      newStats.bestStreak = currentStreak;
    }

    // Vérifier les nouveaux badges
    const newBadges = checkForNewBadges(newStats, newHistory, result);
    newStats.badges = [...new Set([...newStats.badges, ...newBadges])];

    saveStats(newStats, newHistory);
    return newBadges;
  };

  // Terminer un quiz
  const completeQuiz = (results: QuizResult[]) => {
    const newStats = { ...userStats };
    newStats.totalQuizzes++;

    // Calculer le temps moyen
    const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);
    const avgTime = totalTime / results.length;
    newStats.averageTime = (newStats.averageTime * (newStats.totalQuizzes - 1) + avgTime) / newStats.totalQuizzes;

    // Vérifier les badges de fin de quiz
    const newBadges = checkForQuizBadges(newStats, results);
    newStats.badges = [...new Set([...newStats.badges, ...newBadges])];

    saveStats(newStats, quizHistory);
    return newBadges;
  };

  // Vérifier les nouveaux badges
  const checkForNewBadges = (stats: UserQuizStats, history: QuizResult[], lastResult: QuizResult): string[] => {
    const newBadges: string[] = [];

    // Premier quiz
    if (stats.totalAnswers === 1 && !stats.badges.includes('first_quiz')) {
      newBadges.push('first_quiz');
    }

    // Expert des battles
    const battleCorrect = history.filter(r => r.isCorrect && r.questionId.includes('battle')).length;
    if (battleCorrect >= 10 && !stats.badges.includes('battle_expert')) {
      newBadges.push('battle_expert');
    }

    // Maître des paroles
    const lyricsCorrect = history.filter(r => r.isCorrect && r.questionId.includes('lyrics')).length;
    if (lyricsCorrect >= 5 && !stats.badges.includes('lyrics_master')) {
      newBadges.push('lyrics_master');
    }

    // Démon de vitesse
    if (lastResult.timeSpent < 5000 && lastResult.isCorrect && !stats.badges.includes('speed_demon')) {
      newBadges.push('speed_demon');
    }

    // Série parfaite
    if (currentStreak >= 5 && !stats.badges.includes('streak_master')) {
      newBadges.push('streak_master');
    }

    // Érudit Hip-Hop
    if (stats.totalPoints >= 500 && !stats.badges.includes('hip_hop_scholar')) {
      newBadges.push('hip_hop_scholar');
    }

    return newBadges;
  };

  // Vérifier les badges de fin de quiz
  const checkForQuizBadges = (stats: UserQuizStats, results: QuizResult[]): string[] => {
    const newBadges: string[] = [];

    // Score parfait
    const allCorrect = results.every(r => r.isCorrect);
    if (allCorrect && !stats.badges.includes('perfect_score')) {
      newBadges.push('perfect_score');
    }

    // Accro aux quiz
    if (stats.totalQuizzes >= 10 && !stats.badges.includes('quiz_addict')) {
      newBadges.push('quiz_addict');
    }

    return newBadges;
  };

  // Obtenir le niveau de l'utilisateur
  const getUserLevel = () => {
    const points = userStats.totalPoints;
    if (points < 100) return { level: 1, name: 'Rookie', nextLevel: 100 };
    if (points < 250) return { level: 2, name: 'Amateur', nextLevel: 250 };
    if (points < 500) return { level: 3, name: 'Connaisseur', nextLevel: 500 };
    if (points < 1000) return { level: 4, name: 'Expert', nextLevel: 1000 };
    if (points < 2000) return { level: 5, name: 'Maître', nextLevel: 2000 };
    return { level: 6, name: 'Légende', nextLevel: null };
  };

  // Obtenir le pourcentage de réussite
  const getSuccessRate = () => {
    if (userStats.totalAnswers === 0) return 0;
    return Math.round((userStats.correctAnswers / userStats.totalAnswers) * 100);
  };

  // Réinitialiser les stats
  const resetStats = () => {
    const emptyStats: UserQuizStats = {
      totalQuizzes: 0,
      totalPoints: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      badges: [],
      bestStreak: 0,
      averageTime: 0
    };
    saveStats(emptyStats, []);
    setCurrentStreak(0);
  };

  return {
    userStats,
    currentStreak,
    quizHistory,
    submitAnswer,
    completeQuiz,
    getUserLevel,
    getSuccessRate,
    resetStats
  };
}