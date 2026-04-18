#!/usr/bin/env python3
"""Preview a Mermaid diagram locally with a tiny HTTP server.

Usage:
    python3 preview_mermaid.py
    python3 preview_mermaid.py data_engineer_roadmap.mmd --port 8123
"""

from __future__ import annotations

import argparse
import html
import http.server
import socketserver
from pathlib import Path


HTML_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <style>
    :root {{
      --bg: #f6f7fb;
      --panel: #ffffff;
      --border: #d7dce5;
      --text: #1f2937;
      --muted: #6b7280;
      --accent: #1d4ed8;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--text);
    }}
    header {{
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      background: var(--panel);
      position: sticky;
      top: 0;
      z-index: 1;
    }}
    header h1 {{
      margin: 0 0 6px;
      font-size: 18px;
    }}
    header p {{
      margin: 0;
      color: var(--muted);
      font-size: 14px;
    }}
    main {{
      padding: 20px;
    }}
    .card {{
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
      overflow: auto;
    }}
    .actions {{
      margin-top: 12px;
      font-size: 14px;
    }}
    .actions a {{
      color: var(--accent);
      text-decoration: none;
      margin-right: 16px;
    }}
    .actions a:hover {{
      text-decoration: underline;
    }}
    details {{
      margin-top: 16px;
    }}
    pre {{
      white-space: pre-wrap;
      word-break: break-word;
      background: #0f172a;
      color: #e5e7eb;
      border-radius: 10px;
      padding: 16px;
      font-size: 13px;
      overflow: auto;
    }}
  </style>
  <script type="module">
    import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
    mermaid.initialize({{
      startOnLoad: true,
      securityLevel: "loose",
      maxTextSize: 200000
    }});
  </script>
</head>
<body>
  <header>
    <h1>{title}</h1>
    <p>Refresh the page after editing the source file.</p>
    <div class="actions">
      <a href="/">Refresh preview</a>
      <a href="/source">View raw source</a>
    </div>
  </header>
  <main>
    <div class="card">
      <pre class="mermaid">{diagram}</pre>
    </div>
    <details>
      <summary>Raw Mermaid source</summary>
      <pre>{escaped_diagram}</pre>
    </details>
  </main>
</body>
</html>
"""


class MermaidPreviewHandler(http.server.BaseHTTPRequestHandler):
    diagram_path: Path

    def do_GET(self) -> None:
        if self.path == "/source":
            self._send_source()
            return

        if self.path != "/":
            self.send_error(404, "Not found")
            return

        if not self.diagram_path.exists():
            self.send_error(404, f"Missing diagram: {self.diagram_path}")
            return

        diagram = self.diagram_path.read_text(encoding="utf-8")
        payload = HTML_TEMPLATE.format(
            title=self.diagram_path.name,
            diagram=html.escape(diagram),
            escaped_diagram=html.escape(diagram),
        ).encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def _send_source(self) -> None:
        payload = self.diagram_path.read_text(encoding="utf-8").encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, fmt: str, *args) -> None:
        return


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Preview a Mermaid .mmd file locally.")
    parser.add_argument(
        "diagram",
        nargs="?",
        default="data_engineer_roadmap.mmd",
        help="Path to the Mermaid file. Default: data_engineer_roadmap.mmd",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port to serve on. Default: 8000",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    diagram_path = Path(args.diagram).expanduser().resolve()

    handler = MermaidPreviewHandler
    handler.diagram_path = diagram_path

    with socketserver.TCPServer(("127.0.0.1", args.port), handler) as httpd:
        print(f"Previewing {diagram_path}")
        print(f"Open http://127.0.0.1:{args.port}")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
