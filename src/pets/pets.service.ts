import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownerService: OwnersService,
  ) {}

  async createPet(CreatePetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(CreatePetInput);
    return this.petsRepository.save(newPet);
  }

  async findOne(id: number): Promise<Pet> {
    return await this.petsRepository.findOneByOrFail({ id });
  }

  async findAll(
    page: number = 1,
    limit: number = 3,
  ): Promise<{ pets: Pet[]; total: number }> {
    const [pets, total] = await this.petsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      pets,
      total,
    };
  }

  async getOwner(id: number): Promise<Owner> {
    return await this.ownerService.findOne(id);
  }
}
