export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'complete-lyrics' | 'chronology';
  category: 'battles' | 'lyrics' | 'history' | 'artists';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
  battleId?: string;
}

export interface QuizResult {
  questionId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  pointsEarned: number;
  timeSpent: number;
}

export interface UserQuizStats {
  totalQuizzes: number;
  totalPoints: number;
  correctAnswers: number;
  totalAnswers: number;
  badges: string[];
  bestStreak: number;
  averageTime: number;
}

export const quizQuestions: QuizQuestion[] = [
  // Questions sur les battles célèbres
  {
    id: 'battle_1',
    type: 'multiple-choice',
    category: 'battles',
    difficulty: 'easy',
    question: 'Quelle battle est considérée comme l\'une des plus légendaires du hip-hop ?',
    options: ['Nas vs Jay-Z', 'Eminem vs Vanilla Ice', 'Drake vs Kendrick', '50 Cent vs Eminem'],
    correctAnswer: 0,
    explanation: 'La battle entre Nas et Jay-Z est légendaire, notamment avec le diss track "Ether" de Nas.',
    points: 10,
    battleId: 'nas-jay-z'
  },
  {
    id: 'battle_2',
    type: 'multiple-choice',
    category: 'battles',
    difficulty: 'medium',
    question: 'Quel diss track d\'Ice Cube contre N.W.A est considéré comme l\'un des plus brutaux ?',
    options: ['Straight Outta Compton', 'No Vaseline', 'Boyz-n-the-Hood', 'Express Yourself'],
    correctAnswer: 1,
    explanation: '"No Vaseline" est considéré comme l\'un des diss tracks les plus brutaux de l\'histoire du hip-hop.',
    points: 15,
    battleId: 'ice-cube-nwa'
  },
  {
    id: 'battle_3',
    type: 'true-false',
    category: 'history',
    difficulty: 'easy',
    question: 'La battle entre 2Pac et Biggie a contribué à la rivalité East Coast vs West Coast.',
    correctAnswer: 1,
    explanation: 'Vrai. Cette battle a intensifié la rivalité entre les côtes Est et Ouest dans les années 90.',
    points: 10,
    battleId: 'tupac-biggie'
  },
  {
    id: 'lyrics_1',
    type: 'multiple-choice',
    category: 'lyrics',
    difficulty: 'hard',
    question: 'Complétez cette ligne célèbre de "Ether" par Nas : "You a fan, a phony, a fake, a pussy, a Stan..."',
    options: ['I still whip your ass', 'You\'re not a killer', 'I embarrass you', 'You\'re just a wannabe'],
    correctAnswer: 0,
    explanation: 'La ligne complète est "You a fan, a phony, a fake, a pussy, a Stan / I still whip your ass"',
    points: 20,
    battleId: 'nas-jay-z'
  },
  {
    id: 'battle_4',
    type: 'multiple-choice',
    category: 'battles',
    difficulty: 'medium',
    question: 'Quel rappeur a détruit Machine Gun Kelly avec "Killshot" ?',
    options: ['Drake', 'Kendrick Lamar', 'Eminem', '50 Cent'],
    correctAnswer: 2,
    explanation: 'Eminem a répondu à MGK avec "Killshot", considéré comme un KO technique.',
    points: 15,
    battleId: 'eminem-mgk'
  },
  {
    id: 'battle_5',
    type: 'true-false',
    category: 'history',
    difficulty: 'medium',
    question: 'Drake a gagné sa battle contre Pusha T selon la majorité des critiques.',
    correctAnswer: 0,
    explanation: 'Faux. "The Story of Adidon" de Pusha T est généralement considéré comme ayant mis fin à cette battle.',
    points: 15,
    battleId: 'drake-pusha-t'
  },
  {
    id: 'artists_1',
    type: 'multiple-choice',
    category: 'artists',
    difficulty: 'easy',
    question: 'Quel rappeur est surnommé "The King of New York" ?',
    options: ['Jay-Z', 'Nas', 'The Notorious B.I.G.', 'Tous les trois'],
    correctAnswer: 3,
    explanation: 'Les trois rappeurs ont tous revendiqué ce titre à différentes époques.',
    points: 10
  },
  {
    id: 'chronology_1',
    type: 'multiple-choice',
    category: 'history',
    difficulty: 'hard',
    question: 'Dans quel ordre chronologique ces battles ont-elles eu lieu ?',
    options: [
      'Ice Cube vs N.W.A → 2Pac vs Biggie → Nas vs Jay-Z → Drake vs Pusha T',
      'Nas vs Jay-Z → Ice Cube vs N.W.A → 2Pac vs Biggie → Drake vs Pusha T',
      '2Pac vs Biggie → Ice Cube vs N.W.A → Nas vs Jay-Z → Drake vs Pusha T',
      'Drake vs Pusha T → Nas vs Jay-Z → Ice Cube vs N.W.A → 2Pac vs Biggie'
    ],
    correctAnswer: 0,
    explanation: 'L\'ordre correct : Ice Cube vs N.W.A (1991) → 2Pac vs Biggie (1994-1997) → Nas vs Jay-Z (2001) → Drake vs Pusha T (2018)',
    points: 25
  },
  {
    id: 'lyrics_2',
    type: 'multiple-choice',
    category: 'lyrics',
    difficulty: 'medium',
    question: 'Qui a rappé : "I got the story of Adidon" ?',
    options: ['Drake', 'Pusha T', 'Kendrick Lamar', 'J. Cole'],
    correctAnswer: 1,
    explanation: 'Pusha T dans son diss track "The Story of Adidon" contre Drake.',
    points: 15,
    battleId: 'drake-pusha-t'
  },
  {
    id: 'battle_6',
    type: 'true-false',
    category: 'battles',
    difficulty: 'easy',
    question: 'Eminem n\'a jamais perdu une battle de diss tracks.',
    correctAnswer: 0,
    explanation: 'Faux. Bien qu\'Eminem soit redoutable, il a eu quelques échanges où l\'opinion était partagée.',
    points: 10
  },
  {
    id: 'culture_1',
    type: 'multiple-choice',
    category: 'history',
    difficulty: 'medium',
    question: 'Quel élément n\'est PAS typique d\'un bon diss track ?',
    options: ['Attaques personnelles', 'Jeux de mots cleveres', 'Collaboration amicale', 'Références culturelles'],
    correctAnswer: 2,
    explanation: 'La collaboration amicale va à l\'encontre de l\'esprit compétitif du diss track.',
    points: 15
  },
  {
    id: 'battle_7',
    type: 'multiple-choice',
    category: 'battles',
    difficulty: 'hard',
    question: 'Quel diss track de 50 Cent contre Ja Rule contenait des enregistrements compromettants ?',
    options: ['Back Down', 'Wanksta', 'Many Men', 'How to Rob'],
    correctAnswer: 0,
    explanation: '"Back Down" contenait des enregistrements où Ja Rule semblait supplier 50 Cent.',
    points: 20,
    battleId: '50-cent-ja-rule'
  },

  // NOUVELLES QUESTIONS BASÉES SUR LES NOUVELLES BATTLES
  {
    id: 'battle_8',
    type: 'multiple-choice',
    category: 'battles',
    difficulty: 'easy',
    question: 'Quelle battle de 2024 a dominé les réseaux sociaux et les charts ?',
    options: ['Drake vs Pusha T', 'Kendrick Lamar vs Drake', 'Eminem vs MGK', 'Jay-Z vs Nas'],
    correctAnswer: 1,
    explanation: 'La battle Kendrick Lamar vs Drake en 2024 a été la plus médiatisée avec "Not Like Us" et "Meet the Grahams".',
    points: 10,
    battleId: 'kendrick-drake-2024'
  },
  {
    id: 'battle_9',
    type: 'multiple-choice',
    category: 'battles',
    difficulty: 'medium',
    question: 'Quel magazine hip-hop était au centre de la battle Benzino vs Eminem ?',
    options: ['XXL', 'The Source', 'Vibe', 'Hip Hop Weekly'],
    correctAnswer: 1,
    explanation: 'Benzino était propriétaire de The Source magazine, ce qui a alimenté le conflit avec Eminem.',
    points: 15,
    battleId: 'benzino-eminem'
  },
  {
    id: 'battle_10',
    type: 'true-false',
    category: 'history',
    difficulty: 'medium',
    question: 'The Game a sorti un diss track de 15 minutes contre 50 Cent.',
    correctAnswer: 1,
    explanation: 'Vrai. "300 Bars and Runnin\'" était un diss track marathon de 15 minutes.',
    points: 15,
    battleId: 'the-game-50-cent'
  },
  {
    id: 'lyrics_3',
    type: 'multiple-choice',
    category: 'lyrics',
    difficulty: 'hard',
    question: 'Quel diss track de Kendrick Lamar contre Drake contient des révélations personnelles explosives ?',
    options: ['Not Like Us', 'Meet the Grahams', 'Euphoria', 'Like That'],
    correctAnswer: 1,
    explanation: '"Meet the Grahams" était le diss track le plus personnel et brutal de Kendrick contre Drake.',
    points: 20,
    battleId: 'kendrick-drake-2024'
  },
  {
    id: 'battle_11',
    type: 'multiple-choice',
    category: 'battles',
    difficulty: 'medium',
    question: 'Quelle battle était centrée sur le titre de "King of the South" ?',
    options: ['OutKast vs UGK', 'T.I. vs Lil\' Flip', 'Lil Wayne vs Juvenile', 'Master P vs Cash Money'],
    correctAnswer: 1,
    explanation: 'T.I. et Lil\' Flip se sont battus pour le titre de "King of the South" en 2004.',
    points: 15,
    battleId: 'ti-lil-flip'
  },
  {
    id: 'battle_12',
    type: 'true-false',
    category: 'history',
    difficulty: 'easy',
    question: 'Pusha T a eu un beef avec Lil Wayne avant sa battle contre Drake.',
    correctAnswer: 1,
    explanation: 'Vrai. Pusha T avait déjà un conflit avec Lil Wayne et Cash Money avant de s\'attaquer à Drake.',
    points: 10,
    battleId: 'pusha-t-lil-wayne'
  },
  {
    id: 'artists_2',
    type: 'multiple-choice',
    category: 'artists',
    difficulty: 'medium',
    question: 'Quel groupe était dirigé par Ice Cube dans sa battle contre Cypress Hill ?',
    options: ['N.W.A', 'Westside Connection', 'Da Lench Mob', 'Above the Law'],
    correctAnswer: 1,
    explanation: 'Westside Connection (Ice Cube, WC, Mack 10) s\'est opposé à Cypress Hill.',
    points: 15,
    battleId: 'westside-connection-cypress-hill'
  },
  {
    id: 'battle_13',
    type: 'multiple-choice',
    category: 'battles',
    difficulty: 'hard',
    question: 'Quel rappeur de Detroit a eu un beef avec D12 après avoir été l\'ancien partenaire d\'Eminem ?',
    options: ['Proof', 'Royce da 5\'9"', 'Bizarre', 'Kuniva'],
    correctAnswer: 1,
    explanation: 'Royce da 5\'9" était l\'ancien partenaire d\'Eminem avant D12 et a eu un conflit avec le groupe.',
    points: 20,
    battleId: 'royce-d12'
  },
  {
    id: 'lyrics_4',
    type: 'multiple-choice',
    category: 'lyrics',
    difficulty: 'medium',
    question: 'Quel diss track d\'Eminem a "mis le clou dans le cercueil" de Benzino ?',
    options: ['The Sauce', 'Nail in the Coffin', 'Bully', 'Go to Sleep'],
    correctAnswer: 1,
    explanation: '"Nail in the Coffin" (littéralement "clou dans le cercueil") a effectivement terminé la carrière de Benzino.',
    points: 15,
    battleId: 'benzino-eminem'
  },
  {
    id: 'battle_14',
    type: 'true-false',
    category: 'battles',
    difficulty: 'easy',
    question: 'Fat Joe s\'est impliqué dans le beef 50 Cent vs Ja Rule pour défendre son ami.',
    correctAnswer: 1,
    explanation: 'Vrai. Fat Joe a défendu Ja Rule dans son conflit contre 50 Cent, étendant ainsi la battle.',
    points: 10,
    battleId: 'fat-joe-50-cent'
  },
  {
    id: 'chronology_2',
    type: 'multiple-choice',
    category: 'history',
    difficulty: 'hard',
    question: 'Dans quel ordre chronologique ces battles récentes ont-elles eu lieu ?',
    options: [
      'The Game vs 50 Cent → Pusha T vs Lil Wayne → Drake vs Pusha T → Kendrick vs Drake',
      'Pusha T vs Lil Wayne → The Game vs 50 Cent → Drake vs Pusha T → Kendrick vs Drake',
      'Drake vs Pusha T → The Game vs 50 Cent → Pusha T vs Lil Wayne → Kendrick vs Drake',
      'Kendrick vs Drake → Drake vs Pusha T → The Game vs 50 Cent → Pusha T vs Lil Wayne'
    ],
    correctAnswer: 0,
    explanation: 'L\'ordre correct : The Game vs 50 Cent (2005) → Pusha T vs Lil Wayne (2012) → Drake vs Pusha T (2018) → Kendrick vs Drake (2024)',
    points: 25
  }
];

