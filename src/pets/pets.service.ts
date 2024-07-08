import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async createPet(CreatePetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(CreatePetInput);
    return this.petsRepository.save(newPet);
  }

  async findOne(id: number): Promise<Pet> {
    return await this.petsRepository.findOneBy({ id });
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); //select * from
  }
}
