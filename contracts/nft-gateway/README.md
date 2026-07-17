# NFT Gateway → Avatar Forge Contracts

This directory defines the first no-wallet-connect identity handoff for AGENTROPOLIS.

## Flow

```text
Player
  → NFT Gateway
  → Gaming District
  → Construction District
  → Creator MCP
  → Blender MCP
  → Asset Registry
  → Distribution Layer
```

## Verification ladder

1. `IMAGE_ONLY`
2. `ASSET_LOCATED`
3. `COLLECTION_VERIFIED`
4. `OWNERSHIP_OBSERVED`
5. `CONTROL_VERIFIED`
6. `ECONOMIC_RECHECK_PASSED`

Image upload is a visual reference only. It does not prove ownership.

Wallet connection is not required for discovery, profile claims, previews, or avatar fabrication. One-time message signing may be introduced later only for elevated control verification or economic actions.

## Contracts

- `resolve-request.schema.json` — accepts public discovery inputs such as wallet address, asset ID, transaction signature, explorer URL, marketplace URL, or image reference.
- `resolve-response.schema.json` — returns normalized asset data, evidence, assurance state, and explicit read-only authority.
- `avatar-forge.schema.json` — routes an identity reference into the Construction District fabrication pipeline.

## Hard boundaries

These contracts never grant:

- private-key access
- seed-phrase access
- wallet custody
- token transfer authority
- approval authority
- transaction signing authority
- automatic settlement authority

Every fabricated asset requires a receipt and registry state before distribution.
