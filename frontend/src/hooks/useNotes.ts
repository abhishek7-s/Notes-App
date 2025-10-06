'use client';

import { useState, useCallback, useEffect } from 'react';
import { User } from 'firebase/auth';
import api from '@/lib/axios';

export interface Note {
  id: string;
  title: string;
  content: string;
}

export function useNotes(user: User | null) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotes = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const response = await api.get('/notes');
        setNotes(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Could not load notes.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const createNote = async (title: string, content: string) => {
    await api.post('/notes', { title, content });
    await fetchNotes();
  };

  const updateNote = async (id: string, title: string, content: string) => {
    await api.patch(`/notes/${id}`, { title, content });
    await fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await api.delete(`/notes/${id}`);
    await fetchNotes();
  };

  return { notes, isLoading, error, createNote, updateNote, deleteNote };
}