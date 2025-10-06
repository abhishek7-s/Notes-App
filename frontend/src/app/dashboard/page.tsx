'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import NoteCard from '@/components/NoteCard';
import NoteModal, { Note } from '@/components/NoteModal';
import { useNotes } from '@/hooks/useNotes';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const { notes, isLoading, createNote, updateNote, deleteNote } = useNotes(user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const openCreateModal = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
  };

  const handleSaveNote = async (noteData: { title: string; content: string }, id?: string) => {
    if (id) {
      await updateNote(id, noteData.title, noteData.content);
    } else {
      await createNote(noteData.title, noteData.content);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 hidden sm:block">{user.email}</span>
            <button
              onClick={handleLogout}
              className="font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Your collection</h2>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            + New Note
          </button>
        </div>

        {isLoading ? (
          <p>Loading notes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={() => deleteNote(note.id)}
                  onEdit={() => openEditModal(note)}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">You have no notes yet. Click &quot;New Note&quot; to create one!</p>
            )}
          </div>
        )}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveNote}
        noteToEdit={currentNote}
      />
    </div>
  );
}