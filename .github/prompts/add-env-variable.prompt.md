---
mode: agent
---
Add support for a new environment variable in Node.js client initialization.

Requirements:
- Update src/node/node_client.ts with proper precedence rules
- Follow existing patterns: explicit params > env vars > defaults
- Document in README.md with examples
- Handle both Gemini Developer API and Vertex AI modes
- Add validation and error messages for invalid values
- Update TypeScript types for options
- Consider security implications (don't log secrets)

Success criteria:
- Environment variable works in Node.js only
- Proper precedence with other config options
- Documented in README
- Tests verify precedence rules
- No breaking changes to existing configs
