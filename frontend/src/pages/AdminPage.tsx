import { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useResults, useAllQuestions } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Trophy, Medal, Award, Users, RefreshCw, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Result } from '../backend';

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  } catch {
    return dateStr;
  }
}

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-4 h-4 text-chart-4" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-muted-foreground" />;
  if (rank === 3) return <Award className="w-4 h-4 text-chart-1" />;
  return null;
}

function getRankClass(rank: number) {
  if (rank === 1) return 'bg-chart-4/10 border-chart-4/20';
  if (rank === 2) return 'bg-muted/30 border-border';
  if (rank === 3) return 'bg-chart-1/10 border-chart-1/20';
  return '';
}

function getPercentageBadgeVariant(percentage: number): 'default' | 'secondary' | 'outline' | 'destructive' {
  if (percentage >= 70) return 'default';
  if (percentage >= 50) return 'secondary';
  return 'outline';
}

function getPerformanceLabel(percentage: number): string {
  if (percentage >= 90) return 'Cemerlang';
  if (percentage >= 70) return 'Bagus';
  if (percentage >= 50) return 'Boleh Ditingkatkan';
  return 'Perlu Lebih Usaha';
}

interface PrintCardProps {
  participant: Result;
}

function PrintCard({ participant }: PrintCardProps) {
  const score = Number(participant.score);
  const total = Number(participant.total);
  const percentage = Math.round(participant.percentage);
  const performanceLabel = getPerformanceLabel(participant.percentage);

  return (
    <div className="admin-print-card" style={{ display: 'none' }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #333', paddingBottom: '10pt', marginBottom: '14pt' }}>
        <h1 style={{ fontSize: '18pt', fontWeight: 'bold', margin: 0 }}>
          Keputusan Kuiz Refleksologi
        </h1>
        <p style={{ fontSize: '10pt', color: '#555', marginTop: '4pt' }}>
          Tarikh Cetak: {new Date().toLocaleDateString('ms-MY')}
        </p>
      </div>

      {/* Participant Info */}
      <div style={{ border: '1.5px solid #555', borderRadius: '4pt', padding: '10pt 12pt', marginBottom: '14pt', background: '#f5f5f5' }}>
        <h2 style={{ fontSize: '13pt', fontWeight: 'bold', marginBottom: '8pt', marginTop: 0 }}>
          Maklumat Peserta
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11pt' }}>
          <tbody>
            <tr>
              <td style={{ padding: '3pt 0', fontWeight: 'bold', width: '120pt' }}>Nama</td>
              <td style={{ padding: '3pt 0' }}>: {participant.name}</td>
            </tr>
            <tr>
              <td style={{ padding: '3pt 0', fontWeight: 'bold' }}>Tarikh</td>
              <td style={{ padding: '3pt 0' }}>: {formatDate(participant.date)}</td>
            </tr>
            <tr>
              <td style={{ padding: '3pt 0', fontWeight: 'bold' }}>Topik</td>
              <td style={{ padding: '3pt 0' }}>: {participant.topic}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Score Summary */}
      <div style={{ border: '1px solid #ccc', borderRadius: '4pt', padding: '10pt 12pt', marginBottom: '14pt', background: '#fafafa' }}>
        <h2 style={{ fontSize: '13pt', fontWeight: 'bold', marginBottom: '8pt', marginTop: 0 }}>
          Keputusan: {performanceLabel}
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11pt', textAlign: 'center' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4pt', border: '1px solid #ccc', fontWeight: 'bold', fontSize: '16pt', color: '#2a7a2a' }}>{score}</td>
              <td style={{ padding: '4pt', border: '1px solid #ccc', fontWeight: 'bold', fontSize: '16pt', color: '#b22222' }}>{total - score}</td>
              <td style={{ padding: '4pt', border: '1px solid #ccc', fontWeight: 'bold', fontSize: '16pt' }}>{total}</td>
            </tr>
            <tr>
              <td style={{ padding: '3pt', border: '1px solid #ccc', fontSize: '9pt', color: '#555' }}>Betul</td>
              <td style={{ padding: '3pt', border: '1px solid #ccc', fontSize: '9pt', color: '#555' }}>Salah</td>
              <td style={{ padding: '3pt', border: '1px solid #ccc', fontSize: '9pt', color: '#555' }}>Jumlah</td>
            </tr>
          </tbody>
        </table>
        <p style={{ textAlign: 'center', marginTop: '8pt', fontSize: '12pt', fontWeight: 'bold' }}>
          Markah: {score}/{total} &nbsp;({percentage}% Betul)
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { data: results, isLoading, error, refetch, isFetching } = useResults();
  const { data: allQuestions } = useAllQuestions();
  const [selectedParticipant, setSelectedParticipant] = useState<Result | null>(null);
  const printCardRef = useRef<HTMLDivElement>(null);

  const handlePrint = (participant: Result) => {
    setSelectedParticipant(participant);
    setTimeout(() => {
      window.print();
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full border-b border-border bg-card shadow-xs sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
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
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-serif font-semibold text-base text-foreground leading-tight">
              Panel Admin
            </h1>
            <p className="text-xs text-muted-foreground">Papan Kedudukan Peserta</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => refetch()}
            disabled={isFetching}
            aria-label="Refresh results"
            className="shrink-0"
          >
            <RefreshCw className={cn('w-4 h-4', isFetching && 'animate-spin')} />
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        {/* Stats Summary */}
        {!isLoading && results && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl border border-border p-4 text-center shadow-xs">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold font-serif text-foreground">{results.length}</p>
              <p className="text-xs text-muted-foreground">Peserta</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 text-center shadow-xs">
              <Trophy className="w-5 h-5 text-chart-4 mx-auto mb-1" />
              <p className="text-2xl font-bold font-serif text-foreground">
                {Math.round(results[0]?.percentage ?? 0)}%
              </p>
              <p className="text-xs text-muted-foreground">Markah Tertinggi</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 text-center shadow-xs">
              <Award className="w-5 h-5 text-success mx-auto mb-1" />
              <p className="text-2xl font-bold font-serif text-foreground">
                {Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)}%
              </p>
              <p className="text-xs text-muted-foreground">Purata Markah</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 text-center shadow-xs">
              <Medal className="w-5 h-5 text-chart-1 mx-auto mb-1" />
              <p className="text-2xl font-bold font-serif text-foreground">
                {results.filter(r => r.percentage >= 70).length}
              </p>
              <p className="text-xs text-muted-foreground">Lulus (≥70%)</p>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="font-serif font-semibold text-lg text-foreground">
            Senarai Kedudukan
          </h2>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-error text-base mb-3">Ralat semasa memuatkan data.</p>
            <Button variant="outline" onClick={() => refetch()}>Cuba Semula</Button>
          </div>
        ) : !results || results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border border-border shadow-xs">
            <Users className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-base font-medium mb-1">Tiada keputusan lagi</p>
            <p className="text-muted-foreground text-sm">
              Keputusan akan muncul di sini setelah peserta menjawab kuiz.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-16 text-center font-semibold text-xs">Kedudukan</TableHead>
                  <TableHead className="font-semibold text-xs">Nama</TableHead>
                  <TableHead className="font-semibold text-xs hidden sm:table-cell">Tarikh</TableHead>
                  <TableHead className="font-semibold text-xs hidden md:table-cell">Topik</TableHead>
                  <TableHead className="font-semibold text-xs text-center">Markah</TableHead>
                  <TableHead className="font-semibold text-xs text-center">Peratus</TableHead>
                  <TableHead className="font-semibold text-xs text-center w-20">Cetak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => {
                  const rank = index + 1;
                  return (
                    <TableRow
                      key={index}
                      className={cn(
                        'transition-colors',
                        rank <= 3 && getRankClass(rank)
                      )}
                    >
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {getRankIcon(rank)}
                          <span className={cn(
                            'font-bold text-sm',
                            rank === 1 && 'text-chart-4',
                            rank === 2 && 'text-muted-foreground',
                            rank === 3 && 'text-chart-1',
                            rank > 3 && 'text-muted-foreground'
                          )}>
                            {rank}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-sm text-foreground">
                          {result.name}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {formatDate(result.date)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/5 font-normal">
                          {result.topic}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-sm text-foreground">
                          {Number(result.score)}/{Number(result.total)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={getPercentageBadgeVariant(result.percentage)}
                          className="text-xs font-semibold"
                        >
                          {Math.round(result.percentage)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePrint(result)}
                          className="gap-1 text-xs text-primary hover:text-primary hover:bg-primary/10 px-2"
                          aria-label={`Cetak keputusan ${result.name}`}
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Cetak</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Hidden Print Card — only visible during print */}
      <div ref={printCardRef} aria-hidden="true">
        {selectedParticipant && (
          <PrintCard participant={selectedParticipant} />
        )}
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
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
