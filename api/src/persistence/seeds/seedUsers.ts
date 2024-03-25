import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums/userRole';
import { QueryRunner } from 'typeorm';
import { User } from '../entities/user.entity';

export async function seedUsers(queryRunner: QueryRunner) {
  const password = await bcrypt.hash('123', 10);
  await queryRunner.manager.getRepository(User).save([
    {
      name: 'UserName',
      password,
      email: 'admin@gmail.com',
      role: UserRole.Admin,
    },
  ]);
}
