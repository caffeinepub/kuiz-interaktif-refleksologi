import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Question } from '../backend';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  onNext: () => void;
  isLast: boolean;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
  isLast,
}: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const hasAnswered = selectedAnswer !== null;
  const correctIndex = Number(question.correctAnswerIndex);

  const getOptionStyle = (index: number) => {
    if (!hasAnswered) {
      return 'border-border bg-card hover:border-primary/50 hover:bg-accent/30 hover:shadow-xs cursor-pointer';
    }
    if (index === correctIndex) {
      return 'answer-reveal-correct cursor-default';
    }
    if (index === selectedAnswer && index !== correctIndex) {
      return 'answer-incorrect cursor-default';
    }
    return 'border-border bg-muted/40 opacity-60 cursor-default';
  };

  return (
    <div className="animate-fade-slide-in">
      {/* Topic Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/5">
          {question.topic}
        </Badge>
        <span className="text-xs text-muted-foreground">
          Soalan {questionNumber} daripada {totalQuestions}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-2xl shadow-card border border-border p-6 mb-5">
        <p className="font-serif text-lg sm:text-xl font-medium text-foreground leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-5">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            disabled={hasAnswered}
            onClick={() => !hasAnswered && onAnswer(index)}
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200',
              getOptionStyle(index)
            )}
          >
            <span
              className={cn(
                'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors',
                !hasAnswered && 'bg-muted text-muted-foreground',
                hasAnswered && index === correctIndex && 'bg-success text-success-foreground',
                hasAnswered && index === selectedAnswer && index !== correctIndex && 'bg-error text-error-foreground',
                hasAnswered && index !== correctIndex && index !== selectedAnswer && 'bg-muted/60 text-muted-foreground'
              )}
            >
              {hasAnswered && index === correctIndex ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : hasAnswered && index === selectedAnswer && index !== correctIndex ? (
                <XCircle className="w-4 h-4" />
              ) : (
                OPTION_LABELS[index]
              )}
            </span>
            <span className={cn(
              'text-sm sm:text-base font-medium flex-1',
              hasAnswered && index === correctIndex && 'text-success',
              hasAnswered && index === selectedAnswer && index !== correctIndex && 'text-error',
              hasAnswered && index !== correctIndex && index !== selectedAnswer && 'text-muted-foreground'
            )}>
              {answer}
            </span>
          </button>
        ))}
      </div>

      {/* Feedback & Explanation */}
      {hasAnswered && (
        <div className="animate-fade-in space-y-3 mb-5">
          {/* Result Banner */}
          <div className={cn(
            'flex items-center gap-3 p-4 rounded-xl border-2',
            selectedAnswer === correctIndex
              ? 'bg-success-light border-success/40'
              : 'bg-error-light border-error/40'
          )}>
            {selectedAnswer === correctIndex ? (
              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-error shrink-0" />
            )}
            <p className={cn(
              'text-sm font-semibold',
              selectedAnswer === correctIndex ? 'text-success' : 'text-error'
            )}>
              {selectedAnswer === correctIndex ? 'Betul! Tahniah! 🎉' : 'Salah. Cuba lagi lain kali!'}
            </p>
          </div>

          {/* Explanation Toggle */}
          <button
            onClick={() => setShowExplanation((v) => !v)}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {showExplanation ? 'Sembunyikan Penjelasan' : 'Lihat Penjelasan'}
          </button>

          {showExplanation && (
            <div className="animate-fade-in bg-accent/30 border border-accent/50 rounded-xl p-4">
              <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Next Button */}
      {hasAnswered && (
        <div className="animate-fade-in flex justify-end">
          <Button
            onClick={onNext}
            size="lg"
            className="gap-2 rounded-xl font-semibold"
          >
            {isLast ? (
              <>
                <Flag className="w-4 h-4" />
                Lihat Keputusan
              </>
            ) : (
              <>
                Soalan Seterusnya
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
