---
mode: agent
---
Add or enhance Model Context Protocol (MCP) integration for tool use.

Requirements:
- Use mcpToTool helper to convert MCP client to SDK tool
- Handle StdioClientTransport for local MCP servers
- Support automatic function calling with MCP tools
- Properly initialize and close MCP client connections
- Handle MCP tool errors gracefully
- Add example demonstrating MCP usage
- Note that MCP support is experimental

Success criteria:
- MCP client connects successfully
- Tools are correctly converted and called
- Responses are properly formatted
- Connection cleanup works
- Example runs end-to-end
- Optional @modelcontextprotocol/sdk peer dependency works
