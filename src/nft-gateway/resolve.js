const FORBIDDEN_KEYS = new Set([
  'seed_phrase',
  'mnemonic',
  'private_key',
  'secret_key',
  'wallet_approval',
  'delegate_authority',
  'transaction_signing_permission'
]);

const CHAINS = new Set([
  'dogechain',
  'solchain',
  'ethereum',
  'base',
  'bitcoin',
  'polygon',
  'other'
]);

const ASSURANCE_ORDER = [
  'IMAGE_ONLY',
  'ASSET_LOCATED',
  'COLLECTION_VERIFIED',
  'OWNERSHIP_OBSERVED',
  '