import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepo: Repository<Person>,
  ) {}
  async create(createPersonDto: CreatePersonDto) {
    const person = this.personRepo.create(createPersonDto);

    person.password = bcrypt.hashSync(createPersonDto.password, 10);
    await this.personRepo.save(person);
  }

  async findAll() {
    const person = await this.personRepo.find();
    const returnPerson = person.map(({ password, ...person }) => person);
    return returnPerson;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }
}
