/**
 * AurumCard — Glass-morphism card with gold accent border
 */
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { AurumColors, AurumRadius, AurumSpacing, AurumShadows } from '../theme';

interface AurumCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'subtle';
  goldBorder?: boolean;
  padding?: number;
}

export function AurumCard({
  children,
  style,
  variant = 'default',
  goldBorder = false,
  padding = AurumSpacing.lg,
}: AurumCardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        variant === 'subtle' && styles.subtle,
        goldBorder && styles.goldBorder,
        { padding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AurumColors.darkGlass,
    borderRadius: AurumRadius.lg,
    borderWidth: 1,
    borderColor: AurumColors.glassBorder,
    ...AurumShadows.card,
  },
  elevated: {
    backgroundColor: AurumColors.darkGlassElevated,
    ...AurumShadows.elevated,
  },
  subtle: {
    backgroundColor: AurumColors.glass,
    borderWidth: 0,
    ...AurumShadows.subtle,
  },
  goldBorder: {
    borderColor: AurumColors.goldBorder,
    borderWidth: 1,
  },
});
