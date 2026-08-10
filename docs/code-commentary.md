# Repository Commentary Standard for AI Agents

This standard is the single source of truth for code commentary. All AI agents operating on this repository must follow these rules precisely. Headers and comments exist to preserve context, prevent drift, and flag uncertainty—not to restate code.

---

## 1. File Header

Every source file must open with this block.

```text
/**
 * FILE: <filename.ext>
 * PURPOSE: <one‑sentence description of the file’s role>
 * ARCHITECTURE: <module / feature area, key technical approach>
 * KEY RULES: <critical constraints that must not be violated>
 * DEPENDS ON: <internal modules, external APIs, services>
 * LAST UPDATED: <YYYY‑MM‑DD> <short reason>
 */
```

**Rules:**
- Create on file creation; update the whole block whenever purpose, architecture, dependencies, or key rules change.
- `LAST UPDATED` must reflect the most recent meaningful change, not typo fixes.
- Keep `KEY RULES` and `DEPENDS ON` accurate. An inaccurate header is a defect.

---

## 2. Function / Method Header

Every function or method must be preceded by this block.

```text
/**
 * WHAT IT DOES: <concise description>
 * @param {type} name – <description>
 * @return {type} – <description>
 * SIDE EFFECTS: <list of external changes; "None" if pure>
 * ASSUMES: <preconditions or assumptions>
 * AI‑NOTE: <only present if AI‑generated and correctness uncertain; state the uncertainty>
 */
```

**Rules:**
- Include on every function, public or private.
- For a private helper under five lines with no side effects, a single‑line summary is sufficient.
- Update the header whenever signature, behavior, or side effects change.
- `AI‑NOTE` is mandatory if the function body was AI‑generated and has not been fully verified. Once the uncertain code has been verified or fixed, remove the `AI‑NOTE` or replace it with a permanent comment explaining the resolution.

---

## 3. Inline Comments

Use inline comments only for non‑obvious code. The following markers are allowed.

| Marker | Purpose |
|--------|---------|
| `// WHY: <explanation>` | Business rule, algorithm choice, or non‑obvious decision |
| `// WORKAROUND: <reason>. Remove when <condition>` | Temporary hack with a clear removal condition |
| `// AI‑NOTE: <uncertainty>` | AI‑generated logic that needs later review |
| `// TODO(<owner>): <task>` | Deferred work; include an owner |

**Never:**
- Write comments that restate what the code already expresses (e.g., `i++ // increment i`).
- Leave commented‑out code. Delete it immediately.

---

## 4. Enforcement

Agents must apply this standard in every file they touch. A missing, incomplete, or stale header is a defect and must be fixed as part of any change. When in doubt, add an `AI‑NOTE` rather than hiding uncertainty.