/**
 * QuickAction — Small gold-bordered action pill
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { AurumColors, AurumRadius, AurumSpacing, AurumTypography } from '../theme';

interface QuickActionProps {
  icon: string;
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function QuickAction({ icon, label, onPress, style }: QuickActionProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AurumColors.darkGlass,
    borderRadius: AurumRadius.md,
    borderWidth: 1,
    borderColor: AurumColors.glassBorder,
    paddingVertical: AurumSpacing.lg,
    paddingHorizontal: AurumSpacing.md,
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginBottom: AurumSpacing.sm,
  },
  label: {
    ...AurumTypography.labelSmall,
    color: AurumColors.textSecondary,
    textAlign: 'center',
  },
});
