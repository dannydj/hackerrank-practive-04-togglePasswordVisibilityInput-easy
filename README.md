# Exercise: Toggle Password Visibility Input

> Level 1 — Warm-up. Expected time: 20–30 minutes.

## Context

You are working on the sign-in flow for a web app. The product team wants users to be able to verify what they typed into the password field by toggling its visibility, similar to most modern login forms.

## Goal

Implement the `PasswordInput` component in `src/components/PasswordInput.tsx` so that all tests in `src/tests/PasswordInput.test.tsx` pass.

## User Stories

- As a user, I can see a labeled password field that hides my input by default.
- As a user, I can click a toggle button to reveal my password as plain text.
- As a user, I can click the toggle button again to hide my password.
- As a user with assistive tech, the toggle button announces whether the password is currently visible.

## Acceptance Criteria

- [ ] The component renders a `<label>` linked to the `<input>` via `htmlFor` / `id`.
- [ ] The input starts with `type="password"`.
- [ ] A toggle `<button type="button">` is rendered next to the input.
- [ ] The button's accessible name is `"Show password"` when hidden and `"Hide password"` when visible.
- [ ] The button reflects state via `aria-pressed` (`"false"` hidden, `"true"` visible).
- [ ] Clicking the button toggles the input between `type="password"` and `type="text"`.
- [ ] Typed value is preserved when toggling visibility.
- [ ] The input is controlled — it always reflects the `value` prop and calls `onChange` with the next value.
- [ ] When `disabled` is true, both the input and the button are disabled.

## File Structure

```txt
src/
  components/
    PasswordInput.tsx     <-- IMPLEMENT THIS
  tests/
    PasswordInput.test.tsx
    setup.ts
  App.tsx
  main.tsx
  styles.css
```

## Commands

```bash
npm install
npm test          # watch mode
npm run test:run  # CI mode (one-shot)
npm run dev       # manual smoke-check in the browser
```

## What I Should Implement

- `PasswordInput` (`src/components/PasswordInput.tsx`) — currently returns `null`.
  - Local `useState` for the visibility flag.
  - Linked label + controlled input.
  - Toggle button with the right accessible name and `aria-pressed`.
  - Forward the `disabled` prop to both the input and the button.

> Do not change the `PasswordInputProps` type — the harness in the tests depends on it.

## Evaluation Rubric

| Area | Positive Signal | Concern |
|---|---|---|
| Problem Understanding | Reads tests first, identifies the public API of the component | Starts coding without checking the test contract |
| Algorithmic Approach | Picks `useState<boolean>` + derived `type` value | Adds Redux / context for purely local state |
| Coding Fluency | Writes typed React idiomatically, uses `htmlFor`/`id` correctly | Reaches for `useEffect` to sync visibility |
| Communication | Explains the toggle pattern and a11y intent while coding | Silent on accessibility decisions |
| Edge Cases & Testing | Preserves typed value across toggles, handles `disabled`, uses `type="button"` | Forgets `type="button"` (would submit the form), drops value when toggling |
| Frontend Architecture | Keeps `PasswordInput` self-contained and reusable | Leaks visibility state up to the parent unnecessarily |
