# ATG Identity Authority Evidence Audit

**Repository:** `wiredchaos/AGENTROPOLIS-ATG`  
**Commit reviewed:** `163b8e93f3685fe4cb5733fec855af435dc116c1`  
**Audit date (UTC):** `2026-07-19`  
**Audit mode:** read-only evidence audit (no production behavior changes)  
**Controlling authority referenced:** `wiredchaos/agentropolis` canon, federation hardening, repository registry, issue #85 (not fetchable from this environment; audit grounded in ATG code evidence)

---

## 1. Executive summary

**AGENTROPOLIS-ATG does not implement the canonical AGENTROPOLIS identity authority.**

Evidence shows a public **protocol / documentation / visualization prototype** with:

1. a static WebGPU landing page and simulated mandate console (`index.html`, `js/grid.js`);
2. draft security doctrine (`docs/RFC-0001-TRUSTED-AUTHORIZATION-PATH.md`);
3. protocol-vs-kit boundary docs (`docs/PROTOCOL_VS_AGENT_KIT.md`);
4. three JSON Schema contracts for a no-wallet NFT discovery / avatar-forge handoff (`contracts/nft-gateway/*`).

There is **no** runtime principal registry, agent registry, mandate engine, delegation engine, capability evaluator, policy decision point, revocation propagator, receipt store, session/auth service, database, API, migration, workflow, or identity test suite.

README language that ATG covers “agent identity, capability discovery, mandates, authority, evidence, receipts…” is a **protocol aspiration**. The same README truthfully labels the repository a **public prototype** and defers runtime implementation to the planned **ATRALITH** Agent Kit.

**Final recommendation for identity-authority status:** `EMPTY-SHELL`  
**Actual implemented roles:** documentation-only package · prototype · schema-only package · governance/trust protocol (draft doctrine only)

---

## 2. Actual repository role

### Classification (code evidence)

| Candidate role | Verdict | Evidence |
|---|---|---|
| canonical identity authority | **No** | No principal/agent binding runtime, no authZ engine, no persistence |
| trust protocol | **Partial (docs only)** | RFC-0001 defines Trusted Authorization Path semantics; not enforced |
| governance protocol | **Partial (docs + UI labels)** | Authority classes, policy-gate language; no PDP |
| authorization engine | **No** | No decision API or evaluator |
| policy decision point | **No** | Simulated hops only in `buildMandate` |
| credential service | **No** | No issue/rotate/revoke credential code |
| agent registry | **No** | No agent entity storage or API |
| mandate engine | **No** | Browser `buildMandate()` is a simulation |
| capability service | **No** | No typed capability evaluation |
| attestation layer | **No** | NFT assurance ladder is schema-only |
| wallet identity adapter | **Schema stub only** | NFT resolve schemas accept wallet address as discovery input; authority forced read-only |
| chain-specific identity adapter | **Schema stub only** | `chain_hint` enum in resolve-request schema |
| schema-only package | **Yes (partial)** | `contracts/nft-gateway/*.schema.json` |
| documentation-only package | **Yes (dominant)** | README, RFC, protocol docs |
| prototype | **Yes** | Static site + simulated console; README § Truth labels |
| legacy implementation | **No** | No superseded runtime found on `main` |
| duplicate | **No** | Not a second copy of an identity service |
| empty shell (identity authority) | **Yes** | Identity-authority domain has no runtime controls |

### Evidence surfaces inspected

| Surface | Present on `main`? | Path / note |
|---|---|---|
| Source directories | Minimal | `js/`, `css/`, `contracts/`, `docs/`, `assets/`, `vendor/` |
| Package metadata | **Absent** | No `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod` |
| Exports / libraries | **Absent** | No SDK export surface |
| Runtime entrypoints | Static site only | `index.html` → `js/grid.js` ES module; local `python3 -m http.server` |
| APIs | **Absent** | No HTTP handlers, RPC, MCP server |
| Schemas | 3 JSON Schemas | `contracts/nft-gateway/` |
| Database migrations | **Absent** | None |
| Tests | **Absent** | No `tests/`, `*.test.*`, CI workflows |
| Workflows / deployments | **Absent** | No `.github/workflows`; README describes GitHub Pages only |
| Deployments | Pages-oriented static | `.nojekyll` present |

