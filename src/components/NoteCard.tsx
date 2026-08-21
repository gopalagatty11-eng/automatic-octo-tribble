/**
 * NoteCard — Compact editorial note card
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { AurumColors, AurumRadius, AurumSpacing, AurumShadows, AurumTypography } from '../theme';

export interface Note {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  hasPhoto?: boolean;
  hasCalc?: boolean;
}

interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
  style?: ViewStyle;
}

export function NoteCard({ note, onPress, style }: NoteCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => onPress(note)}
      activeOpacity={0.7}
    >
      {/* Gold top accent line */}
      <View style={styles.accentLine} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {note.title}
          </Text>
          <View style={styles.indicators}>
            {note.hasPhoto && <Text style={styles.indicator}>◉</Text>}
            {note.hasCalc && <Text style={styles.indicator}>fx</Text>}
          </View>
        </View>

        <Text style={styles.excerpt} numberOfLines={2}>
          {note.excerpt}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.date}>{note.date}</Text>
          {note.tags && note.tags.length > 0 && (
            <View style={styles.tags}>
              {note.tags.slice(0, 2).map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AurumColors.darkGlass,
    borderRadius: AurumRadius.lg,
    borderWidth: 1,
    borderColor: AurumColors.glassBorder,
    marginHorizontal: AurumSpacing.xl,
    marginBottom: AurumSpacing.md,
    overflow: 'hidden',
    ...AurumShadows.card,
  },
  accentLine: {
    height: 2,
    backgroundColor: AurumColors.gold,
    opacity: 0.6,
  },
  content: {
    padding: AurumSpacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AurumSpacing.sm,
  },
  title: {
    ...AurumTypography.titleSmall,
    color: AurumColors.textPrimary,
    flex: 1,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AurumSpacing.sm,
    marginLeft: AurumSpacing.sm,
  },
  indicator: {
    fontSize: 12,
    color: AurumColors.gold,
    fontWeight: '600',
  },
  excerpt: {
    ...AurumTypography.bodySmall,
    color: AurumColors.textSecondary,
    marginBottom: AurumSpacing.md,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    ...AurumTypography.caption,
    color: AurumColors.textTertiary,
  },
  tags: {
    flexDirection: 'row',
    gap: AurumSpacing.xs,
  },
  tag: {
    backgroundColor: AurumColors.goldDim,
    borderRadius: AurumRadius.xs,
    paddingHorizontal: AurumSpacing.sm,
    paddingVertical: AurumSpacing.xxs,
  },
  tagText: {
    ...AurumTypography.labelSmall,
    color: AurumColors.gold,
    fontSize: 10,
  },
});
