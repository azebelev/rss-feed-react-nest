import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums/userRole';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { BasePkEntity } from './astract/basePk.entity';

@Entity()
export class User extends BasePkEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: UserRole.User })
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
