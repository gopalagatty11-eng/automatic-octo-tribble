/**
 * AURUM NOTE v2 — Design Tokens: Colors
 * Champagne-gold metallic + dark glass aesthetic
 */

export const AurumColors = {
  // Core palette
  black: '#0A0A0A',
  blackLight: '#111111',
  darkGlass: '#1A1A1A',
  darkGlassLight: '#222222',
  darkGlassElevated: '#2A2A2A',

  // Gold spectrum
  gold: '#C9A96E',
  goldLight: '#E8D5A8',
  goldMuted: '#8B7340',
  goldDim: 'rgba(201, 169, 110, 0.15)',
  goldBorder: 'rgba(201, 169, 110, 0.3)',
  goldGlow: 'rgba(201, 169, 110, 0.08)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9A9A9A',
  textTertiary: '#666666',
  textGold: '#C9A96E',

  // Semantic
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Glass surfaces
  glass: 'rgba(26, 26, 26, 0.85)',
  glassBorder: 'rgba(201, 169, 110, 0.2)',
  glassHighlight: 'rgba(255, 255, 255, 0.05)',

  // Gradients (start, end)
  gradient: {
    screen: ['#0A0A0A', '#111111', '#0D0D0D'] as const,
    card: ['#1E1E1E', '#161616'] as const,
    gold: ['#C9A96E', '#A88B4A'] as const,
    goldSubtle: ['#2A2418', '#1A1610'] as const,
  },
} as const;

export type AurumColor = keyof typeof AurumColors;
