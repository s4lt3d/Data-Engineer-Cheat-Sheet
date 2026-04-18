# DataEngineering

## Main cheatsheet

The browser-friendly reference set is:

```text
data_engineer_cheatsheet.html
data_engineer_playbooks.html
data_engineer_snippets.html
```

You can open it directly in a browser, or serve the folder locally:

```bash
cd /Users/walter/DataEngineering
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/data_engineer_cheatsheet.html
http://127.0.0.1:8000/data_engineer_playbooks.html
http://127.0.0.1:8000/data_engineer_snippets.html
```

## Mermaid source

The original roadmap source is still here:

```text
data_engineer_roadmap.mmd
```

If you still want to preview the Mermaid version:

```bash
python3 preview_mermaid.py
```

Then open:

```text
http://127.0.0.1:8000
```

## Notes

- The HTML sheet is the better format for dense cheat-sheet layout.
- The three HTML files are meant to work together:
  - overview
  - operational playbooks
  - copyable snippets
- Mermaid is still useful as a planning/source format, but not ideal for poster-style references.
- If you want static SVG or PNG exports from the Mermaid source later, use Mermaid CLI:

```bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i data_engineer_roadmap.mmd -o data_engineer_roadmap.svg
```
