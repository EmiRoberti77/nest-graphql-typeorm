import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePetInput {
  @IsAlpha()
  @IsNotEmpty()
  @Field()
  name: string;
  @Field({ nullable: true })
  type?: string;
  @Field((type) => Int)
  ownerId: number;
}
