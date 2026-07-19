# ATG Identity Authority Remediation Plan

**Repository:** `wiredchaos/AGENTROPOLIS-ATG`  
**Commit reviewed:** `163b8e93f3685fe4cb5733fec855af435dc116c1`  
**Companion evidence:** `docs/audits/ATG-IDENTITY-EVIDENCE-AUDIT.md`  
**Machine record:** `governance/atg-identity-evidence.yaml`  

**Scope rule:** This plan remediates **identity-authority readiness and protocol honesty**. It does **not** authorize production auth changes, secret rotation, file deletion, registry auto-apply, or merging sovereignty routing into ATG.

---

## Decision premise

ATG is **not** the live identity authority. Remediation has two tracks:

1. **Protocol track (this repo):** become a trustworthy grammar — schemas, doctrine, conformance — without claiming runtime authority.
2. **Authority track (dedicated service / repo):** implement human-rooted principal/agent registry, mandate/delegation/capability enforcement, revocation, receipts, and Mission Control halt.

Do not attempt to grow `js/grid.js` into the identity authority.

---

## P0 — Authority defects, bypasses, privilege escalation, non-revocable authority, fail-open

### P0-1 — Correct registry classification (external apply, human-gated)

- **Problem:** ATG can be misread as canonical identity authority.
- **Action:** Apply (manually) the proposed patch in `docs/audits/ATG-IDENTITY-REGISTRY-PATCH.proposed.yaml` to `wiredchaos/agentropolis/governance/repository-registry.yaml`.
- **Target status:** `EMPTY-SHELL` for identity authority; optional secondary tag `INCUBATING` for protocol docs/schemas.
- **Acceptance:** Registry does not list ATG as `CANONICAL` identity authority; ownership points to a dedicated identity runtime or `missing`.

### P0-2 — Prevent simulation-as-authority confusion

- **Problem:** `js/grid.js` `buildMandate` always succeeds, has no principal, emits `unsigned_preview`.
- **Action (docs/UI only in this repo):**
  - Keep/strengthen truth labels (`truth_label: simulation`) on every generated object.
  - Ensure README and console chrome state that output is non-authoritative and non-binding.
  - Add a conformance note forbidding ATRALITH/Mission Control from accepting `phase: simulated_mandate_compilation` as an enforceable mandate.
- **Do not:** wire the browser compiler into any production PDP.
- **Acceptance:** Public materials cannot reasonably be read as a live mandate issuer.

### P0-3 — Designate dedicated Identity Authority

- **Problem:** No human-rooted authority exists anywhere in this repo; agents must never become their own root.
- **Action:** In federation/canon process, create or name the Identity Authority component that owns:
  - principal + organization registry
  - agent binding
  - mandate / delegation / capability evaluation
  - revocation bus
  - receipt/audit persistence
  - per-agent halt
- **Acceptance:** Canon + registry show a non-ATG owner for identity authority; ATG listed as schema/protocol dependency only.

### P0-4 — Fail-closed doctrine for missing controls

- **Problem:** No runtime fail-closed gates; RFC already requires fail-closed for opaque/blind paths.
- **Action:** Normatively state in ATG identity RFC suite that missing principal, missing mandate, expired mandate, revoked anything, and authority-service outage are **fail-closed** for `A2+` actions.
- **Acceptance:** Published normative text + conformance fixtures assert fail-closed; no ATG sample implies fail-open production behavior.

---

## P1 — Binding, mandate, delegation, capability, revocation, receipts

### P1-1 — Normative identity schema suite (ATG owns)

Publish schemas (names indicative):

- `agentropolis.principal.v1`
- `agentropolis.organization.v1`
- `agentropolis.agent.v1` (requires `principal_id` or `organization_id`)
- `agentropolis.mandate.v1`
- `agentropolis.delegation.v1`
- `agentropolis.capability.v1`
- `agentropolis.receipt.v1`
- `agentropolis.audit.v1`
- `agentropolis.revocation.v1`

Each must distinguish entities listed in doctrine (human ≠ org ≠ agent ≠ wallet ≠ session ≠ role ≠ capability ≠ mandate ≠ delegation ≠ credential ≠ attestation).

### P1-2 — Mandate engine contract (Identity Authority implements; ATG specifies)

Mandate fields required at minimum:

issuer, principal, agent, purpose, scope, allowed/prohibited actions, resources, district, environment, chain, provider, budget, time window, expiry, renewal policy, approval level, conflict behavior, revocation handle, version, integrity proof.

Normative behaviors:

- missing / expired mandate → fail closed
- conflicts → hard stop
- no silent post-issue mutation (versioned supersession only)
- downstream revalidation required
- caches must observe revocation

### P1-3 — Delegation safety contract

