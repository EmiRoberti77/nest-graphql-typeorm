import { Field, ObjectType } from '@nestjs/graphql';
import { Pet } from './pet.entity';

@ObjectType()
export class PaginatedPets {
  @Field(() => [Pet])
  pets: Pet[];
  @Field()
  total: number;
}
