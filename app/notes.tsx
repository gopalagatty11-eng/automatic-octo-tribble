/**
 * Notes List — Route entry (consumes NotesContext)
 */
import { useRouter } from 'expo-router';
import { NotesScreen } from '../src/screens/NotesScreen';
import { useNotesContext } from '../src/providers';

export default function NotesRoute() {
  const router = useRouter();
  const { notes } = useNotesContext();

  return (
    <NotesScreen
      notes={notes}
      onNavigate={(screen) => {
        switch (screen) {
          case 'new-note':
            router.push('/new-note');
            break;
        }
      }}
    />
  );
}
