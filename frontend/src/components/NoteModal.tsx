'use client';

import { useState, useEffect } from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: { title: string; content: string }, id?: string) => Promise<void>;
  noteToEdit?: Note | null;
}

export default function NoteModal({ isOpen, onClose, onSave, noteToEdit }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const isEditMode = !!noteToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
      } else {
        setTitle('');
        setContent('');
      }
      setError('');
    }
  }, [isOpen, noteToEdit, isEditMode]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }
    setIsSaving(true);
    setError('');
    try {
      await onSave({ title, content }, noteToEdit?.id);
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to save note.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-20 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl text-black font-bold mb-6">
          {isEditMode ? 'Edit Note' : 'Create a New Note'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Note')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}