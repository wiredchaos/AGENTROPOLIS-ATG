# RFC-0001: Trusted Authorization Path

**Status:** Draft  
**Category:** Security and authority semantics  
**Applies to:** ATG messages, ATRALITH implementations, AGENTROPOLIS policy gates, settlement adapters, wallet integrations, and privileged agent actions

## Abstract

ATG MUST distinguish between four different security properties:

1. **Key custody** — where the signing secret resides and whether it can be exported.
2. **Intent integrity** — whether the action shown for approval accurately represents the payload that will execute.
3. **Authority scope** — whether the actor is permitted to perform that action under the active mandate and policy.
4. **Accountability** — whether the authorization decision and resulting action can be independently verified afterward.

Protecting a private key does not prove that the correct action was reviewed. A polished interface does not prove that the signing boundary is secure. A software policy does not prove that the policy was enforced by the signer. A signature does not prove informed authorization unless the reviewed intent is cryptographically or procedurally bound to the signed payload.

ATG therefore defines a **Trusted Authorization Path**: the complete path from mandate, to policy decision, to human- or machine-readable rendering, to confirmation, to signature or capability use, to receipt.

> The host may propose an action. It may not silently redefine the authority that approves it.

## Core doctrine

Agentropolis adopts the following security philosophy:

> Specialized trust boundaries SHOULD protect irreversible authority. General-purpose interfaces MAY coordinate actions, but they MUST NOT be treated as equivalent to isolated signers, hardware roots of trust, threshold authorities, or independently verified execution paths.

This is not a product endorsement and does not declare any hardware wallet, phone, operating system, or vendor universally secure. It is an architectural rule: **the trusted computing base MUST be proportionate to the consequence of compromise and kept as small as practical.**

### Canonical distinctions

- **Frontend is not signer.** A wallet interface, dashboard, agent, or MCP host may construct and broadcast an action without being the component that holds or exercises final authority.
- **Key isolation is not intent verification.** A non-exportable key can still sign a malicious or misunderstood payload.
- **Display is part of the security boundary.** For consequential actions, the system must establish where the reviewed intent was rendered and whether that rendering was independent of the untrusted host.
- **Physical confirmation is not automatically informed consent.** Confirmation is meaningful only when the approving party can understand the consequential fields.
- **Blind signing is an explicit risk state.** Opaque or partially decoded payloads must never be represented as fully verified.
- **Policy text is not policy enforcement.** A mandate or prompt is advisory unless a runtime, signer, HSM, threshold policy, or other control can block violations.
- **Receipts must bind the chain of authority.** A receipt must identify the mandate, policy decision, reviewed representation, executed payload, signer class, and result.

## Threat model

The Trusted Authorization Path is designed to reduce damage from:

- compromised agent hosts, browsers, phones, desktops, extensions, or MCP clients;
- prompt injection that attempts to expand authority;
- malicious or compromised wallet and transaction-rendering software;
- dependency or update-channel compromise;
- transaction substitution between proposal and signing;
- misleading contract names, token metadata, addresses, or decoded intent;
- unauthorized use of valid credentials;
- blind signing and incomplete transaction parsing;
- silent fallback from stronger to weaker signing modes;
- confused-deputy behavior between agents, tools, signers, and human operators;
- post-event denial where no verifiable authorization record exists.

This RFC does not eliminate supply-chain, firmware, hardware, recovery, coercion, social-engineering, or operator risks. It requires those risks to be declared rather than hidden behind the word “secure.”

## Authorization classes

ATG implementations SHOULD assign every consequential action an authorization class before execution.

| Class | Typical action | Minimum authorization path |
|---|---|---|
| `A0_OBSERVE` | Read, search, simulate, inspect | No signing authority. Read-only capability and receipt. |
| `A1_REVERSIBLE` | Draft, queue, create an undoable low-impact change | Software-backed session authority MAY be used with narrow scope, expiry, and logging. |
| `A2_BOUNDED` | Limited spending, publishing, deployment to a sandbox, restricted API mutation | Hardware-backed or strongly isolated credential SHOULD be used. Explicit policy limits, expiry, destination allowlists, and receipts are REQUIRED. |
| `A3_IRREVERSIBLE` | Mainnet transfer, contract approval, production deployment, destructive action, high-value settlement | Purpose-built signer, HSM, threshold signer, or equivalent isolated authority is REQUIRED. Human-readable verification or an independent trusted verification path is REQUIRED. Opaque signing MUST fail closed or escalate. |
| `A4_ROOT` | Root-key use, governance change, treasury policy change, signer rotation, recovery override | Multi-party quorum, separation of duties, independent devices or authorities, delay or timelock, recovery validation, and complete receipt chain are REQUIRED. |

