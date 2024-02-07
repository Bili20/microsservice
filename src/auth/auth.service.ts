import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/creat-auth.dto';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Person) private personRepo: Repository<Person>,
  ) {}

  async login({ email, password }: AuthDto) {
    const person = await this.personRepo.findOne({ where: { email: email } });

    if (person) {
      const verifyPassword = bcrypt.compareSync(password, person.password);
      if (verifyPassword) {
        const payload = { sub: person.id, user: person.email };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }

    throw new UnauthorizedException();
  }
}
