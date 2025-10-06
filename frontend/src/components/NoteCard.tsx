'use client';

import { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => Promise<void>; 
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(note.id);
    } catch (error) {
      console.error("Failed to delete note:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-5 flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{note.title}</h3>
        <p className="text-gray-600 text-base whitespace-pre-wrap">{note.content}</p>
      </div>
      <div className="px-5 py-3 bg-gray-50 text-right space-x-4">
        <button
          onClick={() => onEdit(note)}
          disabled={isDeleting}
          className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors disabled:text-red-300 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}