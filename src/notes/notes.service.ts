import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Note } from './note.entity';
import { Category } from '../categories/category.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  create(noteData: DeepPartial<Note>) {
    return this.notesRepository.save(noteData);
  }

  findActiveByUser(userId: number) {
    return this.notesRepository.find({
      where: { archived: false, user: { id: userId } },
    });
  }

  findArchivedByUser(userId: number) {
    return this.notesRepository.find({
      where: { archived: true, user: { id: userId } },
    });
  }

  async update(id: number, data: Partial<Note>) {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException();
    Object.assign(note, data);
    return this.notesRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException();
    return this.notesRepository.remove(note);
  }

  async setCategories(noteId: number, categoryIds: number[]) {
    if (categoryIds.length > 3) {
      throw new BadRequestException('Max 3 categories allowed');
    }

    const note = await this.notesRepository.findOne({
      where: { id: noteId },
      relations: ['categories'],
    });

    if (!note) throw new NotFoundException();

    const categories = await this.categoryRepo.findBy({
      id: In(categoryIds),
    });

    note.categories = categories;
    return this.notesRepository.save(note);
  }
}
