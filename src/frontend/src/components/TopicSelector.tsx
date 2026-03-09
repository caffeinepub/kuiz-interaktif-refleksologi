import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  BookOpen,
  ChevronRight,
  ClipboardList,
  Layers,
} from "lucide-react";

interface TopicSelectorProps {
  topics: string[];
  questionCounts: Record<string, number>;
  totalCount: number;
  onSelect: (topic: string | null) => void;
}

interface TopicConfig {
  gradient: string;
  icon: string;
}

const TOPIC_CONFIG: Record<string, TopicConfig> = {
  "Kontra Indikasi & Indikasi": {
    gradient:
      "from-purple-500/15 to-pink-500/25 border-purple-400/30 hover:border-purple-500/60",
    icon: "🚫",
  },
  "Indikasi & Kontraindikasi (Garis Panduan)": {
    gradient:
      "from-teal-500/15 to-cyan-500/25 border-teal-400/30 hover:border-teal-500/60",
    icon: "📋",
  },
  "Urutan Refleksologi": {
    gradient:
      "from-primary/10 to-accent/30 border-primary/20 hover:border-primary/50",
    icon: "🦶",
  },
  "Teknik Massa Kaki": {
    gradient:
      "from-accent/20 to-primary/10 border-accent/30 hover:border-accent/60",
    icon: "👣",
  },
  "Zon Refleks Kaki": {
    gradient:
      "from-secondary to-accent/20 border-border hover:border-primary/40",
    icon: "🗺️",
  },
  "Manfaat Refleksologi": {
    gradient: "from-muted to-secondary border-border hover:border-primary/30",
    icon: "✨",
  },
  "Cara Rawatan": {
    gradient:
      "from-primary/10 to-accent/30 border-primary/20 hover:border-primary/50",
    icon: "💆",
  },
  "Pengetahuan Refleksologi": {
    gradient:
      "from-accent/20 to-primary/10 border-accent/30 hover:border-accent/60",
    icon: "📚",
  },
  "Urut Tangan": {
    gradient:
      "from-secondary to-accent/20 border-border hover:border-primary/40",
    icon: "🤲",
  },
  "Zon Refleks Tangan": {
    gradient: "from-muted to-secondary border-border hover:border-primary/30",
    icon: "✋",
  },
  "Anatomi Refleks Tangan": {
    gradient:
      "from-primary/10 to-accent/30 border-primary/20 hover:border-primary/50",
    icon: "🖐️",
  },
  "Teknik Massa Tangan": {
    gradient:
      "from-accent/20 to-primary/10 border-accent/30 hover:border-accent/60",
    icon: "👐",
  },
  "Perbandingan Refleksologi Tangan & Kaki": {
    gradient:
      "from-secondary to-accent/20 border-border hover:border-primary/40",
    icon: "⚖️",
  },
  "Teknik Refleksologi": {
    gradient: "from-muted to-secondary border-border hover:border-primary/30",
    icon: "🔧",
  },
};

const FALLBACK_COLORS = [
  "from-primary/10 to-accent/30 border-primary/20 hover:border-primary/50",
  "from-accent/20 to-primary/10 border-accent/30 hover:border-accent/60",
  "from-secondary to-accent/20 border-border hover:border-primary/40",
  "from-muted to-secondary border-border hover:border-primary/30",
];

function getTopicSubtitle(topic: string): string {
  if (topic === "Kontra Indikasi & Indikasi") return "Bahagian 5.1–5.4";
  if (topic === "Indikasi & Kontraindikasi (Garis Panduan)")
    return "9 Mac 2026";
  return "Topik khusus";
}

export default function TopicSelector({
  topics,
  questionCounts,
  totalCount,
  onSelect,
}: TopicSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Full Quiz Card */}
      <button
        type="button"
        onClick={() => onSelect(null)}
        className="group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 bg-gradient-to-br from-primary/15 to-accent/25 border-primary/30 hover:border-primary/70 hover:shadow-card-hover transition-all duration-200 text-left cursor-pointer"
      >
        <div className="flex items-center justify-between w-full">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <Badge
            variant="default"
            className="text-xs bg-primary/90 text-primary-foreground"
          >
            {totalCount} soalan
          </Badge>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-base leading-tight">
            Kuiz Penuh
          </h4>
          <p className="text-muted-foreground text-xs mt-1">
            Semua topik digabungkan
          </p>
        </div>
        <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Topic Cards */}
      {topics.map((topic, index) => {
        const config = TOPIC_CONFIG[topic];
        const gradient =
          config?.gradient ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
        const icon = config?.icon ?? "📋";
        const isKontraIndikasi = topic === "Kontra Indikasi & Indikasi";
        const isGarisPanduan =
          topic === "Indikasi & Kontraindikasi (Garis Panduan)";
        const subtitle = getTopicSubtitle(topic);

        return (
          <button
            type="button"
            key={topic}
            onClick={() => onSelect(topic)}
            className={`group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 bg-gradient-to-br ${gradient} transition-all duration-200 text-left cursor-pointer hover:shadow-card-hover`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-background/60 flex items-center justify-center text-lg">
                {isKontraIndikasi ? (
                  <AlertCircle className="w-5 h-5 text-purple-500" />
                ) : isGarisPanduan ? (
                  <ClipboardList className="w-5 h-5 text-teal-500" />
                ) : (
                  icon
                )}
              </div>
              <Badge
                variant={
                  isKontraIndikasi || isGarisPanduan ? "default" : "secondary"
                }
                className={
                  isKontraIndikasi
                    ? "text-xs bg-purple-500/90 text-white"
                    : isGarisPanduan
                      ? "text-xs bg-teal-500/90 text-white"
                      : "text-xs"
                }
              >
                {questionCounts[topic] ?? 0} soalan
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
                {topic}
              </h4>
              <div className="flex items-center gap-1 mt-1">
                <BookOpen className="w-3 h-3 text-muted-foreground" />
                <p className="text-muted-foreground text-xs">{subtitle}</p>
              </div>
            </div>
            <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        );
      })}
    </div>
  );
}
