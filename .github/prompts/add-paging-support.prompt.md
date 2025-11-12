---
mode: agent
---
Implement paging support for a list API endpoint.

Requirements:
- Use Pager class from src/pagers.ts
- Implement PagedItem mapping interface
- Support pageSize parameter
- Handle pageToken for continuation
- Provide async iteration: for await (const item of pager)
- Add flatMap method for transformations
- Handle empty results gracefully

Success criteria:
- Pager works with async iteration
- Automatically fetches next pages
- Stops when no more results
- Tests verify multi-page scenarios
- Performance is good (lazy loading)
- Compatible with both Gemini and Vertex AI pagination
