import { DataSource } from 'typeorm';
import { Category } from './category.entity';

export async function seedCategories(dataSource: DataSource) {
  const categoryRepo = dataSource.getRepository(Category);

  const existing = await categoryRepo.count();
  if (existing > 0) return;

  const categories = [
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
  ].map((name) => {
    const c = new Category();
    c.name = name;
    return c;
  });

  await categoryRepo.save(categories);
  console.log('categories seeded');
}
