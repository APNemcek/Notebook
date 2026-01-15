import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async seedDefaultCategories() {
    const defaults = [
      'Work',
      'Personal',
      'Tech',
      'Ideas',
      'Projects',
      'Study',
      'Health',
      'Home',
      'Finance',
      'Other',
    ];

    for (const name of defaults) {
      const exists = await this.categoryRepo.findOne({ where: { name } });
      if (!exists) {
        await this.categoryRepo.save({ name });
      }
    }
  }
}
