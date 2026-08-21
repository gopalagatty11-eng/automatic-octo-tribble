/**
 * HomeScreen — AURUM NOTE main dashboard
 * Now receives notes from persistent storage, computes live stats
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenContainer, AurumCard, QuickAction, NoteCard } from '../components';
import { Note } from '../models';
import { AurumColors, AurumSpacing, AurumTypography } from '../theme';

interface HomeScreenProps {
  notes: Note[];
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ notes, onNavigate }: HomeScreenProps) {
  const recentNotes = notes.slice(0, 3);
  const totalPhotos = notes.filter((n) => n.hasPhoto).length;
  const totalCalcs = notes.filter((n) => n.hasCalc).length;

  return (
    <ScreenContainer scroll>
      {/* Status bar placeholder area */}
      <View style={styles.statusBar} />

      {/* App title */}
      <View style={styles.titleContainer}>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.appName}>AURUM NOTE</Text>
      </View>

      {/* Quick Stats — computed from real data */}
      <View style={styles.statsRow}>
        <AurumCard variant="subtle" style={styles.statCard} padding={AurumSpacing.md}>
          <Text style={styles.statValue}>{notes.length}</Text>
          <Text style={styles.statLabel}>NOTES</Text>
        </AurumCard>
        <AurumCard variant="subtle" style={styles.statCard} padding={AurumSpacing.md}>
          <Text style={styles.statValue}>{totalPhotos}</Text>
          <Text style={styles.statLabel}>PHOTOS</Text>
        </AurumCard>
        <AurumCard variant="subtle" style={styles.statCard} padding={AurumSpacing.md}>
          <Text style={styles.statValue}>{totalCalcs}</Text>
          <Text style={styles.statLabel}>CALCS</Text>
        </AurumCard>
      </View>

      {/* Quick Actions */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
      </View>
      <View style={styles.quickActions}>
        <QuickAction
          icon="✎"
          label="New Note"
          onPress={() => onNavigate('new-note')}
        />
        <QuickAction
          icon="◉"
          label="Photo Note"
          onPress={() => onNavigate('photo-note')}
        />
        <QuickAction
          icon="fx"
          label="Calculator"
          onPress={() => onNavigate('calculator')}
        />
      </View>

      {/* Recent Notes — from storage */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>RECENT NOTES</Text>
        <TouchableOpacity onPress={() => onNavigate('notes')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {recentNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onPress={() => onNavigate('notes')}
        />
      ))}

      {/* Gold divider */}
      <View style={styles.divider} />

      {/* Version */}
      <Text style={styles.version}>AURUM NOTE v2.0 — Premium Edition</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: 20,
  },
  titleContainer: {
    paddingHorizontal: AurumSpacing.xl,
    marginBottom: AurumSpacing.xl,
  },
  greeting: {
    ...AurumTypography.body,
    color: AurumColors.textTertiary,
    marginBottom: AurumSpacing.xs,
  },
  appName: {
    ...AurumTypography.hero,
    color: AurumColors.gold,
    letterSpacing: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: AurumSpacing.xl,
    gap: AurumSpacing.sm,
    marginBottom: AurumSpacing.xxl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...AurumTypography.titleLarge,
    color: AurumColors.gold,
    marginBottom: AurumSpacing.xs,
  },
  statLabel: {
    ...AurumTypography.labelSmall,
    color: AurumColors.textTertiary,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: AurumSpacing.xl,
    marginBottom: AurumSpacing.md,
  },
  sectionTitle: {
    ...AurumTypography.label,
    color: AurumColors.textTertiary,
    letterSpacing: 1.5,
  },
  seeAll: {
    ...AurumTypography.bodySmall,
    color: AurumColors.gold,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: AurumSpacing.xl,
    gap: AurumSpacing.sm,
    marginBottom: AurumSpacing.xxl,
  },
  divider: {
    height: 1,
    backgroundColor: AurumColors.goldBorder,
    marginHorizontal: AurumSpacing.xl,
    marginTop: AurumSpacing.xxl,
    marginBottom: AurumSpacing.lg,
  },
  version: {
    ...AurumTypography.labelSmall,
    color: AurumColors.textTertiary,
    textAlign: 'center',
    letterSpacing: 2,
  },
});
