import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  private readonly firestore: FirebaseFirestore.Firestore;

  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = this.firebaseService.firestore;
  }

  async create(createNoteDto: CreateNoteDto, userId: string) {
    const { title, content } = createNoteDto;
    const newNote = {
      title,
      content,
      user_id: userId,
      created_at: new Date(),
    };

    const docRef = await this.firestore.collection('notes').add(newNote);
    return { id: docRef.id, ...newNote };
  }

  async findAll(userId: string) {
    const notesSnapshot = await this.firestore
      .collection('notes')
      .where('user_id', '==', userId)
      .orderBy('created_at', 'desc')
      .get();
      
    return notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  async delete(id: string, userId: string) {
    const noteRef = this.firestore.collection('notes').doc(id);
    const doc = await noteRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Note not found.');
    }

    const noteData = doc.data()!;
    
    if (noteData.user_id !== userId) {
      throw new ForbiddenException('You are not authorized to delete this note.');
    }

    await noteRef.delete();
    return { message: 'Note deleted successfully.' };
  }

  async update(id: string, userId: string, updateData: { title: string; content: string }) {
    const noteRef = this.firestore.collection('notes').doc(id);
    const doc = await noteRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Note not found.');
    }

    if (doc.data()!.user_id !== userId) {
      throw new ForbiddenException('You are not authorized to edit this note.');
    }

    await noteRef.update(updateData);
    return { id, ...updateData };
  }
}