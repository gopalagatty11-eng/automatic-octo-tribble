/**
 * New Note — Route entry (consumes NotesContext)
 */
import { useRouter } from 'expo-router';
import { NewNoteScreen } from '../src/screens/NewNoteScreen';
import { useNotesContext } from '../src/providers';

export default function NewNoteRoute() {
  const router = useRouter();
  const { addNote } = useNotesContext();

  return (
    <NewNoteScreen
      onNavigate={(screen) => {
        switch (screen) {
          case 'photo-note':
            router.push('/photo-note');
            break;
          case 'calculator':
            router.push('/calculator');
            break;
        }
      }}
      onBack={() => router.back()}
      onSave={async (input) => {
        await addNote(input);
      }}
    />
  );
}
