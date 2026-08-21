/**
 * SplashScreen — Premium animated gold logo reveal
 * Staggered entrance: ring → logo text → tagline → fade to onboarding
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { AurumColors, AurumTypography, AurumSpacing } from '../theme';

const { width: SCREEN_W } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  // Animation values
  const ringScale = useRef(new Animated.Value(0)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY = useRef(new Animated.Value(12)).current;
  const shimmerX = useRef(new Animated.Value(-SCREEN_W)).current;
  const particleOps = useRef(
    Array.from({ length: 12 }, () => ({
      opacity: new Animated.Value(0),
      y: new Animated.Value(0),
      scale: new Animated.Value(0),
    }))
  ).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const particleDelay = 600;

    Animated.sequence([
      // 1. Ring entrance
      Animated.parallel([
        Animated.spring(ringScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),

      // 2. Logo text
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(titleY, {
          toValue: 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),

      // 3. Tagline
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(taglineY, {
          toValue: 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),

      // 4. Particles + shimmer
      Animated.delay(particleDelay),
    ]).start(() => {
      // Particle burst
      Animated.stagger(
        50,
        particleOps.map((p, i) => {
          const angle = (i / particleOps.length) * Math.PI * 2;
          const distance = 80 + Math.random() * 60;
          return Animated.parallel([
            Animated.timing(p.opacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.spring(p.y, {
              toValue: Math.sin(angle) * distance,
              friction: 6,
              tension: 30,
              useNativeDriver: true,
            }),
            Animated.spring(p.scale, {
              toValue: 1,
              friction: 6,
              useNativeDriver: true,
            }),
          ]);
        })
      ).start(() => {
        // Shimmer sweep
        Animated.timing(shimmerX, {
          toValue: SCREEN_W,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          // Fade out after a beat
          Animated.delay(600).start(() => {
            Animated.timing(fadeOut, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => onFinish());
          });
        });
      });
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      {/* Background radial glow */}
      <View style={styles.glowOrb} />

      {/* Gold ring */}
      <Animated.View
        style={[
          styles.ring,
          {
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          },
        ]}
      />

      {/* Particles */}
      {particleOps.map((p, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              opacity: p.opacity,
              transform: [
                { translateY: p.y },
                { scale: p.scale },
                { translateX: Math.cos((i / particleOps.length) * Math.PI * 2) * 80 },
              ],
            },
          ]}
        />
      ))}

      {/* Logo text */}
      <Animated.View
        style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleY }],
        }}
      >
        <Text style={styles.logoText}>AURUM</Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: taglineOpacity,
          transform: [{ translateY: taglineY }],
        }}
      >
        <Text style={styles.tagline}>NOTE</Text>
      </Animated.View>

      <Animated.View style={{ opacity: taglineOpacity }}>
        <Text style={styles.version}>v2.0 — Premium Edition</Text>
      </Animated.View>

      {/* Shimmer sweep overlay */}
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: shimmerX }],
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AurumColors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOrb: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(201, 169, 110, 0.06)',
  },
  ring: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: AurumColors.gold,
    opacity: 0.7,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: AurumColors.gold,
  },
  logoText: {
    ...AurumTypography.heroLarge,
    color: AurumColors.gold,
    letterSpacing: 12,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '300',
    color: AurumColors.goldLight,
    letterSpacing: 20,
    textAlign: 'center',
    marginTop: AurumSpacing.xs,
  },
  version: {
    ...AurumTypography.labelSmall,
    color: AurumColors.textTertiary,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: AurumSpacing.xxxl + 12,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    width: 120,
    height: '100%',
    backgroundColor: 'rgba(201, 169, 110, 0.08)',
    // Skew for diagonal shimmer
    transform: [{ skewX: '-15deg' }],
  },
});
