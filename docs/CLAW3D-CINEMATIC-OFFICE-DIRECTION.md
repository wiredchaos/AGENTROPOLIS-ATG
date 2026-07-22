# Claw3D Cinematic Office Direction

## Decision

AGENTROPOLIS may use Claw3D as a spatial and interaction foundation, but it must not inherit Claw3D's default retro, pixelated, 8-bit, voxel, or arcade visual language.

The target is a high-fidelity browser-based 3D office and command-center environment with cinematic urban realism.

## Visual target

- Realistic 3D office environment
- Octane-render look and material quality
- Grand Theft Auto-style urban realism and attitude
- Dark executive mission-control headquarters
- Obsidian, smoked glass, brushed metal, polished concrete
- Red and cyan operational accents with restrained lime, magenta, and violet status colors
- Cinematic reflections, volumetric light, depth, shadows, and atmospheric haze
- Agents represented as premium 3D workers or avatars, not sprites

## Explicitly prohibited

- Pixel art
- 8-bit or 16-bit styling
- Voxel worlds
- Retro arcade typography
- Synthwave parody
- Toy-like low-poly offices
- Static skyline art presented as a 3D integration
- CSS-only fake 3D substituted for an actual WebGL or WebGPU scene

## Environment model

The primary experience should be a navigable AGENTROPOLIS headquarters rather than a decorative city map.

### Recommended layout

- Mission Control: central operations floor with live HUD overlays
- Governance Tower: boardroom, policy console, intervention controls, and mandate review
- Identity Plaza: registration, credentials, permissions, and entity verification
- Skill Registry: agent staffing floor and capability assignment
- Vault: hardened secure data room for secrets, keys, and protected memory
- Finance: trading-floor-inspired economic operations room
- Opportunity: contracts, assignments, bounties, and market intake
- Audit and Receipt Chamber: execution receipts, lineage, evidence, and replay
- Dispatch Bay: authorized agent spawn and deployment zone

## Architecture boundary

Claw3D is the spatial visualization and interaction layer only.

```text
Human Mission Control
        -> Mandate + Policy
CHAOS RANK / ATG routing
        -> authorization decision
Sandboxed execution
        -> result + evidence
Receipt and audit ledger
        -> visualization state
Claw3D cinematic office layer
```

The 3D client must never self-authorize an agent, expand authority, bypass a policy gate, or claim execution occurred without a receipt-backed state transition.

## Required behavior

### Live 3D route

Add a first-class `/office` or `/city` route that renders an actual Three.js, React Three Fiber, WebGL, or WebGPU scene.

### View modes

Provide:

- `MAP`
- `LIVE 3D`
- `MISSION CONTROL`

The current district map may remain as a navigation mode, but it cannot be the only visual implementation.

### Spawn Agent flow

`SPAWN AGENT` must:

1. Create or select an entity identity.
2. Define a mandate.
3. Evaluate permissions and policy.
4. Dispatch through the ATG-compatible runtime seam.
5. Return an execution or preview ID.
6. Instantiate the approved agent in the 3D office.
7. Surface status, evidence, and receipt state.

Until live execution exists, label all behavior truthfully as simulated, preview, pending verification, or unsigned preview.

### HUD

Preserve operational telemetry over the 3D world:

- cash flow
- active agents
- skill queue
- risk state
- mandate status
- receipt status
- halt / revoke controls

## Mobile behavior

- Use a cinematic guided camera rather than unrestricted first-person movement on small screens.
- Maintain usable touch targets and safe-area spacing.
- Reduce post-processing quality dynamically for thermal and battery limits.
- Provide a static but premium fallback image only when the renderer cannot initialize.

## Performance budget

- Progressive loading for 3D assets
- Compressed glTF or GLB assets
- Texture compression where supported
- Level of detail for distant assets
- Instancing for repeated office objects
- Adaptive device pixel ratio
- Reduced-motion support
- WebGL fallback when WebGPU is unavailable

## Acceptance criteria

- A real live 3D office route exists.
- The default visual presentation is not pixelated, retro, voxel, or 8-bit.
- At least one agent avatar appears in the environment.
- Governance Tower, Vault, Finance, and Skill Registry are navigable zones.
- HUD telemetry overlays the scene.
- Spawn Agent produces a traceable simulated or live state transition.
- Every consequential state is truth-labeled.
- The 3D layer cannot bypass ATG authorization or receipt requirements.
- Desktop and mobile screenshots are included as proof.
