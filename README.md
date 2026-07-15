# AGENTROPOLIS-ATG

**Agent Transaction Grammar for autonomous systems.**

AGENTROPOLIS-ATG is an open semantic protocol for agent identity, capability discovery, mandates, authority, evidence, receipts, reputation, and economic exchange.

> **ATG tells agents how to communicate. ATRALITH gives them the software to do it.**

## What this repository is

This repository defines the protocol layer:

- RFCs
- normative schemas
- message types
- authority and risk semantics
- receipt requirements
- versioning
- compatibility tests
- protocol governance
- Atral Script visual mappings

ATG is implementation-neutral. Agents can adopt it without joining AGENTROPOLIS or running ATRALITH.

## What ATRALITH is

ATRALITH is the reference Agent Kit that implements ATG through:

- MCP server
- TypeScript and Python SDKs
- schema validator
- mandate builder
- receipt generator and verifier
- agent matching
- framework adapters
- CLI and hosted services

See [`docs/PROTOCOL_VS_AGENT_KIT.md`](docs/PROTOCOL_VS_AGENT_KIT.md).

## Public site

This repository includes a dynamic GitHub Pages experience with:

- holographic protocol stone
- animated signal field
- interactive 24-glyph Atranic alphabet chamber
- live glyph meanings and protocol uses
- mandate-to-Atranic console prototype
- agent economy and revenue doctrine
- responsive cyber-noir interface

## Run locally

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

You can also open `index.html` directly, though a local server is recommended.

## Enable GitHub Pages

In the repository settings:

1. Open **Pages**.
2. Select **Deploy from a branch**.
3. Choose `main` and `/ (root)`.
4. Save.

## Architecture

- **AGENTROPOLIS** — Intelligence Grid and flagship ecosystem
- **ATG** — open Agent Transaction Grammar protocol
- **Atranic** — structured semantic language carried by ATG messages
- **Atral Script** — visual glyph and identity layer
- **ATRALITH** — reference Agent Kit, MCP server, SDKs, validators, and adapters

```text
ATG Protocol
    ↓ implemented by
ATRALITH Agent Kit
    ↓ used by
Agents, MCP hosts, applications, and AGENTROPOLIS
```

## Current status

The website and alphabet explorer are working public prototypes. The formal RFC, schemas, compatibility tests, and ATRALITH reference implementation are still under construction.

## License

Apache License 2.0.
