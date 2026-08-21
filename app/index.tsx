/**
 * Home Screen — Route entry (consumes NotesContext)
 */
import { useRouter } from 'expo-router';
import { HomeScreen } from '../src/screens/HomeScreen';
import { useNotesContext } from '../src/providers';

export default function HomeRoute() {
  const router = useRouter();
  const { notes } = useNotesContext();

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case 'notes':
        router.push('/notes');
        break;
      case 'new-note':
        router.push('/new-note');
        break;
      case 'photo-note':
        router.push('/photo-note');
        break;
      case 'calculator':
        router.push('/calculator');
        break;
    }
  };

  return <HomeScreen notes={notes} onNavigate={handleNavigate} />;
}
