/**
 * Photo Note — Route entry
 */
import { useRouter } from 'expo-router';
import { PhotoNoteScreen } from '../src/screens/PhotoNoteScreen';

export default function PhotoNoteRoute() {
  const router = useRouter();

  return (
    <PhotoNoteScreen
      onNavigate={(screen) => {
        switch (screen) {
          case 'calculator':
            router.push('/calculator');
            break;
        }
      }}
      onBack={() => router.back()}
    />
  );
}