A dedicated phone may qualify as a cleaner software environment or a bounded hot-wallet host. It MUST NOT be automatically classified as an isolated signer merely because daily-use applications were removed. Its class depends on key residency, transaction rendering, policy enforcement, network exposure, update trust, and recovery design.

## Normative requirements

### 1. Separate proposal from authorization

The component that proposes an action MUST be identified separately from the component that authorizes it.

An ATG action envelope SHOULD include:

```json
{
  "proposal": {
    "agent_id": "agent:planner",
    "mandate_hash": "sha256:...",
    "payload_hash": "sha256:..."
  },
  "authorization": {
    "class": "A3_IRREVERSIBLE",
    "authorizer": "signer:treasury-01",
    "signer_type": "hardware_signer",
    "key_residency": "non_exportable",
    "display_trust": "independent_trusted_path",
    "confirmation": "human_physical",
    "blind_signing": false
  }
}
```

### 2. Bind reviewed intent to executable payload

For `A2_BOUNDED`, `A3_IRREVERSIBLE`, and `A4_ROOT` actions, the system MUST record a binding between:

- the original mandate;
- the machine-readable action;
- the human- or operator-readable representation;
- the exact payload submitted for signing or capability execution;
- the final executed result.

If the payload changes after review, authorization MUST be invalidated and requested again.

### 3. Declare display trust

The authorization envelope MUST declare one of the following display states:

- `independent_trusted_path` — consequential fields are rendered through a path independent of the proposing host;
- `independent_secondary_verification` — a separate verifier reconstructs and compares the action;
- `host_rendered` — the proposing or connected host renders the action;
- `opaque` — the system cannot meaningfully decode the action.

`opaque` MUST NOT satisfy `A3_IRREVERSIBLE` or `A4_ROOT` without an explicit emergency override governed by separate policy and quorum.

### 4. Make blind signing visible and fail closed by default

Blind signing MUST be represented as a machine-readable risk condition.

```json
{
  "risk": {
    "blind_signing": true,
    "reason": "unsupported_contract_parser",
    "required_action": "escalate_or_abort"
  }
}
```

User-interface language MUST NOT imply that an opaque payload was fully verified.

### 5. Enforce authority at runtime

Mandates MUST specify enforceable constraints where supported, including:

- maximum value;
- allowed assets, chains, contracts, repositories, environments, or destinations;
- permitted methods or action types;
- time window and expiry;
- rate and frequency limits;
- required approvers;
- required signer class;
- forbidden fallbacks;
- revocation conditions.

A system that only describes these constraints but cannot block violations MUST label them `advisory`, not `enforced`.

### 6. Prevent silent downgrade

A stronger authorization path MUST NOT silently fall back to a weaker path.

Examples of prohibited downgrade behavior include:

- hardware signer unavailable → software key used automatically;
- clear signing unavailable → blind signing enabled automatically;
- quorum unavailable → single signer accepted automatically;
- policy service unavailable → unrestricted execution allowed;
- receipt service unavailable → settlement proceeds without evidence.

Fallback behavior MUST be explicit, policy-bound, and recorded.

### 7. Produce authorization receipts

For consequential actions, receipts SHOULD include:

```json
{
  "authorization_receipt": {
    "mandate_hash": "sha256:...",
    "policy_decision_hash": "sha256:...",
    "rendered_intent_hash": "sha256:...",
    "payload_hash": "sha256:...",
    "authorization_class": "A3_IRREVERSIBLE",
    "display_trust": "independent_trusted_path",
    "signer_type": "hardware_signer",
    "confirmation": "human_physical",
    "blind_signing": false,
    "fallback_used": false,
    "result_hash": "sha256:...",
    "verification_state": "verified"
  }
}
```

The receipt MUST NOT claim hardware enforcement, human review, clear signing, or non-exportable key residency unless evidence exists to support the claim.

## Performance analysis

The Trusted Authorization Path improves security and audit quality, but it is not free. Agentropolis should apply it by risk class rather than forcing the strongest path onto every action.

| Dimension | Expected effect | Design response |
|---|---|---|
| Security against key extraction | Strong improvement when isolated or non-exportable signers are used | Require signer-class declarations and prohibit unsupported claims. |
| Security against transaction substitution | Strong improvement when reviewed intent is bound to the exact payload | Hash mandate, rendering, payload, and result in the receipt chain. |
| Prompt-injection containment | Strong improvement when agents can propose but cannot self-authorize | Separate proposer, policy gate, signer, and approver identities. |
| Latency | Higher for human review, quorum, hardware interaction, or secondary verification | Reserve stronger paths for higher-risk actions; allow pre-authorized bounded policies for routine operations. |
| Throughput | Lower for `A3` and `A4` actions | Batch only when every operation remains clearly represented and independently verifiable. |
| User experience | More friction and possible approval fatigue | Display only consequential fields, use stable templates, and avoid meaningless confirmations. |
| Engineering complexity | Higher due to parsers, policy engines, signer adapters, receipts, and recovery paths | Implement as reusable ATG fields and ATRALITH adapters rather than per-application logic. |
| Availability | Dedicated signers and quorum can become operational bottlenecks | Define recovery, rotation, backup, break-glass, and delayed execution procedures before production use. |
| Interoperability | Different chains, curves, account models, and signing devices complicate uniform handling | Keep ATG implementation-neutral and declare capabilities instead of assuming one wallet or algorithm. |
| Cost | Hardware, HSM, audits, operations, and support add expense | Scale controls with value-at-risk and irreversibility. |
| Auditability | Major improvement | Make authorization evidence a first-class receipt object. |

