/**
 * OnboardingScreen — Premium feature carousel with gold accents
 * 3 pages: Capture, Organize, Calculate — with animated transitions
 * Uses ScrollView instead of FlatList for reliable web behavior
 */
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AurumButton } from '../components';
import { AurumColors, AurumRadius, AurumSpacing, AurumTypography } from '../theme';

const { width: SCREEN_W } = Dimensions.get('window');

interface OnboardingPage {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

const PAGES: OnboardingPage[] = [
  {
    icon: '✎',
    title: 'Capture Ideas',
    subtitle: 'WRITE',
    description:
      'A distraction-free editor designed for clarity. Tag, organize, and find your notes instantly.',
  },
  {
    icon: '◉',
    title: 'Photo Notes',
    subtitle: 'CAPTURE',
    description:
      'Snap a photo — receipt, whiteboard, document. Add captions and tags for instant recall.',
  },
  {
    icon: 'fx',
    title: 'Smart Calculator',
    subtitle: 'COMPUTE',
    description:
      'A built-in calculator with a premium feel. Save results directly into your notes.',
  },
];

interface OnboardingScreenProps {
  onFinish: () => void;
}

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < PAGES.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: nextIndex * SCREEN_W, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => onFinish());
    }
  };

  const handleSkip = () => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => onFinish());
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const handleMomentumScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    setCurrentIndex(index);
  };

  const isLastPage = currentIndex === PAGES.length - 1;

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      {/* Skip button */}
      {!isLastPage && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_W}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={styles.scrollContent}
      >
        {PAGES.map((item, index) => {
          const inputRange = [
            (index - 1) * SCREEN_W,
            index * SCREEN_W,
            (index + 1) * SCREEN_W,
          ];

          const cardScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp',
          });

          const cardOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <View key={index} style={styles.page}>
              <Animated.View
                style={[
                  styles.card,
                  {
                    opacity: cardOpacity,
                    transform: [{ scale: cardScale }],
                  },
                ]}
              >
                {/* Gold accent top line */}
                <View style={styles.cardAccent} />

                {/* Icon circle */}
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>

                {/* Label */}
                <Text style={styles.label}>{item.subtitle}</Text>

                {/* Title */}
                <Text style={styles.title}>{item.title}</Text>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Description */}
                <Text style={styles.description}>{item.description}</Text>
              </Animated.View>
            </View>
          );
        })}
      </ScrollView>

      {/* Bottom section */}
      <View style={styles.bottom}>
        {/* Dot indicators */}
        <View style={styles.dots}>
          {PAGES.map((_, i) => {
            const dotWidth = scrollX.interpolate({
              inputRange: [
                (i - 1) * SCREEN_W,
                i * SCREEN_W,
                (i + 1) * SCREEN_W,
              ],
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });

            const dotOpacity = scrollX.interpolate({
              inputRange: [
                (i - 1) * SCREEN_W,
                i * SCREEN_W,
                (i + 1) * SCREEN_W,
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity: dotOpacity,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* CTA button */}
        <AurumButton
          title={isLastPage ? 'Get Started' : 'Next'}
          onPress={handleNext}
          variant="primary"
          size="lg"
          style={styles.ctaButton}
        />

        {/* Bottom tagline */}
        <Text style={styles.bottomTagline}>
          AURUM NOTE v2.0 — Premium Edition
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AurumColors.black,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: AurumSpacing.xl,
    zIndex: 10,
    paddingVertical: AurumSpacing.sm,
    paddingHorizontal: AurumSpacing.md,
  },
  skipText: {
    ...AurumTypography.bodySmall,
    color: AurumColors.textTertiary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  page: {
    width: SCREEN_W,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: AurumSpacing.xxxl + 8,
  },
  card: {
    width: '100%',
    backgroundColor: AurumColors.darkGlass,
    borderRadius: AurumRadius.xl,
    borderWidth: 1,
    borderColor: AurumColors.goldBorder,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: AurumSpacing.huge,
    paddingHorizontal: AurumSpacing.xxl,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: AurumColors.gold,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: AurumColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: AurumSpacing.xxl,
  },
  iconText: {
    fontSize: 32,
    color: AurumColors.gold,
  },
  label: {
    ...AurumTypography.label,
    color: AurumColors.gold,
    letterSpacing: 3,
    marginBottom: AurumSpacing.sm,
  },
  title: {
    ...AurumTypography.titleLarge,
    color: AurumColors.textPrimary,
    textAlign: 'center',
    marginBottom: AurumSpacing.lg,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: AurumColors.goldBorder,
    marginBottom: AurumSpacing.lg,
  },
  description: {
    ...AurumTypography.body,
    color: AurumColors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottom: {
    paddingHorizontal: AurumSpacing.xxl,
    paddingBottom: 60,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AurumSpacing.sm,
    marginBottom: AurumSpacing.xxl,
  },
  dot: {
    height: 4,
    borderRadius: 2,
    backgroundColor: AurumColors.gold,
  },
  ctaButton: {
    width: '100%',
    marginBottom: AurumSpacing.xl,
  },
  bottomTagline: {
    ...AurumTypography.labelSmall,
    color: AurumColors.textTertiary,
    letterSpacing: 2,
  },
});
