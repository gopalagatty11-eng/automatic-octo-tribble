/**
 * SearchBar — Gold-accented search input
 */
import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { AurumColors, AurumRadius, AurumSpacing, AurumTypography } from '../theme';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
}

export function SearchBar({
  placeholder = 'Search notes...',
  value,
  onChangeText,
  style,
}: SearchBarProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={AurumColors.textTertiary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AurumColors.darkGlass,
    borderRadius: AurumRadius.md,
    borderWidth: 1,
    borderColor: AurumColors.glassBorder,
    paddingHorizontal: AurumSpacing.md,
    marginHorizontal: AurumSpacing.xl,
    height: 44,
  },
  icon: {
    fontSize: 18,
    color: AurumColors.textTertiary,
    marginRight: AurumSpacing.sm,
  },
  input: {
    flex: 1,
    ...AurumTypography.body,
    color: AurumColors.textPrimary,
    padding: 0,
  },
});
