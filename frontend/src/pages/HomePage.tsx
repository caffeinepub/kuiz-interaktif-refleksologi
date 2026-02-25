import { useNavigate } from '@tanstack/react-router';
import { useAllQuestions } from '../hooks/useQueries';
import TopicSelector from '../components/TopicSelector';
import { Skeleton } from '@/components/ui/skeleton';
import { Hand, Sparkles, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: questions, isLoading } = useAllQuestions();

  const topics = questions
    ? Array.from(new Set(questions.map((q) => q.topic))).sort()
    : [];

  const handleSelectTopic = (topic: string | null) => {
    navigate({ to: '/quiz', search: topic ? { topic } : {} });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full border-b border-border bg-card shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <img
            src="/assets/generated/reflexology-icon.dim_128x128.png"
            alt="Reflexology Icon"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="font-serif font-semibold text-lg text-foreground leading-tight">
              Kuiz Refleksologi
            </h1>
            <p className="text-xs text-muted-foreground">Tangan, Kaki & Telinga</p>
          </div>
          <button
            onClick={() => navigate({ to: '/admin' })}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/20"
            aria-label="Admin Panel"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="w-full">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-4">
          <div className="relative rounded-2xl overflow-hidden shadow-card">
            <img
              src="/assets/generated/reflexology-hero.dim_1200x400.png"
              alt="Reflexology Hero"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/20 to-transparent flex items-center px-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                    Kuiz Interaktif
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight max-w-xs">
                  Uji Pengetahuan Refleksologi Anda
                </h2>
                <p className="text-white/75 text-sm mt-2 max-w-xs">
                  Pilih topik atau ambil kuiz penuh untuk menguji pemahaman anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Hand className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg text-foreground">Pilih Topik</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Pilih satu topik untuk fokus, atau ambil <strong>Kuiz Penuh</strong> yang merangkumi semua soalan.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : (
          <TopicSelector
            topics={topics}
            questionCounts={
              topics.reduce((acc, topic) => {
                acc[topic] = questions?.filter((q) => q.topic === topic).length ?? 0;
                return acc;
              }, {} as Record<string, number>)
            }
            totalCount={questions?.length ?? 0}
            onSelect={handleSelectTopic}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Kuiz Refleksologi. Hak cipta terpelihara.</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: '/admin' })}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <ShieldCheck className="w-3 h-3" />
              Panel Admin
            </button>
            <span>·</span>
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
        </div>
      </footer>
    </div>
  );
}
