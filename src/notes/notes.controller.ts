import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { NotesService } from './notes.service';
import { CategoriesService } from '../categories/categories.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AuthUser } from '../auth/auth-user.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly categoriesService: CategoriesService,
  ) {}

  // CRUD
  @Post()
  create(
    @Body() body: CreateNoteDto,
    @Req() req: Request & { user: AuthUser },
  ) {
    return this.notesService.create({
      title: body.title,
      content: body.content,
      user: { id: req.user.userId },
    });
  }

  @Get()
  findActive(@Req() req: Request & { user: AuthUser }) {
    return this.notesService.findActiveByUser(req.user.userId);
  }

  @Get('archived')
  findArchived(@Req() req: Request & { user: AuthUser }) {
    return this.notesService.findArchivedByUser(req.user.userId);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateNoteDto) {
    return this.notesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.remove(id);
  }

  @Patch(':id/archive')
  archive(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.update(id, { archived: true });
  }

  @Patch(':id/unarchive')
  unarchive(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.update(id, { archived: false });
  }

  // Categorías
  @Put(':id/categories')
  setCategories(
    @Param('id', ParseIntPipe) id: number,
    @Body('categoryIds') categoryIds: number[],
  ) {
    return this.notesService.setCategories(id, categoryIds);
  }

  @Get('categories')
  listCategories() {
    return this.categoriesService.findAll();
  }
}