### README / design claims vs confirmation

| Claim | Status |
|---|---|
| Open semantic protocol for identity, mandates, receipts… | **Claim** — aspirational; no normative identity schema suite beyond NFT gateway |
| Mandate console | **Confirmed simulation** — `js/grid.js` `buildMandate`, `truth_label: 'simulation'` |
| Receipts signed / verified | **Denied by README** — `unsigned_preview`, `pending_verification` |
| ATRALITH implements ATG | **Planned / external** — explicitly “under construction” |
| Formal ATG RFC complete | **Denied by README** — “not complete” |
| NFT gateway is production identity | **Denied by contracts** — read-only, no custody/signing authority |

---

## 3. Architecture map

```text
┌─────────────────────────────────────────────────────────────┐
│ AGENTROPOLIS-ATG (this repo, commit 163b8e9)                │
│                                                             │
│  index.html + css/atg.css + js/grid.js                      │
│    └─ WebGPU/WebGL/STATIC visualization                     │
│    └─ buildMandate()  → JSON preview in DOM (no persist)    │
│                                                             │
│  docs/                                                      │
│    └─ RFC-0001 Trusted Authorization Path (draft doctrine)  │
│    └─ PROTOCOL_VS_AGENT_KIT.md (ATG ≠ ATRALITH)             │
│                                                             │
│  contracts/nft-gateway/                                     │
│    └─ resolve-request / resolve-response / avatar-forge     │
│       JSON Schema only — no validator runtime in repo       │
└─────────────────────────────────────────────────────────────┘
              │ implements (planned, NOT in this repo)
              ▼
┌─────────────────────────────────────────────────────────────┐
│ ATRALITH Agent Kit (external / planned)                     │
│  MCP, SDKs, validators, mandate builder, receipt engine…    │
└─────────────────────────────────────────────────────────────┘
              │ used by (planned)
              ▼
        Agents / MCP hosts / AGENTROPOLIS Mission Control
```

**Identity authority is not present in this diagram as an implemented component.** RFC-0001 assigns enforcement ambitions to ATRALITH, Mission Control, AEGIS, and NTRU — none of which are implemented here.

---

## 4. Entity inventory

Legend for lifecycle columns: **N/A** = not implemented.

### 4.1 Implemented or partially represented entities

| Entity | Path | Type / schema | Storage | Create | Update | Delete / revoke | Owner | Lifecycle | Expiry |
|---|---|---|---|---|---|---|---|---|---|
| Simulated mandate object | `js/grid.js` `buildMandate` | ephemeral JS object | browser DOM (`#console-output`) | button click / page load | recompile only | none | none | `simulated_mandate_compilation` | none |
| Receipt preview | `js/grid.js` `receipt_preview` | ephemeral JS object | DOM | with mandate | none | none | none | `receipt_pending` | none |
| NFT resolve request | `contracts/nft-gateway/resolve-request.schema.json` | JSON Schema | none | n/a | n/a | n/a | n/a | n/a | n/a |
| NFT resolve response | `contracts/nft-gateway/resolve-response.schema.json` | JSON Schema | none | n/a | n/a | n/a | n/a | assurance_state enum | n/a |
| Avatar forge “mandate” | `contracts/nft-gateway/avatar-forge.schema.json` | JSON Schema | none | n/a | n/a | n/a | n/a | receipt.state enum | n/a |
| Atranic glyph “identity” semantics | `js/grid.js` `GLYPHS` | UI metadata | none | n/a | n/a | n/a | n/a | n/a | n/a |
| Authorization class vocabulary | `docs/RFC-0001-…` | documentation | none | n/a | n/a | n/a | n/a | n/a | n/a |

### 4.2 Required identity entities — missing

