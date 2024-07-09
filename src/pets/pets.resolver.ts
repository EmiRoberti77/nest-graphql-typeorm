import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';
import { PaginatedPets } from './paginatedPets.entity';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query((returns) => PaginatedPets)
  async pets(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 1 }) limit: number,
  ): Promise<PaginatedPets> {
    return await this.petsService.findAll(page, limit);
  }

  @Query((returns) => Pet)
  async getPetById(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return await this.petsService.findOne(id);
  }

  @ResolveField((returns) => Owner)
  async owner(@Parent() pet: Pet) {
    if (pet.ownerId) return await this.petsService.getOwner(pet.ownerId);
    return {};
  }

  @Mutation((returns) => Pet)
  async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return await this.petsService.createPet(createPetInput);
  }
}
