---
mode: agent
---
Add or update base URL configuration for API endpoints.

Requirements:
- Update _base_url.ts with setDefaultBaseUrls if needed
- Modify _api_client.ts base URL/version logic
- Support HttpOptions.baseUrl override
- Handle environment variables (GOOGLE_VERTEX_BASE_URL, GOOGLE_GEMINI_BASE_URL)
- Maintain v1beta for Gemini, v1beta1 for Vertex defaults
- Support apiVersion parameter (v1, v1beta, v1alpha)
- Document new URL patterns

Success criteria:
- Base URL is correctly constructed
- Environment variables take precedence properly
- Both Gemini and Vertex AI work
- Tests verify URL construction
- No breaking changes to existing configs
