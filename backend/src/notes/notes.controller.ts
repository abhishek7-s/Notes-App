import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Req() request: any) {
    const userId = request.user.uid;
    return this.notesService.create(createNoteDto, userId);
  }

  @Get()
  findAll(@Req() request: any) {
    const userId = request.user.uid;
    return this.notesService.findAll(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: any) {
    const userId = request.user.uid;
    return this.notesService.delete(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: CreateNoteDto, @Req() request: any) {
    const userId = request.user.uid;
    return this.notesService.update(id, userId, updateNoteDto);
  }
}