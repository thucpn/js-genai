---
applyTo: 'sdk-samples/**'
---

# Code Sample Review Guidelines

When reviewing or creating code samples in the `sdk-samples/` folder, ensure they meet the following criteria:

## Documentation Requirements

### 1. File Header Documentation
Every sample MUST include:
- Apache 2.0 license header at the top
- A comprehensive JSDoc-style comment block explaining:
  - What the sample demonstrates
  - Key concepts covered
  - Prerequisites or limitations (e.g., "Only supported on Gemini Developer API")
  - Related API methods used

Example:
```typescript
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This sample demonstrates how to upload a file and query its content.
 *
 * Key concepts:
 * - Upload files using ai.files.upload()
 * - Wait for file processing with polling
 * - Reference uploaded files in generateContent requests
 * - Use createPartFromUri() to create file references
 *
 * Note: File operations are only supported on Gemini Developer API,
 * not on Vertex AI.
 */
```

### 2. Inline Comments
- Add step-by-step comments for major operations (e.g., "Step 1: Upload file")
- Explain non-obvious parameters or configuration options
- Document why certain waits or checks are necessary
- Clarify API-specific behaviors (Gemini vs Vertex AI differences)

### 3. Console Output
- Use descriptive console.log messages to show progress
- Include success indicators (✓, ✅) for completed steps
- Show error messages with context (❌, ⚠️)
- Display relevant response data to help users understand output structure

## Code Structure Requirements

### 1. Environment Variables
- Use environment variables for sensitive data (API keys, project IDs)
- Check for required environment variables and provide helpful error messages
- Example:
```typescript
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY environment variable is not set.');
  console.error('Please set it with: export GEMINI_API_KEY=your-api-key');
  return;
}
```

### 2. Error Handling
- Wrap main logic in try-catch blocks
- Provide descriptive error messages
- Log error details (message and stack trace when helpful)
- Handle API-specific errors gracefully (e.g., file processing failures)
```typescript
try {
  // Sample logic here
} catch (error) {
  console.error('\n❌ Error occurred:', error);
  if (error instanceof Error) {
    console.error('Error message:', error.message);
  }
  throw error;
}
```

### 3. API Type Support
- Clearly indicate which APIs are supported (Gemini Developer API, Vertex AI, or both)
- Check GOOGLE_GENAI_USE_VERTEXAI environment variable when applicable
- Provide appropriate messages for unsupported scenarios
```typescript
if (GOOGLE_GENAI_USE_VERTEXAI === 'true') {
  console.log('⚠️ Vertex AI is not supported for this sample.');
  console.log('This feature requires Gemini Developer API.');
  return;
}
```

### 4. Async/Await Patterns
- Use async/await consistently (not Promise.then chains)
- Handle polling scenarios explicitly (e.g., waiting for file processing)
- Use proper Promise patterns for delays: `await new Promise(resolve => setTimeout(resolve, ms))`

### 5. Resource Cleanup
- Delete temporary files or resources when appropriate
- Show cleanup steps as part of the demonstration
- Handle cleanup errors gracefully

## Naming Conventions

- File names should be descriptive and follow snake_case: `upload_and_query_file.ts`
- Function names should describe the operation: `uploadAndQueryFile()`, `generateContentWithFileUpload()`
- Use clear variable names that indicate purpose: `uploadedFile`, `fileMetadata`, `response`

## Educational Value

Samples should:
- Demonstrate one primary feature clearly
- Include variations or options when relevant
- Show realistic use cases
- Be copy-paste runnable with minimal setup (just environment variables)
- Follow the same patterns as existing samples for consistency

## Testing

Before submitting:
- Verify the sample builds without errors: `npm run build`
- Test with valid API credentials
- Ensure output is informative and formatted nicely
- Check that cleanup operations work correctly

## Common Patterns to Follow

### Pattern 1: File Upload with Processing Wait
```typescript
// Upload file
const file = await ai.files.upload({file: blob, config: {displayName: 'example.txt'}});

// Wait for processing
let fileMetadata = await ai.files.get({name: file.name});
while (fileMetadata.state === 'PROCESSING') {
  console.log('Waiting for file processing...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  fileMetadata = await ai.files.get({name: file.name});
}

if (fileMetadata.state === 'FAILED') {
  throw new Error('File processing failed.');
}
```

### Pattern 2: Using Uploaded Files in Requests
```typescript
import {createPartFromUri} from '@google/genai';

// Create file reference part
const filePart = createPartFromUri(file.uri, file.mimeType);

// Use in generateContent
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: ['Analyze this file', filePart],
});
```

### Pattern 3: Client Initialization
```typescript
// Gemini Developer API
const ai = new GoogleGenAI({vertexai: false, apiKey: GEMINI_API_KEY});

// Vertex AI
const ai = new GoogleGenAI({
  vertexai: true,
  project: GOOGLE_CLOUD_PROJECT,
  location: GOOGLE_CLOUD_LOCATION,
});
```

## Review Checklist

When reviewing a code sample, verify:
- [ ] Has Apache 2.0 license header
- [ ] Includes comprehensive documentation comment at top
- [ ] Has clear step-by-step inline comments
- [ ] Uses environment variables for credentials
- [ ] Includes proper error handling with try-catch
- [ ] Checks for required environment variables
- [ ] Indicates API support (Gemini/Vertex/both)
- [ ] Uses console output to show progress
- [ ] Follows async/await patterns consistently
- [ ] Handles resource cleanup appropriately
- [ ] Uses descriptive naming conventions
- [ ] Is standalone and runnable
- [ ] Follows existing sample patterns
- [ ] Educational and clear for developers