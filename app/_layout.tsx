/**
 * AURUM NOTE v2 — Root Layout
 * Manages splash → onboarding → main app phase transition
 * Wraps main app in NotesProvider for persistent storage
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { AurumColors } from '../src/theme';
import { SplashScreen } from '../src/screens/SplashScreen';
import { OnboardingScreen } from '../src/screens/OnboardingScreen';
import { NotesProvider } from '../src/providers';
import { StorageService } from '../src/services';

type AppPhase = 'splash' | 'onboarding' | 'main';

export default function RootLayout() {
  const [phase, setPhase] = useState<AppPhase>('splash');

  // Check if onboarding was already completed
  useEffect(() => {
    StorageService.isOnboardingDone().then((done) => {
      if (done) {
        // Skip splash + onboarding on subsequent launches
        setPhase('main');
      }
    });
  }, []);

  const handleSplashFinish = useCallback(() => {
    setPhase('onboarding');
  }, []);

  const handleOnboardingFinish = useCallback(async () => {
    await StorageService.setOnboardingDone();
    setPhase('main');
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: AurumColors.black }}>
      <StatusBar style="light" />

      {phase === 'splash' && <SplashScreen onFinish={handleSplashFinish} />}

      {phase === 'onboarding' && (
        <OnboardingScreen onFinish={handleOnboardingFinish} />
      )}

      {phase === 'main' && (
        <NotesProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: AurumColors.black },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="notes" />
            <Stack.Screen name="new-note" />
            <Stack.Screen name="photo-note" />
            <Stack.Screen name="calculator" />
          </Stack>
        </NotesProvider>
      )}
    </View>
  );
}
