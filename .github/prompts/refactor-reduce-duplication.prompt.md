---
mode: agent
---
Refactor code to reduce duplication while maintaining Node/Web compatibility.

Requirements:
- Identify shared logic that can be extracted
- Move common code to src/ (cross-platform)
- Keep environment-specific code in src/node/ and src/web/
- Use dependency injection for platform-specific parts
- Don't break existing API surface
- Update imports in affected files
- Run all tests to ensure no regression

Success criteria:
- Code duplication reduced measurably
- No changes to public API
- All tests pass (unit and system)
- Build succeeds for all targets
- No performance degradation
- Code is more maintainable
