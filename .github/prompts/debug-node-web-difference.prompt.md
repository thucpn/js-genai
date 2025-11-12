---
mode: agent
---
Debug why a feature works in Node but fails in Web (or vice versa).

Requirements:
- Check transport differences between node_client.ts and web_client.ts
- Verify fetch vs node-fetch behavior differences
- Check for Node-specific APIs (fs, path, etc) used in shared code
- Review websocket implementation differences
- Examine upload/download transport differences (_node_*, _cross_*)
- Test in both environments
- Add environment guards if needed

Success criteria:
- Root cause identified
- Fix works in both Node and Web
- No regression in either environment
- Tests cover both platforms
- Documentation notes any platform limitations
