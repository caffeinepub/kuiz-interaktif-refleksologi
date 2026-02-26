import { BookOpen, Layers, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TopicSelectorProps {
  topics: string[];
  questionCounts: Record<string, number>;
  totalCount: number;
  onSelect: (topic: string | null) => void;
}

const TOPIC_COLORS = [
  'from-primary/10 to-accent/30 border-primary/20 hover:border-primary/50',
  'from-accent/20 to-primary/10 border-accent/30 hover:border-accent/60',
  'from-secondary to-accent/20 border-border hover:border-primary/40',
  'from-muted to-secondary border-border hover:border-primary/30',
];

export default function TopicSelector({ topics, questionCounts, totalCount, onSelect }: TopicSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Full Quiz Card */}
      <button
        onClick={() => onSelect(null)}
        className="group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 bg-gradient-to-br from-primary/15 to-accent/25 border-primary/30 hover:border-primary/70 hover:shadow-card-hover transition-all duration-200 text-left cursor-pointer"
      >
        <div className="flex items-center justify-between w-full">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <Badge variant="default" className="text-xs bg-primary/90 text-primary-foreground">
            {totalCount} soalan
          </Badge>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-base leading-tight">Kuiz Penuh</h4>
          <p className="text-muted-foreground text-xs mt-1">Semua topik digabungkan</p>
        </div>
        <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Topic Cards */}
      {topics.map((topic, index) => (
        <button
          key={topic}
          onClick={() => onSelect(topic)}
          className={`group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 bg-gradient-to-br ${TOPIC_COLORS[index % TOPIC_COLORS.length]} transition-all duration-200 text-left cursor-pointer hover:shadow-card-hover`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-xl bg-background/60 flex items-center justify-center text-lg">
              📋
            </div>
            <Badge variant="secondary" className="text-xs">
              {questionCounts[topic] ?? 0} soalan
            </Badge>
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">{topic}</h4>
            <div className="flex items-center gap-1 mt-1">
              <BookOpen className="w-3 h-3 text-muted-foreground" />
              <p className="text-muted-foreground text-xs">Topik khusus</p>
            </div>
          </div>
          <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>
  );
}
