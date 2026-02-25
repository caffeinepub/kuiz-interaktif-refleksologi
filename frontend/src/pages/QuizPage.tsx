import { useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useAllQuestions, useQuestionsByTopic } from '../hooks/useQueries';
import QuestionCard from '../components/QuestionCard';
import QuizSummary from '../components/QuizSummary';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Tag } from 'lucide-react';
import type { Question } from '../backend';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/quiz' }) as { topic?: string };
  const selectedTopic = search?.topic ?? null;

  const allQuestionsQuery = useAllQuestions();
  const topicQuestionsQuery = useQuestionsByTopic(selectedTopic ?? '');

  const rawQuestions: Question[] = selectedTopic
    ? (topicQuestionsQuery.data ?? [])
    : (allQuestionsQuery.data ?? []);

  const isLoading = selectedTopic ? topicQuestionsQuery.isLoading : allQuestionsQuery.isLoading;

  const [quizKey, setQuizKey] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = useMemo(() => {
    if (rawQuestions.length === 0) return [];
    return shuffleArray(rawQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawQuestions.length, quizKey]);

  const handleAnswer = useCallback((answerIndex: number) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = answerIndex;
      return updated;
    });
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setQuizFinished(true);
    }
  }, [currentIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setQuizKey((k) => k + 1);
    setCurrentIndex(0);
    setAnswers([]);
    setQuizFinished(false);
  }, []);

  const score = answers.filter(
    (ans, i) => ans !== null && ans !== undefined && questions[i] && Number(questions[i].correctAnswerIndex) === ans
  ).length;

  const progressPercent = questions.length > 0
    ? ((currentIndex + (answers[currentIndex] !== undefined ? 1 : 0)) / questions.length) * 100
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full border-b border-border bg-card shadow-xs sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: '/' })}
            className="shrink-0"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <img
            src="/assets/generated/reflexology-icon.dim_128x128.png"
            alt="Reflexology Icon"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-serif font-semibold text-base text-foreground leading-tight truncate">
              Kuiz Refleksologi
            </h1>
            {selectedTopic && (
              <div className="flex items-center gap-1">
                <Tag className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-medium truncate">{selectedTopic}</span>
              </div>
            )}
            {!selectedTopic && (
              <span className="text-xs text-muted-foreground">Kuiz Penuh</span>
            )}
          </div>
          {!quizFinished && questions.length > 0 && (
            <span className="text-xs text-muted-foreground shrink-0 font-medium">
              {Math.min(currentIndex + 1, questions.length)}/{questions.length}
            </span>
          )}
        </div>
        {!quizFinished && questions.length > 0 && (
          <div className="max-w-3xl mx-auto px-4 pb-2">
            <Progress value={progressPercent} className="h-1.5 rounded-full" />
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
          </div>
        ) : questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-muted-foreground text-lg mb-4">Tiada soalan dijumpai untuk topik ini.</p>
            <Button onClick={() => navigate({ to: '/' })}>Kembali ke Laman Utama</Button>
          </div>
        ) : quizFinished ? (
          <QuizSummary
            score={score}
            total={questions.length}
            onRestart={handleRestart}
            onHome={() => navigate({ to: '/' })}
          />
        ) : (
          <QuestionCard
            key={`${quizKey}-${currentIndex}`}
            question={questions[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentIndex] ?? null}
            onAnswer={handleAnswer}
            onNext={handleNext}
            isLast={currentIndex === questions.length - 1}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Kuiz Refleksologi. Hak cipta terpelihara.</span>
          <span className="flex items-center gap-1">
            Built with{' '}
            <span className="text-error" aria-label="love">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'kuiz-refleksologi')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
