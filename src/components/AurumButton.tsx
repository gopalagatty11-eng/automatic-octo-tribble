/**
 * AurumButton — Premium gold-accent button
 */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AurumColors, AurumRadius, AurumSpacing, AurumTypography } from '../theme';

interface AurumButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function AurumButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}: AurumButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? AurumColors.black : AurumColors.gold} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              styles[`text_${variant}`],
              styles[`textSize_${size}`],
              icon ? { marginLeft: AurumSpacing.sm } : undefined,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AurumRadius.md,
  },
  primary: {
    backgroundColor: AurumColors.gold,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: AurumColors.goldBorder,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  size_sm: {
    paddingVertical: AurumSpacing.sm,
    paddingHorizontal: AurumSpacing.md,
  },
  size_md: {
    paddingVertical: AurumSpacing.md + 2,
    paddingHorizontal: AurumSpacing.xl,
  },
  size_lg: {
    paddingVertical: AurumSpacing.lg,
    paddingHorizontal: AurumSpacing.xxl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...AurumTypography.label,
  },
  text_primary: {
    color: AurumColors.black,
  },
  text_secondary: {
    color: AurumColors.gold,
  },
  text_ghost: {
    color: AurumColors.gold,
  },
  textSize_sm: {
    fontSize: 12,
  },
  textSize_md: {
    fontSize: 14,
  },
  textSize_lg: {
    fontSize: 16,
  },
});
