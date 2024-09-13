import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userEntity } from 'src/database/entity/user.entity';
import { UpdateUserDto } from '../DTO/update-user.dto';
import { CreateUserDto } from '../DTO/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(userEntity)
    private usersRepository: Repository<userEntity>,
  ) {}

  findAll() {
    return this.usersRepository.find()
  }

  async findOne(id: number) {
    return  await this.usersRepository.findOneBy({
      id,
    });
  }
  async updateUser(id: number, body: UpdateUserDto) {
    return await this.usersRepository.save({
      id,
      ...body,
    });
  }

  async createUser(createUser: CreateUserDto) {
    const user = this.usersRepository.create(createUser);
    return await this.usersRepository.save(user);
  }

  async delete(id: number) {
    await this.usersRepository.delete({ id });
    return `Delete user with id ${id} successfully`;
  }

}