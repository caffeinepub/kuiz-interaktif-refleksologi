# Specification

## Summary
**Goal:** Move all print functionality from the QuizSummary screen to the Admin page, enabling per-participant result printing from the leaderboard.

**Planned changes:**
- Remove the "Print Results" button and any print-related UI from the `QuizSummary` component
- Add a "Print" button to each row in the Admin page leaderboard table
- Clicking a participant's "Print" button renders a print-ready card showing: name, date, topic, score (e.g., 9/12), percentage, and a per-question breakdown (question text, selected answer, correct answer, correct/incorrect indicator)
- Use `window.print()` scoped to only the selected participant's result card
- Update `@media print` CSS rules in `index.css` so only the admin participant print card is visible when printing; all other page elements (leaderboard, header, navigation, buttons) are hidden

**User-visible outcome:** Quiz participants no longer see a print option after completing the quiz. Admins can print any individual participant's full result breakdown directly from the leaderboard on the Admin page.
