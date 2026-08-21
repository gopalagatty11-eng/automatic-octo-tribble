/**
 * AURUM NOTE v2 — Design Tokens: Typography
 * Restrained, editorial, premium feel
 */
import { TextStyle } from 'react-native';

const fontFamily = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
} as const;

export const AurumTypography = {
  // Display / Hero
  heroLarge: {
    fontFamily: fontFamily.bold,
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
    letterSpacing: 0.4,
  } as TextStyle,

  hero: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: 0.3,
  } as TextStyle,

  // Titles
  titleLarge: {
    fontFamily: fontFamily.semibold,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0.2,
  } as TextStyle,

  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 25,
    letterSpacing: 0.15,
  } as TextStyle,

  titleSmall: {
    fontFamily: fontFamily.semibold,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.1,
  } as TextStyle,

  // Body
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.1,
  } as TextStyle,

  body: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.1,
  } as TextStyle,

  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.1,
  } as TextStyle,

  // Labels
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  } as TextStyle,

  labelSmall: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  } as TextStyle,

  // Caption
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.2,
  } as TextStyle,
} as const;

export type TypographyKey = keyof typeof AurumTypography;
