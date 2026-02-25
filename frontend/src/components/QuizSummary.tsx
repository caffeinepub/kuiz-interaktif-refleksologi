import { Trophy, RotateCcw, Home, Star, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizSummaryProps {
  score: number;
  total: number;
  onRestart: () => void;
  onHome: () => void;
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

export default function QuizSummary({ score, total, onRestart, onHome }: QuizSummaryProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const performance = getPerformance(percentage);
  const Icon = performance.icon;

  return (
    <div className="animate-scale-in flex flex-col items-center text-center max-w-lg mx-auto py-4">
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
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-8',
        performance.bgClass,
        performance.colorClass
      )}>
        <span>{percentage}% Betul</span>
        <span className="text-muted-foreground font-normal">({score}/{total} soalan)</span>
      </div>

      {/* Score Breakdown */}
      <div className="w-full bg-card rounded-2xl border border-border shadow-xs p-5 mb-8">
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
