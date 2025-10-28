import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star,
  Zap,
  Brain
} from "lucide-react";
import { QuizQuestion, QuizResult } from "@/data/quiz";
import { useQuiz } from "@/hooks/useQuiz";

interface QuizGameProps {
  questions: QuizQuestion[];
  onComplete: (results: QuizResult[]) => void;
  onExit: () => void;
}

export function QuizGame({ questions, onComplete, onExit }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [streak, setStreak] = useState(0);

  const { submitAnswer } = useQuiz();
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Timer pour chaque question
  useEffect(() => {
    if (showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showResult]);

  // Réinitialiser le timer pour chaque nouvelle question
  useEffect(() => {
    setTimeLeft(30);
    setQuestionStartTime(Date.now());
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentQuestionIndex]);

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      handleAnswer(null);
    }
  };

  const handleAnswer = (answer: string | number | null) => {
    const timeSpent = Date.now() - questionStartTime;
    const isCorrect = answer === currentQuestion.correctAnswer;
    const pointsEarned = isCorrect ? currentQuestion.points : 0;

    const result: QuizResult = {
      questionId: currentQuestion.id,
      userAnswer: answer || '',
      isCorrect,
      pointsEarned,
      timeSpent
    };

    // Mettre à jour la série
    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setResults(prev => [...prev, result]);
    submitAnswer(result);
    setShowResult(true);

    // Passer à la question suivante après 2 secondes
    setTimeout(() => {
      if (isLastQuestion) {
        onComplete([...results, result]);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'battles': return <Trophy className="w-4 h-4" />;
      case 'lyrics': return <Star className="w-4 h-4" />;
      case 'history': return <Clock className="w-4 h-4" />;
      case 'artists': return <Target className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header du quiz */}
      <Card className="hip-hop-card">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge className={`${getDifficultyColor(currentQuestion.difficulty)} text-white`}>
                {currentQuestion.difficulty.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                {getCategoryIcon(currentQuestion.category)}
                <span className="ml-1">{currentQuestion.category.toUpperCase()}</span>
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold">Série: {streak}</span>
              </div>
              <Button variant="ghost" onClick={onExit} className="text-gray-400 hover:text-white">
                Quitter
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-300">
              Question {currentQuestionIndex + 1} sur {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-yellow-400'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          
          <Progress 
            value={((currentQuestionIndex + 1) / questions.length) * 100} 
            className="mt-2"
          />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card className="hip-hop-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl text-yellow-400 street-title leading-tight break-words quiz-question">
            {currentQuestion.question}
          </CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-medium">{currentQuestion.points} points</span>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 pt-0">
          {currentQuestion.type === 'multiple-choice' && (
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {currentQuestion.options?.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`
                    p-3 sm:p-4 h-auto text-left justify-start transition-all min-h-[60px] w-full
                    ${showResult
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-500 hover:bg-green-500 text-white'
                        : selectedAnswer === index && index !== currentQuestion.correctAnswer
                        ? 'bg-red-500 hover:bg-red-500 text-white'
                        : 'bg-gray-600 hover:bg-gray-600 text-gray-300'
                      : selectedAnswer === index
                      ? 'bg-yellow-500 hover:bg-yellow-500 text-black'
                      : 'bg-black/50 hover:bg-yellow-500/20 text-white border border-yellow-500/30'
                    }
                  `}
                >
                  <div className="flex items-start gap-3 w-full">
                    <Badge className="bg-yellow-500 text-black font-bold w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs sm:text-sm">
                      {String.fromCharCode(65 + index)}
                    </Badge>
                    <span className="flex-1 text-sm sm:text-base leading-tight break-words hyphens-auto quiz-option">{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {['Vrai', 'Faux'].map((option, index) => (
                <Button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`
                    p-3 sm:p-4 h-auto text-center transition-all min-h-[60px]
                    ${showResult
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-500 hover:bg-green-500 text-white'
                        : selectedAnswer === index && index !== currentQuestion.correctAnswer
                        ? 'bg-red-500 hover:bg-red-500 text-white'
                        : 'bg-gray-600 hover:bg-gray-600 text-gray-300'
                      : selectedAnswer === index
                      ? 'bg-yellow-500 hover:bg-yellow-500 text-black'
                      : 'bg-black/50 hover:bg-yellow-500/20 text-white border border-yellow-500/30'
                    }
                  `}
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <span className="text-lg sm:text-2xl font-bold">{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}

          {/* Explication après réponse */}
          {showResult && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-black/30 rounded-lg border border-yellow-500/30">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full flex-shrink-0 ${
                  selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-yellow-400 mb-2 text-sm sm:text-base">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct !' : 'Incorrect'}
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed break-words hyphens-auto quiz-explanation">
                    {currentQuestion.explanation}
                  </p>
                  {selectedAnswer === currentQuestion.correctAnswer && (
                    <div className="flex items-center gap-2 mt-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">
                        +{currentQuestion.points} points
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}