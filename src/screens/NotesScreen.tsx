/**
 * NotesScreen — Full notes list with search and filtering
 * Now receives notes from persistent storage
 */
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenContainer, SearchBar, NoteCard, AurumHeader } from '../components';
import { Note } from '../models';
import { AurumColors, AurumSpacing, AurumTypography } from '../theme';

const FILTER_TAGS = ['All', 'Strategy', 'Clients', 'Product', 'Finance', 'Design', 'Engineering', 'Personal'];

interface NotesScreenProps {
  notes: Note[];
  onNavigate: (screen: string) => void;
}

export function NotesScreen({ notes, onNavigate }: NotesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        searchQuery === '' ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = activeFilter === 'All' || note.tags.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [notes, searchQuery, activeFilter]);

  return (
    <ScreenContainer>
      <AurumHeader
        title="All Notes"
        subtitle={`${filteredNotes.length} notes`}
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search notes..."
      />

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {FILTER_TAGS.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[styles.chip, activeFilter === tag && styles.chipActive]}
            onPress={() => setActiveFilter(tag)}
          >
            <Text
              style={[styles.chipText, activeFilter === tag && styles.chipTextActive]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notes list */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard note={item} onPress={() => {}} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✎</Text>
            <Text style={styles.emptyText}>No notes yet</Text>
            <Text style={styles.emptySubtext}>Tap + to create your first note</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: AurumSpacing.xl,
    gap: AurumSpacing.sm,
    marginVertical: AurumSpacing.md,
  },
  chip: {
    paddingHorizontal: AurumSpacing.md,
    paddingVertical: AurumSpacing.xs + 2,
    borderRadius: AurumSpacing.md,
    backgroundColor: AurumColors.darkGlass,
    borderWidth: 1,
    borderColor: AurumColors.glassBorder,
  },
  chipActive: {
    backgroundColor: AurumColors.goldDim,
    borderColor: AurumColors.gold,
  },
  chipText: {
    ...AurumTypography.labelSmall,
    color: AurumColors.textSecondary,
    fontSize: 11,
    textTransform: 'none',
  },
  chipTextActive: {
    color: AurumColors.gold,
  },
  listContent: {
    paddingTop: AurumSpacing.sm,
    paddingBottom: 120,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: AurumSpacing.giant * 2,
  },
  emptyIcon: {
    fontSize: 48,
    color: AurumColors.gold,
    marginBottom: AurumSpacing.lg,
  },
  emptyText: {
    ...AurumTypography.title,
    color: AurumColors.textSecondary,
    marginBottom: AurumSpacing.sm,
  },
  emptySubtext: {
    ...AurumTypography.bodySmall,
    color: AurumColors.textTertiary,
  },
});