| Entity | Status |
|---|---|
| human principal | **missing** |
| organization | **missing** |
| agent (registry binding) | **missing** |
| service account | **missing** |
| wallet (as linked identifier with lifecycle) | **schema field only** (`wallet_address` discovery input) |
| device | **missing** |
| session | **missing** (RFC mentions session authority class; no implementation) |
| district | **UI visualization only** (`DISTRICTS` in `js/grid.js`; schema consts in avatar-forge) |
| application | **missing** |
| role | **missing** |
| policy (enforced) | **missing** (docs + simulated hops) |
| mandate (enforced) | **missing** (simulation / schema title only) |
| delegation | **missing** |
| capability (typed/enforced) | **missing** (string lists in simulation; marketing labels in HTML) |
| grant | **missing** |
| credential | **missing** |
| attestation (verified) | **missing** (assurance_state enum in schema only) |
| trust score | **missing** |
| consent | **missing** |
| revocation | **missing** |
| receipt (`agentropolis.receipt.v1`) | **missing** (preview fields only) |
| audit event (`agentropolis.audit.v1`) | **missing** |

### 4.3 Distinction verification

| Required distinction | Implemented? | Evidence |
|---|---|---|
| human principal ≠ organization | **No** | No principal models |
| ≠ agent | **No** | No agent model |
| ≠ wallet | **Partial claim only** | NFT contracts force `wallet_connected: false` and deny custody; still no principal entity |
| ≠ session | **No** | No session model |
| ≠ role | **No** | No role model |
| ≠ capability | **No** | Simulated string arrays only |
| ≠ mandate | **No** | Simulated object / schema title only |
| ≠ delegation | **No** | Absent |
| ≠ credential | **No** | Absent |
| ≠ attestation | **No** | Schema enum labels only |

**Conclusion:** the repository does **not** implement the required identity ontology as queryable, lifecycle-managed entities.

---

## 5. Authorization flow

Required chain:

```text
request → authentication → principal resolution → agent resolution →
mandate resolution → delegation validation → capability evaluation →
policy decision → trust/attestation validation → approve/deny →
receipt → audit → revocation check
```

| Stage | Path | Symbol | Input | Output | Storage | Failure | Fail-open/closed | Tests |
|---|---|---|---|---|---|---|---|---|
| request | `index.html` + `js/grid.js` | UI textarea `#intent-input` | free text | string | none | n/a | n/a | none |
| authentication | — | — | — | — | — | — | — | **missing** |
| principal resolution | — | — | — | — | — | — | — | **missing** |
| agent resolution | — | — | — | — | — | — | — | **missing** |
| mandate resolution | `js/grid.js` | `buildMandate` | intent text | simulated JSON | DOM | none (always returns object) | **fail-open** (always “compiles”) | **missing** |
| delegation validation | — | — | — | — | — | — | — | **missing** |
| capability evaluation | `js/grid.js` | regex heuristics inside `buildMandate` | intent text | string allow/deny lists | none | none | **fail-open** | **missing** |
| policy decision | — | simulated hop label only | — | — | — | — | — | **missing** |
| trust/attestation | schemas only | assurance_state enum | n/a | n/a | none | n/a | n/a | **missing** |
| approve/deny | — | — | — | — | — | — | — | **missing** |
| receipt emission | `js/grid.js` | `receipt_preview` | random id | unsigned preview | DOM | none | **fail-open** | **missing** |
| audit event | — | — | — | — | — | — | — | **missing** |
| revocation check | — | — | — | — | — | — | — | **missing** |

### Simulated mandate compiler detail

- **File:** `js/grid.js`
- **Symbols:** `buildMandate`, `renderMandate`, `SENSITIVE`
- **Behavior:**
  - regex `SENSITIVE` flags high risk;
  - regex detects budget + currency tokens;
  - regex detects read-only/audit language;
  - emits `truth_label: 'simulation'` and `signature: 'unsigned_preview'`.
- **Not present:** issuer, principal_id, agent_id, signature verification, persistence, expiry, revocation, versioning, conflict detection.

NFT gateway schemas describe a future resolve/forge flow but contain **no executable validators or services** in this repository.

---

## 6. Human accountability

| Control | Status | Evidence |
|---|---|---|
| Every agent maps to human/org principal | **missing** | No agent/principal entities |
| Binding explicit and queryable | **missing** | No store/API |
| Agents cannot self-register into authority | **N/A / unprotected** | No registration path exists; also no guard |
| Agents cannot mint capabilities | **N/A / unprotected** | No capability mint path |
| Agents cannot issue own mandates | **violated in simulation spirit** | Anyone can open the page and “compile” a mandate-shaped JSON with no principal |
| Agents cannot extend mandate duration | **N/A** | No duration field |
| Agents cannot delegate beyond authority | **N/A** | No delegation |
| Privileged actions identify authorizing principal | **missing** | Simulation has no principal field |
| Emergency human override | **missing** | Absent |
| Mission Control halt one agent | **missing** | Absent (Mission Control only mentioned in RFC prose) |
| Ownership transfer requires approval | **missing** | Absent |
| Orphaned agents denied | **missing** | Absent |

