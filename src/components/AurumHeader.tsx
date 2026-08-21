/**
 * AurumHeader — Screen header with gold accent
 */
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { AurumColors, AurumSpacing, AurumTypography } from '../theme';

interface AurumHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export function AurumHeader({ title, subtitle, rightAction, style }: AurumHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightAction && <View>{rightAction}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: AurumSpacing.xl,
    paddingVertical: AurumSpacing.lg,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    ...AurumTypography.titleLarge,
    color: AurumColors.textPrimary,
  },
  subtitle: {
    ...AurumTypography.caption,
    color: AurumColors.textTertiary,
    marginTop: AurumSpacing.xs,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
