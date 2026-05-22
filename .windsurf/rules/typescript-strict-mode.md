---
trigger: always_on
---

<typescript_strict>
- Always use strict: true in tsconfig (enables 8 compiler flags together)
- Never use `any` type - use unknown for dynamic data instead
- Use explicit return types for public functions
- Use type inference for internal functions
- Avoid type assertions, use type guards and type narrowing
- Enable noUncheckedIndexedAccess for safer array/object access
- Enable noImplicitOverride to require override keyword for method overrides
- Enable noPropertyAccessFromIndexSignature for stricter index signature access
- Enable noImplicitReturns to ensure all code paths return values
- Enable noFallthroughCasesInSwitch to prevent switch fallthrough
- Enable exactOptionalPropertyTypes for precise optional property types
- Enable noUnusedLocals and noUnusedParameters to catch dead code
- Use override keyword when extending class methods
- Use satisfies operator for type checking without type assertion
</typescript_strict>
