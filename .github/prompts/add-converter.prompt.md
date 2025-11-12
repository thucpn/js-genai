---
mode: agent
---
Add a new type converter for bidirectional SDK↔API transformation.

Requirements:
- Create converter in src/converters/ directory
- Implement both toApi and fromApi transformations
- Handle nested objects and arrays properly
- Preserve unknown fields for forward compatibility
- Add validation for required fields
- Follow existing converter patterns
- Update _transformers.ts if needed for content normalization

Success criteria:
- Type conversions work bidirectionally
- No data loss in round-trip conversion
- Handles edge cases (null, undefined, empty arrays)
- Unit tests verify all transformations
- TypeScript types are correctly mapped
