---
mode: agent
---
Add a new public API method to the specified submodule (models, caches, chats, files, live, etc).

Requirements:
- Follow existing patterns in the target submodule
- Normalize content inputs using tContents from _transformers.ts
- Handle both Node and Web environments if applicable
- Add TypeScript types and JSDoc comments
- Export from appropriate index.ts files (src/index.ts, src/node/index.ts, src/web/index.ts)
- Run api-extractor to validate API surface consistency
- Add unit tests in test/unit/

Success criteria:
- Build completes without errors
- API reports are consistent across cross/node/web
- Tests pass
- Public API is properly documented
