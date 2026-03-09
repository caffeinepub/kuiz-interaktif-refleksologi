# Kuiz Interaktif Refleksologi

## Current State
Aplikasi kuiz refleksologi dengan soalan-soalan dalam questionBank di backend (main.mo). Soalan sedia ada dibahagikan kepada dua seksyen bertarikh:
- 25 Februari 2026 (topik asas refleksologi)
- 26 Februari 2026 (topik Kontra Indikasi & Indikasi dari nota 5.1–5.4)

## Requested Changes (Diff)

### Add
- Set soalan baru bertarikh 9 Mac 2026 berdasarkan nota ringkas Indikasi & Kontraindikasi dari garis panduan kesihatan
- Topik baru: "Indikasi & Kontraindikasi (Garis Panduan)"
- 15 soalan MCQ dalam bahasa Melayu

### Modify
- main.mo: Tambah seksyen soalan baru selepas soalan sedia ada dalam questionBank

### Remove
- Tiada

## Implementation Plan
1. Cipta 15 soalan MCQ berdasarkan nota indikasi dan kontraindikasi
2. Tambah soalan dalam seksyen bertarikh baru (9 Mac 2026) di main.mo
3. Tambah konfigurasi topik baru di TopicSelector.tsx
