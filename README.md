# AGENTROPOLIS-ATG

**Agent Transaction Grammar for autonomous systems.**

AGENTROPOLIS-ATG is an open semantic protocol for agent identity, capability discovery, mandates, authority, evidence, receipts, reputation, and economic exchange.

> **ATG tells agents how to communicate. ATRALITH gives them the software to do it.**

## Public site — WebGPU Intelligence Grid

The public landing page is a scroll-directed **Intelligence Grid** control-plane experience:

- cinematic 3D AGENTROPOLIS city behind the protocol UI
- Three.js `WebGPURenderer` with vendored builds (no CDN on the production page)
- automatic **WebGL2** fallback when WebGPU is unavailable
- **STATIC** CSS sky fallback if renderer initialization fails
- five colored districts, central governance spire, atmospheric particles, and orbiting protocol ring
- scroll-keyed camera stages with subtle pointer parallax
- interactive 24-glyph canonical Atranic alphabet
- simulated mandate compiler console

### Renderer modes

| Badge   | Meaning |
|---------|---------|
| `WEBGPU` | Preferred path via Three.js WebGPURenderer |
| `WEBGL2` | Automatic backend fallback inside WebGPURenderer |
| `STATIC` | Canvas hidden; CSS atmosphere remains; site content still works |

### Browser requirements

- Modern Chromium, Firefox, or Safari with ES modules
- WebGPU where available; WebGL2 otherwise
- Local HTTP server recommended (module imports and renderer init)

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- continuous camera animation stops
- governance rings and drifting particles do not animate
- blinking / looping UI motion is disabled
- camera snaps to the active section
- the scene renders on section change or resize only

### Truth labels (important)

This repository is a **public prototype**.

- The mandate console is a **simulated compiler**
- Receipts use preview states such as `receipt_pending`, `simulated`, `pending_verification`, and `unsigned_preview`
- Do **not** assume live autonomous execution, cryptographic signing, settlement, custody, or production MCP routing already exist
- The formal ATG RFC, ATRALITH reference implementation, signed receipts, and live settlement are **not complete**

## File structure

```text
index.html
css/atg.css
js/grid.js
vendor/three.webgpu.min.js
vendor/three.core.min.js
assets/
docs/
README.md
```

Three.js **0.185.1** is vendored locally. `three.webgpu.min.js` imports `./three.core.min.js`.

## Run locally

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

Validate JavaScript syntax:

```bash
node --check js/grid.js
```

## Optional image assets

The page reserves styled fallback slots for later binary assets. Add these files when ready — the site works without them and will not request missing images:

- `assets/images/agentropolis-intelligence-grid.webp` — canonical ATG architecture visual
- `assets/images/motionforge-control-plane.webp` — downstream district implementation example

Replace the corresponding `.asset-slot` fallback panels in `index.html` with `<img>` tags once the files exist.

## What this repository is

Protocol layer materials:

- RFCs (planned)
- normative schemas (planned)
- message types
- authority and risk semantics
- receipt requirements
- versioning
- compatibility tests
- protocol governance
- Atral Script visual mappings

ATG is implementation-neutral. Agents can adopt it without joining AGENTROPOLIS or running ATRALITH.

## What ATRALITH is

ATRALITH is the **planned** reference Agent Kit that will implement ATG through:

- MCP server
- TypeScript and Python SDKs
- schema validator
- mandate builder
- receipt generator and verifier
- agent matching
- framework adapters
- CLI and hosted services

See [`docs/PROTOCOL_VS_AGENT_KIT.md`](docs/PROTOCOL_VS_AGENT_KIT.md).

## Architecture

- **AGENTROPOLIS** — Intelligence Grid and flagship ecosystem
- **ATG** — open Agent Transaction Grammar protocol
- **Atranic** — structured semantic language carried by ATG messages
- **Atral Script** — visual glyph and identity layer
- **ATRALITH** — reference Agent Kit (under construction)

```text
ATG Protocol
    ↓ implemented by
ATRALITH Agent Kit
    ↓ used by
Agents, MCP hosts, applications, and AGENTROPOLIS
```

## Enable GitHub Pages

1. Open **Pages** in repository settings.
2. Select **Deploy from a branch**.
3. Choose `main` and `/ (root)`.
4. Save.

## License

Apache License 2.0.
