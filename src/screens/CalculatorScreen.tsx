/**
 * CalculatorScreen — Premium calculator with gold accent display
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../components';
import { AurumColors, AurumSpacing, AurumRadius, AurumTypography } from '../theme';

interface CalculatorScreenProps {
  onNavigate: (screen: string) => void;
  onBack?: () => void;
}

export function CalculatorScreen({ onNavigate, onBack }: CalculatorScreenProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (previousValue !== null && operation && !resetDisplay) {
      const result = calculate(previousValue, current, operation);
      setDisplay(formatNumber(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(current);
    }
    setOperation(op);
    setResetDisplay(true);
  };

  const handleEquals = () => {
    if (previousValue === null || !operation) return;
    const current = parseFloat(display);
    const result = calculate(previousValue, current, operation);
    setDisplay(formatNumber(result));
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    setDisplay(formatNumber(current / 100));
  };

  const handleNegate = () => {
    const current = parseFloat(display);
    setDisplay(formatNumber(-current));
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const formatNumber = (num: number): string => {
    if (Number.isInteger(num)) return num.toString();
    return parseFloat(num.toFixed(8)).toString();
  };

  const buttons = [
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const handleButtonPress = (btn: string) => {
    switch (btn) {
      case 'AC': handleClear(); break;
      case '±': handleNegate(); break;
      case '%': handlePercent(); break;
      case '=': handleEquals(); break;
      case '+': case '−': case '×': case '÷': handleOperation(btn); break;
      default: handleNumber(btn); break;
    }
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calculator</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.body}>
        {/* Display */}
        <View style={styles.displayContainer}>
          {previousValue !== null && operation && (
            <Text style={styles.operationText}>
              {formatNumber(previousValue)} {operation}
            </Text>
          )}
          <Text style={styles.displayText} numberOfLines={1}>
            {display}
          </Text>
        </View>

        {/* Button grid */}
        <View style={styles.buttonGrid}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.buttonRow}>
              {row.map((btn) => {
                const isOp = ['÷', '×', '−', '+', '='].includes(btn);
                const isFunction = ['AC', '±', '%'].includes(btn);
                const isWide = btn === '0' && rowIndex === 4;

                return (
                  <TouchableOpacity
                    key={btn}
                    style={[
                      styles.button,
                      isOp && styles.buttonOp,
                      isFunction && styles.buttonFunction,
                      isWide && styles.buttonWide,
                    ]}
                    onPress={() => handleButtonPress(btn)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        isOp && styles.buttonTextOp,
                        isFunction && styles.buttonTextFunction,
                      ]}
                    >
                      {btn}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Save result button */}
        <TouchableOpacity
          style={styles.saveResult}
          onPress={() => onBack?.()}
        >
          <Text style={styles.saveResultText}>Save Result to Note</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: AurumSpacing.xl,
    paddingVertical: AurumSpacing.lg,
  },
  backButton: {
    width: 60,
  },
  backText: {
    ...AurumTypography.body,
    color: AurumColors.gold,
  },
  headerTitle: {
    ...AurumTypography.title,
    color: AurumColors.textPrimary,
  },
  body: {
    flex: 1,
    paddingHorizontal: AurumSpacing.xl,
  },
  displayContainer: {
    backgroundColor: AurumColors.darkGlass,
    borderRadius: AurumRadius.lg,
    borderWidth: 1,
    borderColor: AurumColors.goldBorder,
    padding: AurumSpacing.xxl,
    marginBottom: AurumSpacing.xxl,
    alignItems: 'flex-end',
    minHeight: 120,
    justifyContent: 'flex-end',
  },
  operationText: {
    ...AurumTypography.body,
    color: AurumColors.textTertiary,
    marginBottom: AurumSpacing.xs,
  },
  displayText: {
    fontSize: 48,
    fontWeight: '300',
    color: AurumColors.gold,
    letterSpacing: -1,
  },
  buttonGrid: {
    flex: 1,
    gap: AurumSpacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: AurumSpacing.sm,
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AurumColors.darkGlass,
    borderRadius: AurumRadius.md,
    borderWidth: 1,
    borderColor: AurumColors.glassBorder,
  },
  buttonOp: {
    backgroundColor: AurumColors.gold,
    borderColor: AurumColors.gold,
  },
  buttonFunction: {
    backgroundColor: AurumColors.darkGlassElevated,
  },
  buttonWide: {
    flex: 2.08, // roughly 2 buttons + gap
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '400',
    color: AurumColors.textPrimary,
  },
  buttonTextOp: {
    color: AurumColors.black,
    fontWeight: '600',
  },
  buttonTextFunction: {
    color: AurumColors.gold,
  },
  saveResult: {
    alignItems: 'center',
    paddingVertical: AurumSpacing.lg,
    marginBottom: AurumSpacing.xxl,
    borderRadius: AurumRadius.md,
    borderWidth: 1,
    borderColor: AurumColors.goldBorder,
    backgroundColor: AurumColors.goldDim,
  },
  saveResultText: {
    ...AurumTypography.label,
    color: AurumColors.gold,
    letterSpacing: 1,
  },
});