**Authority-without-human flag:** the only “mandate” path (`buildMandate`) produces authority-shaped JSON with **no human/org principal**. This is labeled simulation and cannot bind production systems by itself, but it demonstrates that **no human-root model exists in code**.

---

## 7. Mandate model

### Fields audited

| Field | Simulated mandate (`buildMandate`) | Avatar forge schema | Status |
|---|---|---|---|
| issuer | absent | absent | **missing** |
| principal | absent | absent | **missing** |
| agent | absent | absent | **missing** |
| purpose | intent text only | `purpose` on resolve-request; forge via fabrication | **partial / non-authoritative** |
| scope | absent | district routing consts | **missing / cosmetic** |
| allowed actions | heuristic string list | denied economic actions via consts | **partial simulation** |
| prohibited actions | fixed string list | custody/transfer false consts | **partial** |
| resources | absent | asset_reference | **schema only** |
| district | routing visualization strings | Gaming/Construction consts | **schema/UI only** |
| environment | absent | absent | **missing** |
| chain | absent | chain_hint / asset.chain | **schema only** |
| provider | absent | toolchain consts (Creator/Blender MCP) | **schema only** |
| budget | regex parse | economic_action false | **partial simulation** |
| time window / expiry | absent | absent | **missing** |
| renewal | absent | absent | **missing** |
| approval level | `human_review_required` bool | `human_review_required` | **partial** |
| conflict behavior | absent | absent | **missing** |
| revocation | absent | absent | **missing** |
| version | `protocol: 'atranic/0.1'` label | none | **label only** |
| signature / integrity | `unsigned_preview` | receipt.artifact_hash optional | **not enforced** |

### Enforcement questions

| Question | Answer |
|---|---|
| Mandate conflicts hard-stop? | **No** — no conflict logic |
| Expired mandates fail closed? | **No** — no expiry |
| Missing mandates fail closed? | **No** — no enforcement gate |
| Broad wildcard mandates? | Simulation can emit broad `allowed_actions` when not read-only |
| Post-issue mutation without versioning? | Ephemeral; no versioned store |
| Downstream revalidation? | **No** consumers in repo |
| Cached mandates survive revocation? | **N/A** — no cache/revocation |

---

## 8. Delegation model

**Entire delegation model: missing.**

No symbols, schemas, storage, depth limits, loop detection, subdelegation rules, or revocation propagation for delegation were found under `main` (excluding vendored Three.js).

Flags that would apply if this were treated as an authority:

- unbounded delegation — **not implemented** (gap)
- recursive delegation / loops — **not implemented** (gap)
- silent privilege escalation — **simulation can invent allow-lists from free text** (UI prototype risk if mistaken for authority)
- subdelegation without issuer consent — **missing**
- lack of expiry / revocation propagation — **missing**

---

## 9. Capability model

| Property | Status |
|---|---|
| typed | **No** — free strings in simulation |
| scoped | **No** |
| resource-bound | **No** |
| action-bound | Partial string lists only |
| environment-bound | **No** |
| time-bound | **No** |
| budget-bound | Partial heuristic only |
| revocable | **No** |
| versioned | **No** |
| non-transferable by default | **No model** |

Creation / grant / evaluation / denial / expiry / revocation code: **absent** as an authority service.

Flags:

- string-only capability checks — **yes** in `buildMandate`
- wildcard capabilities — not explicit `*`, but broad unsupervised allow-lists possible
- UI-only checks — **yes** (browser only)
- missing server-side enforcement — **yes**
- capabilities inferred from wallet ownership — **not in runtime**; NFT schemas intentionally separate ownership observation from authority
- role→capability without mandate — **no role model**

---

## 10. Trust and attestation

### What “trust” means here

