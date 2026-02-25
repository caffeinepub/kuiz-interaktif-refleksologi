import { Trophy, RotateCcw, Home, Star, TrendingUp, AlertCircle, CheckCircle2, XCircle, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Question } from '../backend';

interface QuizSummaryProps {
  score: number;
  total: number;
  onRestart: () => void;
  onHome: () => void;
  participantName: string;
  participantDate: string;
  topic: string | null;
  questions: Question[];
  userAnswers: (number | null)[];
}

function getPerformance(percentage: number) {
  if (percentage >= 90) {
    return {
      label: 'Cemerlang!',
      message: 'Luar biasa! Anda menguasai topik ini dengan sangat baik.',
      icon: Trophy,
      colorClass: 'text-success',
      bgClass: 'bg-success-light border-success/30',
      stars: 3,
    };
  } else if (percentage >= 70) {
    return {
      label: 'Bagus!',
      message: 'Prestasi yang baik! Teruskan usaha untuk mencapai yang lebih tinggi.',
      icon: TrendingUp,
      colorClass: 'text-primary',
      bgClass: 'bg-primary/10 border-primary/20',
      stars: 2,
    };
  } else if (percentage >= 50) {
    return {
      label: 'Boleh Ditingkatkan',
      message: 'Anda berada di landasan yang betul. Ulang kaji dan cuba lagi!',
      icon: Star,
      colorClass: 'text-chart-1',
      bgClass: 'bg-chart-1/10 border-chart-1/20',
      stars: 1,
    };
  } else {
    return {
      label: 'Perlu Lebih Usaha',
      message: 'Jangan putus asa! Baca semula nota dan cuba lagi.',
      icon: AlertCircle,
      colorClass: 'text-error',
      bgClass: 'bg-error-light border-error/30',
      stars: 0,
    };
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  } catch {
    return dateStr;
  }
}

export default function QuizSummary({
  score,
  total,
  onRestart,
  onHome,
  participantName,
  participantDate,
  topic,
  questions,
  userAnswers,
}: QuizSummaryProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const performance = getPerformance(percentage);
  const Icon = performance.icon;

  return (
    <div className="animate-scale-in flex flex-col items-center text-center max-w-lg mx-auto py-4">

      {/* Participant Info */}
      <div className="w-full bg-card rounded-2xl border border-border shadow-xs p-4 mb-6 text-left">
        <h3 className="font-serif font-semibold text-base text-foreground mb-3 text-center">
          Maklumat Peserta
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Nama</p>
              <p className="text-sm font-semibold text-foreground">{participantName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Tarikh</p>
              <p className="text-sm font-semibold text-foreground">{formatDate(participantDate)}</p>
            </div>
          </div>
        </div>
        {topic && (
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Topik: <span className="font-semibold text-primary">{topic}</span>
            </p>
          </div>
        )}
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[0, 1, 2].map((i) => (
          <Star
            key={i}
            className={cn(
              'w-8 h-8 transition-all',
              i < performance.stars
                ? 'text-chart-4 fill-chart-4'
                : 'text-muted-foreground/30 fill-muted/20'
            )}
          />
        ))}
      </div>

      {/* Score Circle */}
      <div className={cn(
        'relative w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center mb-6 shadow-card',
        performance.bgClass
      )}>
        <Icon className={cn('w-7 h-7 mb-1', performance.colorClass)} />
        <span className={cn('text-4xl font-bold font-serif', performance.colorClass)}>
          {score}
        </span>
        <span className="text-xs text-muted-foreground font-medium">daripada {total}</span>
      </div>

      {/* Performance Label */}
      <h2 className="font-serif text-2xl font-bold text-foreground mb-1">
        {performance.label}
      </h2>
      <p className="text-muted-foreground text-sm mb-2 max-w-xs">
        {performance.message}
      </p>

      {/* Percentage Badge */}
      <div className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-6',
        performance.bgClass,
        performance.colorClass
      )}>
        <span>{percentage}% Betul</span>
        <span className="text-muted-foreground font-normal">({score}/{total} soalan)</span>
      </div>

      {/* Score Breakdown */}
      <div className="w-full bg-card rounded-2xl border border-border shadow-xs p-5 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold font-serif text-success">{score}</p>
            <p className="text-xs text-muted-foreground mt-1">Betul</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-serif text-error">{total - score}</p>
            <p className="text-xs text-muted-foreground mt-1">Salah</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-serif text-foreground">{total}</p>
            <p className="text-xs text-muted-foreground mt-1">Jumlah</p>
          </div>
        </div>
      </div>

      {/* Question Breakdown Table */}
      {questions.length > 0 && (
        <div className="w-full mb-6">
          <h3 className="font-serif font-semibold text-base text-foreground mb-3 text-left">
            Pecahan Soalan
          </h3>
          <div className="w-full overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground w-8">#</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Soalan</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Jawapan Anda</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Jawapan Betul</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-muted-foreground w-20">Status</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, i) => {
                  const userAns = userAnswers[i];
                  const correctIdx = Number(q.correctAnswerIndex);
                  const isCorrect = userAns !== null && userAns !== undefined && userAns === correctIdx;
                  const userAnswerText = userAns !== null && userAns !== undefined ? q.answers[userAns] : '—';
                  const correctAnswerText = q.answers[correctIdx];

                  return (
                    <tr
                      key={i}
                      className={cn(
                        'border-b border-border last:border-0',
                        isCorrect ? 'bg-success-light/30' : 'bg-error-light/20'
                      )}
                    >
                      <td className="px-3 py-2 text-xs text-muted-foreground font-medium">{i + 1}</td>
                      <td className="px-3 py-2 text-xs text-foreground leading-snug max-w-[180px]">
                        <span className="line-clamp-2">{q.text}</span>
                      </td>
                      <td className="px-3 py-2 text-xs hidden sm:table-cell">
                        <span className={cn(isCorrect ? 'text-success' : 'text-error')}>
                          {userAnswerText}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs text-success hidden sm:table-cell">
                        {correctAnswerText}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className={cn(
                          'inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full',
                          isCorrect
                            ? 'bg-success-light text-success'
                            : 'bg-error-light text-error'
                        )}>
                          {isCorrect ? (
                            <><CheckCircle2 className="w-3 h-3" /><span className="hidden sm:inline">Betul</span></>
                          ) : (
                            <><XCircle className="w-3 h-3" /><span className="hidden sm:inline">Salah</span></>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button
          onClick={onRestart}
          size="lg"
          className="flex-1 gap-2 rounded-xl font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          Cuba Lagi
        </Button>
        <Button
          onClick={onHome}
          variant="outline"
          size="lg"
          className="flex-1 gap-2 rounded-xl font-semibold"
        >
          <Home className="w-4 h-4" />
          Laman Utama
        </Button>
      </div>
    </div>
  );
}
