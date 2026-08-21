/**
 * FloatingAction — Gold floating action button
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { AurumColors, AurumRadius, AurumShadows } from '../theme';

interface FloatingActionProps {
  onPress: () => void;
  icon?: string;
  style?: ViewStyle;
}

export function FloatingAction({ onPress, icon = '+', style }: FloatingActionProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{icon}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AurumColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    ...AurumShadows.elevated,
  },
  icon: {
    fontSize: 28,
    fontWeight: '300',
    color: AurumColors.black,
    marginTop: -1,
  },
});