Specify: issuer, delegate, capability subset, max depth, expiry, resource/budget/district/provider/chain constraints, subdelegation rules, revocation propagation, loop detection.

Forbid: unbounded depth, issuer-absent subdelegation, privilege escalation beyond parent mandate.

### P1-4 — Capability evaluation contract

Capabilities must be typed, scoped, resource/action/environment/time/budget bound, revocable, versioned, non-transferable by default.

Forbid: UI-only checks, string-only equality as sole control, wildcards without explicit risk class, wallet-ownership⇒capability, role⇒capability without mandate validation.

### P1-5 — Revocation bus contract

Cover principal, agent, mandate, delegation, capability, credential, session, wallet unlink, provider/district access, emergency halt.

Require: propagation semantics, cache invalidation, offline fail-closed for privileged classes, receipt + audit emission.

### P1-6 — Receipt and audit coverage

Map every identity/authority action in the audit checklist to `agentropolis.receipt.v1` / `audit.v1` / `revocation.v1` with actor, principal, agent, mandate, capability, policy version, result, timestamp, integrity proof, persistence, retention.

### P1-7 — Reclassify NFT gateway

Keep `contracts/nft-gateway/*` as **non-authoritative discovery / fabrication adapter schemas**.  
Explicit registry/docs language: ownership observation ≠ mandate authority.

---

## P2 — Portability, wallet separation, durable audit, recovery, privacy, tests

### P2-1 — Wallet as identifier lifecycle (schema + authority impl)

- Multiple wallets per principal
- Link / unlink / rotate with history
- Compromised-wallet recovery
- Chain ID + nonce/replay + domain separation
- Custodial vs noncustodial differentiation
- Never auto-grant mandate authority from chain ownership

### P2-2 — Provider neutrality

ATG schemas must not hard-require Claw, NemoClaw, Hermes, Cloudflare, a single chain, IdP, DB, model vendor, MCP, or wallet provider. Adapter metadata belongs in kits (ATRALITH et al.).

### P2-3 — Durable audit and recovery requirements

Define retention, integrity, export, and break-glass recovery for Identity Authority implementers. Mission Control must halt one agent without global halt.

### P2-4 — Privacy controls for implementers

Specify handling for legal names, emails, wallets, IPs, devices, trust/reputation data: encryption, access control, retention, deletion, export, logging redaction, jurisdiction.

### P2-5 — Conformance test matrix + CI (this repo)

Add fixtures/tests for every case in the audit test matrix (missing principal, orphaned agent, expired mandate, revoked delegation, replayed attestation, emergency halt, outage fail-closed, etc.).

Minimum bar before any future `ACTIVE` protocol status: automated schema validation + negative authorization vectors.

---

## P3 — Cleanup, documentation alignment, naming, deprecated claims

### P3-1 — README claim alignment

Tighten the lead sentence so ATG is clearly a **protocol/prototype**, not a deployed identity authority. Keep ATRALITH as the planned implementation kit — still not the dedicated Identity Authority unless canon assigns it that role.

### P3-2 — Rename colliding “mandate” usage

Consider renaming Avatar Forge `mandate_id` / title to `fabrication_order_id` / “Fabrication Order” to avoid authority-mandate collision.

### P3-3 — Drop or qualify unbacked ownership claims

“compatibility tests” and “normative schemas” ownership statements should match files present, or be marked planned.

### P3-4 — Visual prototype hygiene

Retain Intelligence Grid as marketing/prototype only; ensure no API paths are added that silently promote simulation objects into authority objects.

---

## Suggested sequencing

```text
1) Registry truth (P0-1) + designate Identity Authority owner (P0-3)
2) Simulation guardrails / public truth labels (P0-2, P0-4)
3) Normative schema suite + receipt/audit/revocation (P1-1, P1-6)
4) Mandate/delegation/capability/revocation contracts (P1-2..P1-5)
5) NFT gateway reclassification language (P1-7)
6) Conformance tests/CI (P2-5) before claiming ACTIVE protocol
7) Wallet lifecycle + privacy + recovery requirements (P2-1..P2-4)
8) Docs/naming cleanup (P3)
```

## Out of scope / forbidden during remediation

- Do not modify production auth in other systems from this audit PR.
- Do not rotate secrets.
- Do not delete repository files as “cleanup” without a separate approved change.
- Do not merge PRs as part of audit.
- Do not auto-apply the registry patch.
- Do not fold sovereignty routing into ATG.
- Do not promote `buildMandate` into a server authority.

## Exit criteria (identity authority)

ATG may support a future **CANONICAL protocol** role for identity *message grammar* only after P1 schemas + P2 conformance exist.

ATG must **never** be marked **CANONICAL identity authority** unless a real runtime with tests is moved into or linked from this repo — which this plan recommends **against**. Prefer a dedicated Identity Authority service that **implements** ATG.