### Recommended performance metrics

Implementations SHOULD measure:

- authorization decision latency by class;
- human-review latency;
- signer availability and failure rate;
- clear-rendering coverage;
- blind-signing rate;
- payload-to-rendering mismatch detections;
- policy-block rate and false escalation rate;
- receipt generation and verification latency;
- percentage of actions using silent or explicit fallback;
- recovery time after signer loss, compromise, or rotation.

### Required security targets

For `A3_IRREVERSIBLE` and `A4_ROOT` actions:

- blind-signing acceptance target: **zero by default**;
- silent authorization downgrade target: **zero**;
- payload-binding coverage target: **100%**;
- verified receipt coverage target: **100%**;
- agent self-authorization target: **zero**, unless a separately governed bounded policy explicitly delegates that authority.

These are protocol targets, not claims that the current public prototype already satisfies them.

## Agentropolis integration

### ATG protocol

ATG owns the normative fields for authorization class, signer type, key residency, display trust, confirmation mode, blind-signing state, fallback state, policy decision, and receipt binding.

### ATRALITH Agent Kit

ATRALITH should implement:

- authorization-class evaluation;
- wallet, passkey, hardware-signer, HSM, and threshold adapters;
- payload and rendering hash generation;
- clear-signing metadata resolution where applicable;
- policy enforcement and downgrade prevention;
- receipt generation and verification;
- recovery and signer-rotation workflows.

### AGENTROPOLIS Mission Control

Mission Control should display the authority path as a visible chain:

```text
MANDATE → POLICY GATE → PROPOSAL → VERIFIED RENDERING → AUTHORIZATION → EXECUTION → RECEIPT
```

Mission Control must show where the chain becomes advisory, opaque, simulated, unavailable, or downgraded.

### AEGIS / policy and risk layer

AEGIS should:

- assign or validate the authorization class;
- reject actions whose signer class is weaker than policy requires;
- escalate opaque payloads;
- detect silent downgrade attempts;
- require quorum or delay for root changes;
- attach risk reasons to the receipt.

### NTRU / trust layer

NTRU should verify signatures, attestations, hashes, receipt chains, and signer capability claims without assuming that every valid signature represents informed authorization.

## Failure modes and limits

This doctrine can fail when:

- users approve malicious but clearly displayed actions;
- parsers or metadata provide a misleading interpretation;
- trusted-display firmware is compromised;
- a signer is genuine but the recovery phrase is stolen;
- a multi-signature quorum is socially captured;
- recovery procedures bypass normal controls;
- policy limits are too broad;
- operators develop confirmation fatigue;
- the system records claims without evidence.

Therefore, the Trusted Authorization Path complements—but does not replace—education, simulation, allowlists, transaction analysis, rate limits, separation of duties, audits, secure recovery, and incident response.

## Decision

Agentropolis SHOULD adopt this philosophy.

The decisive principle is not “hardware wallet over phone.” It is:

> **Authority must be protected by a trust boundary appropriate to the consequence of the action, and the system must separately prove custody, intent, scope, and receipt.**

A dedicated phone can be useful as a reduced-exposure host, session wallet, or bounded operational device. It should not be treated as equivalent to a purpose-built isolated signer for significant or irreversible authority unless the actual implementation proves equivalent key isolation, trusted rendering, payload binding, policy enforcement, and recovery controls.

## References

- NIST, Least Privilege: https://csrc.nist.gov/glossary/term/least_privilege
- NIST, Least Trust: https://csrc.nist.gov/glossary/term/least_trust
- NIST, Trusted Computing Base: https://csrc.nist.gov/glossary/term/trusted_computing_base
- NIST, Trusted Path: https://csrc.nist.gov/glossary/term/trusted_path
- Apple, Protecting Keys with the Secure Enclave: https://developer.apple.com/documentation/security/protecting-keys-with-the-secure-enclave
- Apple, SecureEnclave.P256.Signing: https://developer.apple.com/documentation/cryptokit/secureenclave/p256/signing
- ERC-7730, Structured Data Clear Signing Format: https://eips.ethereum.org/EIPS/eip-7730
- Ledger Developer Portal, Clear Signing Overview: https://developers.ledger.com/docs/clear-signing/overview
