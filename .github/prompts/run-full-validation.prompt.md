---
mode: agent
---
Run complete validation pipeline: lint, build, test, and API consistency checks.

Requirements:
- Run npm run lint to check code style
- Run npm run build to compile TypeScript and bundle
- Run npm run unit-test for unit tests
- Run scripts/validate_api_consistency.sh for API surface
- Check all three api-report/*.api.md files are up to date
- Review any warnings or errors
- Fix any issues found

Success criteria:
- Linter passes with no errors
- Build completes successfully
- All unit tests pass
- API surface is consistent across platforms
- No uncommitted generated files
- Ready for CI
