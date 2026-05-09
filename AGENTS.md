<!--
###############################################
Created at: 2026-03-05 21:53
Updated at: 2026-05-10 02:50
Description: Project instructions for Codex agents working in this repository.
###############################################
-->

## File Metadata Headers

- For every created or modified editable source, documentation, or configuration file, add a metadata header at the top of the file.
- Use this exact metadata format:

```text
Created at: YYYY-MM-DD HH:mm
Updated at: YYYY-MM-DD HH:mm
Description: short purpose of this file
```

- Use the file's valid comment syntax for the header so the file remains valid.
- For TypeScript, JavaScript, and CSS files, use `/* ... */` or `// ...`.
- For Markdown files, use normal Markdown text or a comment-style block.
- For HTML files, use `<!-- ... -->`.
- Do not add metadata headers to generated files, lockfiles, build output, binaries, media files, `node_modules`, `dist`, or similar vendor/output folders.

## Frontend Design

- Do not use emoji as icons, decoration, labels, placeholders, or visual UI elements in the frontend.
- Use proper icon components instead of emoji. In `personal-site/`, prefer `lucide-react` because it is already installed.
- Reuse existing icon buttons, component patterns, styles, and layout conventions before creating new UI pieces.
- Only create a new component when existing components cannot be cleanly reused or composed.
- Every new page, section, component, or design update must reuse the existing visual theme.
- Use the current design tokens and style patterns from `personal-site/src/styles.css`, including colors, spacing, typography, buttons, cards, and light/dark theme behavior.
- Do not introduce unrelated color palettes, layout styles, or component treatments unless explicitly requested.

## Section Dividers

- Separate each major file section with a visible divider that uses the file's valid comment syntax.
- For TypeScript or JavaScript files, use this pattern:

```ts
// ###############################################
// Section Name
// ###############################################
```

- For CSS files, use this pattern:

```css
/* ###############################################
   Section Name
   ############################################### */
```

- For Markdown files, prefer headings. Hash divider lines are allowed when they make the document easier to scan.
