---
trigger: glob
globs: apps/**/src/**/*.tsx, packages/ui/src/**/*.tsx
---

<state_management>
- Use Zustand as the pragmatic default for most React apps in 2026
- Zustand is tiny, simple, and doesn't require Provider wrapping
- Use Jotai for apps with frequent state updates and many consuming components
- Use Redux Toolkit only for large, long-term apps that need structure and debuggability
- Use React Context for low-frequency updates (theme, language, auth)
- Keep state as close to where it's used as possible (local state first)
- Don't lift state up prematurely - only when truly needed
- Use server state libraries (TanStack Query, SWR) for server data
- Use form state libraries (React Hook Form) for complex forms
- Avoid prop drilling by using composition or state management
- Use selectors to prevent unnecessary re-renders
- Keep state management simple - don't over-engineer
- Match the tool to the type of state, not pick a single winner
- Performance problems usually come from patterns, not libraries
- Measure before optimizing state management
</state_management>
