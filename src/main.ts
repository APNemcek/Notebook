import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { CategoriesService } from './categories/categories.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const usersService = app.get(UsersService);
  const categoriesService = app.get(CategoriesService);

  await categoriesService.seedDefaultCategories();

  const admin = await usersService.findUsername('admin');
  if (!admin) {
    await usersService.create({
      username: 'admin',
      password: await bcrypt.hash('admin', 10),
    });
    console.log('Admin user created');
  }

  await app.listen(3000);
}

bootstrap();
