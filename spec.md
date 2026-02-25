# Specification

## Summary
**Goal:** Build an interactive reflexology quiz website with a Motoko backend storing MCQ questions derived from Malay reflexology notes, and a clean e-learning-style frontend with topic filtering and scored results.

**Planned changes:**
- Motoko backend seeded with 12 MCQ questions (in Malay) covering sections: "What is Pain?", "Causes of Disease", and "Identifying Symptoms" — each with question text, four options, correct answer index, topic category, and explanation
- Backend exposes query functions to retrieve all questions (optionally filtered by topic) and score answers
- Landing/home screen with topic category selector ("What is Pain?", "Causes of Disease", "Identifying Symptoms") and a "Full Quiz" option
- Quiz screen displaying one question at a time with four selectable answer options and a progress indicator (e.g., Question 3 of 12)
- Immediate correct/incorrect feedback after each answer with the explanation shown; correct answers highlighted green, incorrect in red
- Final score screen showing total score, percentage, a performance message, and a "Restart Quiz" button that reshuffles questions
- Smooth animated transitions between questions
- Warm, health-inspired visual theme (soft greens, creams, warm neutrals) with a centered quiz card and clear sans-serif typography
- All UI labels and navigation text in English; quiz question content remains in Malay

**User-visible outcome:** Users can visit the site, choose a topic or full quiz, answer 12 reflexology MCQ questions one at a time with instant feedback, and view their final score with an option to retake.
