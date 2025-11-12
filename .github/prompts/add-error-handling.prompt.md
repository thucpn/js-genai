---
mode: agent
---
Add proper error handling for an API operation or failure scenario.

Requirements:
- Use ApiError class from src/errors.ts
- Include status, message, and original error details
- Don't expose raw fetch errors to users
- Add specific error messages for common failures
- Consider retry logic for transient errors
- Log errors appropriately without exposing secrets
- Update TypeScript types to reflect possible errors

Success criteria:
- Errors are user-friendly and actionable
- Stack traces are preserved for debugging
- HTTP status codes are correctly mapped
- Tests verify error scenarios
- Documentation mentions possible errors
