/**
 * PhotoNoteScreen — Photo note with annotation and capture
 */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScreenContainer, AurumButton, AurumCard } from '../components';
import { AurumColors, AurumSpacing, AurumRadius, AurumTypography } from '../theme';

interface PhotoNoteScreenProps {
  onNavigate: (screen: string) => void;
  onBack?: () => void;
}

export function PhotoNoteScreen({ onNavigate, onBack }: PhotoNoteScreenProps) {
  const [caption, setCaption] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  const handleCapture = () => {
    // TODO: integrate camera
    setHasPhoto(true);
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Photo Note</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.body}>
        {/* Photo area */}
        <AurumCard variant="subtle" style={styles.photoArea} padding={0}>
          {hasPhoto ? (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderIcon}>◉</Text>
              <Text style={styles.photoPlaceholderText}>Photo captured</Text>
              <Text style={styles.photoPlaceholderSub}>Tap to edit or retake</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
              <View style={styles.captureRing}>
                <Text style={styles.captureIcon}>◉</Text>
              </View>
              <Text style={styles.captureLabel}>Tap to capture</Text>
            </TouchableOpacity>
          )}
        </AurumCard>

        {/* Caption */}
        <View style={styles.captionSection}>
          <Text style={styles.fieldLabel}>CAPTION</Text>
          <AurumCard variant="subtle" padding={AurumSpacing.md}>
            <TextInput
              style={styles.captionInput}
              placeholder="Add a note about this photo..."
              placeholderTextColor={AurumColors.textTertiary}
              value={caption}
              onChangeText={setCaption}
              multiline
            />
          </AurumCard>
        </View>

        {/* Quick tags */}
        <View style={styles.captionSection}>
          <Text style={styles.fieldLabel}>QUICK TAGS</Text>
          <View style={styles.tagRow}>
            {['Receipt', 'Document', 'Whiteboard', 'Screenshot'].map((tag) => (
              <TouchableOpacity key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <AurumButton
            title="Save Photo Note"
            onPress={() => {
              console.log('Saving photo note');
              onBack?.();
            }}
            variant="primary"
            size="lg"
            style={{ flex: 1 }}
          />
        </View>
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
  photoArea: {
    height: 300,
    marginBottom: AurumSpacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: AurumColors.goldBorder,
    borderStyle: 'dashed',
  },
  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AurumColors.darkGlass,
  },
  photoPlaceholderIcon: {
    fontSize: 48,
    color: AurumColors.gold,
    marginBottom: AurumSpacing.md,
  },
  photoPlaceholderText: {
    ...AurumTypography.titleSmall,
    color: AurumColors.textPrimary,
  },
  photoPlaceholderSub: {
    ...AurumTypography.caption,
    color: AurumColors.textTertiary,
    marginTop: AurumSpacing.xs,
  },
  captureButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: AurumColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: AurumSpacing.lg,
  },
  captureIcon: {
    fontSize: 32,
    color: AurumColors.gold,
  },
  captureLabel: {
    ...AurumTypography.bodySmall,
    color: AurumColors.textSecondary,
  },
  captionSection: {
    marginBottom: AurumSpacing.xl,
  },
  fieldLabel: {
    ...AurumTypography.label,
    color: AurumColors.textTertiary,
    letterSpacing: 1.5,
    marginBottom: AurumSpacing.sm,
  },
  captionInput: {
    ...AurumTypography.body,
    color: AurumColors.textPrimary,
    minHeight: 60,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: AurumSpacing.sm,
  },
  tag: {
    paddingHorizontal: AurumSpacing.md,
    paddingVertical: AurumSpacing.xs + 2,
    borderRadius: AurumRadius.pill,
    backgroundColor: AurumColors.darkGlass,
    borderWidth: 1,
    borderColor: AurumColors.glassBorder,
  },
  tagText: {
    ...AurumTypography.labelSmall,
    color: AurumColors.textSecondary,
    textTransform: 'none',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 'auto',
    paddingBottom: AurumSpacing.xxl,
  },
});
