import { InputType, Int, Field } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@InputType()
export class CreateOwnerInput {
  @Field({ description: 'pets owners name' })
  name: string;
}
