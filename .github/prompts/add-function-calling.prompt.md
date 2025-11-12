---
mode: agent
---
Add or enhance function calling support with automatic function calling (AFC) orchestration.

Requirements:
- Integrate with _afc.ts for AFC loop logic
- Use hasCallableTools and shouldDisableAfc checks
- Maintain automaticFunctionCallingHistory
- Support FunctionDeclaration with parametersJsonSchema
- Handle FunctionCall and FunctionResponse parts
- Support FunctionCallingConfigMode (AUTO, ANY, NONE)
- Add proper type guards and validation

Success criteria:
- AFC loop executes correctly with tool orchestration
- Manual function calling still works
- History is properly maintained for multi-turn
- Tests cover both manual and automatic modes
- Example demonstrates the full AFC process: send prompt with tools → receive function call → execute function → send function response
