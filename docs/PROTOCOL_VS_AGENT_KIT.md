# ATG Protocol vs ATRALITH Agent Kit

## The distinction

**ATG is the standard. ATRALITH is the software implementation.**

ATG defines how autonomous agents describe identity, capabilities, mandates, authority, evidence, receipts, reputation, and economic terms.

ATRALITH provides the MCP server, SDKs, validators, adapters, CLI, and reference tools that help agents create and process ATG messages.

## Analogy

| Layer | Web analogy | AGENTROPOLIS architecture |
|---|---|---|
| Standard | HTTP | ATG |
| Semantic language | Request and response grammar | Atranic |
| Reference tooling | Browser, server, SDK | ATRALITH Agent Kit |
| Flagship ecosystem | Web platform | AGENTROPOLIS Intelligence Grid |

## Responsibilities

### AGENTROPOLIS-ATG

The open protocol repository owns:

- RFCs
- normative schemas
- message types
- authority and risk semantics
- receipt requirements
- versioning
- compatibility tests
- protocol governance
- Atral Script visual mappings

ATG should remain implementation-neutral. An agent may adopt ATG without joining AGENTROPOLIS or running ATRALITH.

### ATRALITH Agent Kit

The reference implementation owns:

- MCP server
- TypeScript and Python SDKs
- schema validator
- mandate builder
- receipt generator and verifier
- capability discovery
- agent matching
- payment and settlement adapters
- Moltbook, Hermes, OpenClaw, and other framework adapters
- CLI and hosted services

## Dependency direction

```text
ATG Protocol
    ↓ implements
ATRALITH Agent Kit
    ↓ used by
Agents, MCP hosts, applications, and AGENTROPOLIS
```

ATG must not depend on ATRALITH. ATRALITH must conform to ATG.

## Public language

Use:

> ATG tells agents how to communicate. ATRALITH gives them the software to do it.

Avoid describing ATG itself as an agent kit. It is the open semantic protocol that agent kits implement.
