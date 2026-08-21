/**
 * NewNoteScreen — Create a new note (now saves to AsyncStorage)
 */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AurumButton, AurumCard } from '../components';
import { NoteInput } from '../models';
import { AurumColors, AurumSpacing, AurumRadius, AurumTypography } from '../theme';

interface NewNoteScreenProps {
  onNavigate: (screen: string) => void;
  onBack?: () => void;
  onSave?: (input: NoteInput) => void;
}

export function NewNoteScreen({ onNavigate, onBack, onSave }: NewNoteScreenProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const TAGS = ['Strategy', 'Clients', 'Product', 'Finance', 'Personal'];

  const handleSave = async () => {
    if (!title.trim()) return;
    const input: NoteInput = {
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleString(),
      tags: selectedTag ? [selectedTag] : [],
      hasPhoto: false,
      hasCalc: false,
    };
    onSave?.(input);
    onBack?.();
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Note</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.body}>
        {/* Title input */}
        <TextInput
          style={styles.titleInput}
          placeholder="Note title"
          placeholderTextColor={AurumColors.textTertiary}
          value={title}
          onChangeText={setTitle}
        />

        {/* Tag selector */}
        <View style={styles.tagRow}>
          {TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.tag, selectedTag === tag && styles.tagActive]}
              onPress={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              <Text style={[styles.tagText, selectedTag === tag && styles.tagTextActive]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content editor */}
        <AurumCard variant="subtle" style={styles.editorCard} padding={AurumSpacing.lg}>
          <TextInput
            style={styles.contentInput}
            placeholder="Start writing..."
            placeholderTextColor={AurumColors.textTertiary}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </AurumCard>

        {/* Attachments row */}
        <View style={styles.attachRow}>
          <TouchableOpacity style={styles.attachButton} onPress={() => onNavigate('photo-note')}>
            <Text style={styles.attachIcon}>◉</Text>
            <Text style={styles.attachLabel}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attachButton} onPress={() => onNavigate('calculator')}>
            <Text style={styles.attachIcon}>fx</Text>
            <Text style={styles.attachLabel}>Calculator</Text>
          </TouchableOpacity>
        </View>

        {/* Save button */}
        <AurumButton
          title="Save Note"
          onPress={handleSave}
          variant="primary"
          size="lg"
          style={styles.saveButton}
          disabled={!title.trim()}
        />
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
  titleInput: {
    ...AurumTypography.titleLarge,
    color: AurumColors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: AurumColors.goldBorder,
    paddingVertical: AurumSpacing.md,
    marginBottom: AurumSpacing.lg,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: AurumSpacing.sm,
    marginBottom: AurumSpacing.xl,
  },
  tag: {
    paddingHorizontal: AurumSpacing.md,
    paddingVertical: AurumSpacing.xs + 2,
    borderRadius: AurumRadius.pill,
    backgroundColor: AurumColors.darkGlass,
    borderWidth: 1,
    borderColor: AurumColors.glassBorder,
  },
  tagActive: {
    backgroundColor: AurumColors.goldDim,
    borderColor: AurumColors.gold,
  },
  tagText: {
    ...AurumTypography.labelSmall,
    color: AurumColors.textSecondary,
    textTransform: 'none',
  },
  tagTextActive: {
    color: AurumColors.gold,
  },
  editorCard: {
    minHeight: 280,
    marginBottom: AurumSpacing.xl,
  },
  contentInput: {
    ...AurumTypography.body,
    color: AurumColors.textPrimary,
    minHeight: 240,
  },
  attachRow: {
    flexDirection: 'row',
    gap: AurumSpacing.md,
    marginBottom: AurumSpacing.xxl,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AurumColors.darkGlass,
    borderRadius: AurumRadius.md,
    borderWidth: 1,
    borderColor: AurumColors.glassBorder,
    paddingHorizontal: AurumSpacing.lg,
    paddingVertical: AurumSpacing.md,
    gap: AurumSpacing.sm,
  },
  attachIcon: {
    fontSize: 16,
    color: AurumColors.gold,
  },
  attachLabel: {
    ...AurumTypography.bodySmall,
    color: AurumColors.textSecondary,
  },
  saveButton: {
    width: '100%',
  },
});