| Sense | Present? | Where |
|---|---|---|
| identity proof | **docs/schema aspiration** | RFC display_trust; NFT assurance ladder |
| reputation | **marketing only** | README / economy section |
| policy compliance | **doctrine only** | RFC-0001 |
| device assurance | **doctrine only** | signer_type / key_residency vocabulary |
| model assurance | **absent** | — |
| data provenance | **schema fields** | evidence[] in resolve-response |
| credential attestation | **absent** | — |
| risk score | **heuristic bool/level** | `buildMandate` risk.level |
| behavioral score | **absent** | — |

NFT assurance ladder (`IMAGE_ONLY` → `ECONOMIC_RECHECK_PASSED`) is a **schema vocabulary**, not a verifier.

**No trust score can grant authority here** because no authority grant path exists. Residual risk: treating simulation JSON or NFT ownership observation as authority outside this repo.

---

## 11. Revocation

| Revocation type | Status |
|---|---|
| principal | **missing** |
| agent | **missing** |
| mandate cancellation | **missing** |
| delegation | **missing** |
| capability | **missing** |
| credential | **missing** |
| session | **missing** |
| wallet unlink | **missing** (schemas never establish a link lifecycle) |
| provider access | **missing** |
| district access | **missing** |
| emergency halt | **missing** |

Propagation, cache invalidation, offline behavior, receipts (`agentropolis.revocation.v1`), audit events: **documentation-only / absent**.

RFC-0001 requires revocation conditions on mandates normatively for implementations; **this repository does not implement them**.

---

## 12. Receipts and audit

### Schema coverage vs `agentropolis.*.v1`

| Required schema | In repo? |
|---|---|
| `agentropolis.receipt.v1` | **missing** |
| `agentropolis.audit.v1` | **missing** |
| `agentropolis.revocation.v1` | **missing** |

### Action coverage matrix

| Action | Event | Schema | Actor | Principal | Agent | Mandate | Capability | Policy version | Result | Timestamp | Integrity | Persistence | Retention |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| principal creation | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |
| organization creation | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |
| agent registration | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |
| agent ownership binding | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |
| mandate issue | simulated preview | none | browser user | none | none | ephemeral | string lists | none | always success | none | unsigned | DOM | none |
| mandate update / expiry / conflict | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |
| delegation issue/denial | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |
| capability grant/denial/revocation | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |
| credential issue/rotation | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |
| wallet link/unlink | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |
| emergency halt / recovery / ownership transfer | — | — | — | — | — | — | — | — | — | — | — | — | **missing** |

Avatar-forge schema requires a `receipt` object with states `PENDING|FABRICATED|…` but provides **no emitter**.

---

## 13. Authentication and sessions

| Control | Status |
|---|---|
| Login methods | **none** |
| Service / API authentication | **none** (no API) |
| JWT / issuer / audience validation | **none** |
| Token expiry / refresh rotation | **none** |
| Session storage / logout / invalidation | **none** |
| MFA / step-up / device binding | **none** |
| Privileged reauthentication | **none** |

### Security search results (non-vendor)

| Pattern | Finding |
|---|---|
| Static bearer tokens | **not found** |
| Shared secrets / hard-coded tokens | **not found** |
| Timing-unsafe compares | **not found** (no auth compares) |
| Permissive auth bypasses | **N/A** — no auth surface |
| Dev fallbacks in production | Renderer STATIC fallback only (not auth) |
| Unsigned claims | Simulation receipts explicitly `unsigned_preview` |
| Overly long sessions | **N/A** |
| Missing nonce validation | **N/A** for auth; no wallet challenge implementation |

No secrets were rotated or exposed by this audit.

---

## 14. Wallet and chain separation

| Requirement | Status |
|---|---|
| Wallet is identifier, not root identity | **Doctrine/schema intent yes; identity root model absent** |
| Multiple wallets per principal | **missing** (no principal) |
| Wallet unlinking | **missing** |
| Compromised-wallet recovery | **missing** |
| Chain ID validation | **schema enum only** (`chain_hint`) |
| Nonce / replay protection | **missing** |
| Domain separation | **missing** |
| Custodial vs noncustodial differentiation | Contracts force non-custodial / no connect; no custody model |
| Wallet rotation preserves history | **missing** |
| Blockchain ownership ≠ mandate authority | **Explicitly asserted** in NFT contracts (`authority.mode: read_only`, economic actions false) |

