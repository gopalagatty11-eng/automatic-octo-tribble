/**
 * Calculator — Route entry
 */
import { useRouter } from 'expo-router';
import { CalculatorScreen } from '../src/screens/CalculatorScreen';

export default function CalculatorRoute() {
  const router = useRouter();

  return (
    <CalculatorScreen
      onNavigate={(screen) => {}}
      onBack={() => router.back()}
    />
  );
}