export const badges = [
  {
    id: 'first_quiz',
    name: 'Premier Quiz',
    description: 'Complétez votre premier quiz',
    icon: '🎯',
    requirement: 'Complete 1 quiz'
  },
  {
    id: 'battle_expert',
    name: 'Expert des Battles',
    description: 'Répondez correctement à 10 questions sur les battles',
    icon: '🏆',
    requirement: '10 correct battle questions'
  },
  {
    id: 'lyrics_master',
    name: 'Maître des Paroles',
    description: 'Répondez correctement à 5 questions sur les paroles',
    icon: '🎤',
    requirement: '5 correct lyrics questions'
  },
  {
    id: 'speed_demon',
    name: 'Démon de Vitesse',
    description: 'Répondez à une question en moins de 5 secondes',
    icon: '⚡',
    requirement: 'Answer in under 5 seconds'
  },
  {
    id: 'perfect_score',
    name: 'Score Parfait',
    description: 'Obtenez 100% à un quiz',
    icon: '💎',
    requirement: 'Perfect quiz score'
  },
  {
    id: 'streak_master',
    name: 'Série Parfaite',
    description: 'Répondez correctement à 5 questions d\'affilée',
    icon: '🔥',
    requirement: '5 question streak'
  },
  {
    id: 'hip_hop_scholar',
    name: 'Érudit Hip-Hop',
    description: 'Accumulez 500 points au total',
    icon: '📚',
    requirement: '500 total points'
  },
  {
    id: 'quiz_addict',
    name: 'Accro aux Quiz',
    description: 'Complétez 10 quiz',
    icon: '🎮',
    requirement: 'Complete 10 quizzes'
  }
];