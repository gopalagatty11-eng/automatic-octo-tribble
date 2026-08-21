/**
 * AURUM NOTE v2 — Design Tokens: Spacing & Radius
 */

export const AurumSpacing = {
  /** 2 */
  xxs: 2,
  /** 4 */
  xs: 4,
  /** 8 */
  sm: 8,
  /** 12 */
  md: 12,
  /** 16 */
  lg: 16,
  /** 20 */
  xl: 20,
  /** 24 */
  xxl: 24,
  /** 32 */
  xxxl: 32,
  /** 40 */
  huge: 40,
  /** 48 */
  massive: 48,
  /** 64 */
  giant: 64,
} as const;

export const AurumRadius = {
  /** 4 */
  xs: 4,
  /** 8 */
  sm: 8,
  /** 12 */
  md: 12,
  /** 16 */
  lg: 16,
  /** 20 */
  xl: 20,
  /** 24 */
  xxl: 24,
  /** 32 */
  round: 32,
  /** 999 */
  pill: 999,
} as const;

export const AurumShadows = {
  card: {
    shadowColor: '#C9A96E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  subtle: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;
