import { useState } from 'react';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ParticipantFormProps {
  onSubmit: (name: string, date: string) => void;
  topic: string | null;
}

export default function ParticipantForm({ onSubmit, topic }: ParticipantFormProps) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const isValid = name.trim().length > 0 && date.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(name.trim(), date);
    }
  };

  return (
    <div className="animate-fade-slide-in flex flex-col items-center max-w-md mx-auto py-4">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6">
        <User className="w-8 h-8 text-primary" />
      </div>

      <h2 className="font-serif text-2xl font-bold text-foreground mb-1 text-center">
        Maklumat Peserta
      </h2>
      <p className="text-muted-foreground text-sm mb-6 text-center max-w-xs">
        Sila masukkan nama dan tarikh anda sebelum memulakan kuiz
        {topic ? ` — ${topic}` : ' penuh'}.
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="participant-name" className="text-sm font-semibold text-foreground">
            Nama Penuh <span className="text-error">*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="participant-name"
              type="text"
              placeholder="Masukkan nama anda..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 rounded-xl border-border focus:border-primary"
              required
              autoFocus
            />
          </div>
        </div>

        {/* Date Field */}
        <div className="space-y-2">
          <Label htmlFor="participant-date" className="text-sm font-semibold text-foreground">
            Tarikh <span className="text-error">*</span>
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="participant-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 rounded-xl border-border focus:border-primary"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={!isValid}
          className="w-full gap-2 rounded-xl font-semibold mt-2"
        >
          Mulakan Kuiz
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
