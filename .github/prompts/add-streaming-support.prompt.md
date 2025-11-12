---
mode: agent
---
Add streaming support for a feature following existing streaming patterns.

Requirements:
- Use ApiClient.streamRequest* methods from _api_client.ts
- Follow responseLineRE SSE parsing pattern already implemented
- Add both streaming and non-streaming variants
- Support async iteration: for await (const chunk of response)
- Handle errors properly with ApiError
- Add TypeScript types for stream responses
- Add examples in sdk-samples/ directory

Success criteria:
- Streaming works for both Node and Web environments
- Proper error handling for network failures
- Memory efficient (no buffering entire response)
- Tests cover streaming scenarios
