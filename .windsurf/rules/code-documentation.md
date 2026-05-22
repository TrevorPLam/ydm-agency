---
trigger: glob
globs: packages/*/src/**/*.ts
---

<code_documentation>
- Document public APIs with TSDoc (standard for TypeScript)
- Use JSDoc syntax only for JavaScript files without TypeScript
- Add examples for complex functions
- Document parameter types (TypeScript types preferred over @param)
- Document return types (TypeScript types preferred over @returns)
- Document thrown errors with @throws
- Clearly describe asynchronous functions, Promises, and callbacks (resolve/reject behavior)
- Document side effects
- Keep documentation up to date
- Don't document obvious code
- Follow consistent style guide throughout project
- Use TypeDoc for generating API documentation from TSDoc comments
- Utilize Markdown in README files for better formatting
- Document functions and methods thoroughly (what it does, inputs, outputs, side effects)
</code_documentation>