### Chain dependency classification

| Dependency | Classification | Notes |
|---|---|---|
| dogechain / solchain / ethereum / base / bitcoin / polygon / other | **optional adapter (schema hint only)** | `resolve-request.schema.json` `chain_hint` |
| Three.js WebGPU/WebGL | **prototype presentation dependency** | vendored; not identity |
| GitHub Pages static hosting | **deployment convenience** | not identity |
| ATRALITH / Hermes / MCP (named in docs/schemas) | **planned external / schema routing labels** | not implemented here |

No core identity-authority chain dependency exists because no identity runtime exists.

---

## 15. Provider and runtime portability

| Dependency | Where used | Why | Abstracted? | Degraded mode | Replacement path | Blocks canonical identity status? |
|---|---|---|---|---|---|---|
| Three.js 0.185.1 (vendored) | `vendor/*`, `js/grid.js` | visualization | local vendor import | STATIC CSS fallback | any renderer / none | **No** (not identity) |
| Cloudflare | not found | — | — | — | — | No |
| Claw / NemoClaw | not found | — | — | — | — | No |
| Hermes | schema enum / docs | destination label | n/a | n/a | rename enum | No |
| Base / Ethereum / Solana / Dogecoin | schema `chain_hint` | discovery hint | enum | n/a | extend enum | No |
| Privy / Clerk / Auth0 / Firebase / Supabase | not found | — | — | — | — | No |
| Single database | none | — | — | — | — | **Yes as blocker** — no durable identity store at all |
| Single model vendor | none | — | — | — | — | No |
| Single MCP provider | docs/schema mentions Creator/Blender MCP | planned toolchain | constants | n/a | redesign | No as runtime; would if treated as sole forge path |
| Single wallet provider | none | — | — | — | — | No |

Portability is high because almost nothing is implemented. That does **not** confer canonical status.

---

## 16. Data and privacy

| Data type | Stored/processed? | Storage | Encryption | Access control | Retention | Deletion | Export | Logging exposure | Third parties | Jurisdiction |
|---|---|---|---|---|---|---|---|---|---|---|
| Legal names | no | — | — | — | — | — | — | — | — | — |
| Display names | no | — | — | — | — | — | — | — | — | — |
| Emails / phones / addresses / gov IDs | no | — | — | — | — | — | — | — | — | — |
| Wallet addresses | schema input only; no server processor in repo | none in repo | n/a | n/a | n/a | n/a | n/a | none | none in repo | unspecified |
| IP / device / biometrics | no app processing | browser/host only | n/a | n/a | n/a | n/a | n/a | none | none | — |
| Behavioral / minors / health | no | — | — | — | — | — | — | — | — | — |
| Recovery data | no | — | — | — | — | — | — | — | — | — |
| Trust / reputation scores | no durable | simulation risk.level ephemeral | n/a | n/a | none | none | none | console warn on renderer fail only | none | — |

**Privacy posture:** low data collection in-repo because there is no backend. Also means **no privacy controls, retention policy, or deletion API** for an identity system.

---

## 17. Test matrix

| Case | Classification |
|---|---|
| missing / invalid principal | **missing** |
| orphaned / unauthorized agent | **missing** |
| missing / expired / conflicting mandate | **missing** |
| invalid / excessive / revoked delegation | **missing** |
| missing / revoked capability | **missing** |
| invalid / expired / replayed attestation | **missing** |
| revoked credential / session | **missing** |
| wallet replay | **missing** |
| emergency halt | **missing** |
| downstream revocation propagation | **missing** |
| provider / database outage | **missing** |
| degraded mode (renderer) | **implemented but untested** (`STATIC` fallback in `initRenderer`) |
| rollback | **missing** |

No automated test runner, CI, or compatibility suite exists on `main` despite README listing “compatibility tests” as a protocol ownership aspiration.

---

## 18. Domain boundary recommendation

### What ATG should own (protocol layer)

