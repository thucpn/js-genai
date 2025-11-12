---
mode: agent
---
Add a system test for an API endpoint with test server support.

Requirements:
- Create test in test/system/ directory
- Use test-server SDK patterns from existing tests
- Handle both record and replay modes
- Test both success and error scenarios
- Support GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION env vars
- Clean up resources (files, caches) after test
- Use jasmine test framework

Success criteria:
- Test runs with --test-server flag
- Can record new responses with --record flag
- Test passes in CI environment
- Proper setup and teardown
- No flaky behavior
