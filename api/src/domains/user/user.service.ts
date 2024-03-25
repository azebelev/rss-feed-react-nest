import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/persistence/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    try {
      await this.userRepo.save(user);
    } catch (error) {
      console.log(error);
    }
    const { name, email, role } = user;
    return { name, email, role };
  }

  findAll() {
    try {
      return this.userRepo.find();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.userRepo.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepo.update(id, updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepo.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