1. Normative **identity message schemas** and vocabulary (principal, agent, mandate, delegation, capability, receipt, revocation, audit) — **not yet present as a complete suite**.
2. Normative **authorization-path semantics** (continue RFC-0001 toward stable RFC + schemas).
3. Interoperability / compatibility **fixtures and conformance tests** for those schemas.
4. Versioning and protocol governance docs.
5. Optional **NFT discovery assurance vocabulary** as a non-root identity *adapter schema*, explicitly non-authoritative.

### What ATG must not own / must not become

1. Sovereignty model routing (belongs to sovereignty systems; do not duplicate).
2. Payment settlement / wallet custody / chain execution.
3. UI login product authentication (host apps / IdP adapters).
4. District-specific profile databases.
5. Provider-specific runtime adapters (ATRALITH / other kits).
6. **The live identity authority service** (principal registry, mandate PDP, revocation bus) — must be a dedicated Identity / Authority runtime that **consumes** ATG schemas.

### Recommended responsibility boundary

```text
ATG (this repo)     = grammar + normative schemas + conformance + doctrine
Identity Authority  = human-rooted principal/agent registry + mandate/delegation/
                      capability evaluation + revocation + receipts/audit (runtime)
ATRALITH / kits     = implement ATG messages + adapters
Mission Control     = observe/halt UI over authority events
AEGIS / policy      = risk/policy decisioning (may call Identity Authority)
NTRU / trust        = attestation/signature verification helpers
Sovereignty         = model/provider/rights/jurisdiction routing (separate)
```

**ATG is the protocol that a dedicated Identity service must speak — not that service.**

---

## 19. Severity-ranked findings

### P0

1. **No human-rooted identity authority exists** while repository naming/README can be misread as identity infrastructure.
2. **Simulated mandate compiler always succeeds** (`buildMandate`) with no principal, signature, expiry, or revocation — fail-open prototype that must never be treated as enforcement.
3. **Zero revocation / halt / session invalidation paths** for any authority object.

### P1

1. No principal↔agent binding model or orphan denial.
2. No mandate/delegation/capability enforcement engines.
3. No `agentropolis.receipt.v1` / `audit.v1` / `revocation.v1` schemas or emitters.
4. NFT “identity” schemas risk category confusion with canonical identity if registry marks ATG as identity authority.

### P2

1. No wallet link lifecycle, recovery, chain replay protection.
2. No durable audit store / retention controls.
3. No privacy/export/deletion controls (because no data plane — still a gap for canonical readiness).
4. No identity test suite / CI.

### P3

1. README lead sentence overclaims identity/capability/mandate coverage relative to code.
2. “compatibility tests” listed as ownership without files.
3. Naming: Avatar Forge “mandate” schema is a fabrication routing document, not an authority mandate.

---

## 20. Canonical suitability score (0–5)

| Dimension | Score | Rationale |
|---|---|---|
| identity clarity | 1 | Docs distinguish wallet≠authority; no principal ontology |
| human accountability | 0 | No principal binding |
| agent binding | 0 | No agent registry |
| mandate enforcement | 0 | Simulation only |
| delegation safety | 0 | Absent |
| capability enforcement | 0 | String heuristics only |
| revocation | 0 | Absent |
| wallet separation | 2 | Strong schema intent; no lifecycle |
| portability | 4 | Few hard deps; nothing to port |
| trust integrity | 1 | Vocabulary only |
| receipt coverage | 0 | Unsigned previews / schema stubs |
| audit durability | 0 | Absent |
| privacy | 2 | No PII store; also no controls |
| recovery | 0 | Absent |
| test coverage | 0 | Absent for identity |
| operational readiness | 1 | Static Pages prototype only |

**Mean (unweighted):** ~0.7 / 5  
**Identity-authority readiness:** not canonical.

---

## 21. Final recommendation

| Field | Value |
|---|---|
| Actual role | documentation-only package + prototype + schema-only package + draft governance/trust protocol |
| Proposed status | **EMPTY-SHELL** (identity authority domain) |
| Confidence | **high** |
| Canonical? | **No** |
| Codex required next? | **YES** — to implement or designate a dedicated Identity Authority runtime and to land normative ATG identity schemas without conflating them with this prototype UI |

Do **not** register ATG as the canonical identity authority in `repository-registry.yaml`. Register it as an incubating protocol/docs surface; keep identity authority ownership explicit and elsewhere (or mark identity authority as missing / to-be-created).
