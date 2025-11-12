---
mode: agent
---
Fix API surface inconsistencies between Node, Web, and cross-platform builds.

Requirements:
- Run scripts/validate_api_consistency.sh to identify issues
- Check api-report/*.api.md files for differences
- Ensure exports are mirrored in src/node/index.ts and src/web/index.ts
- Update src/index.ts for cross-platform APIs
- Re-run api-extractor for all three configs
- Don't expose Node-only or Web-only APIs in cross-platform build

Success criteria:
- validate_api_consistency.sh passes
- All three API reports are consistent
- No breaking changes to existing public API
- Build completes successfully
- CI checks pass
