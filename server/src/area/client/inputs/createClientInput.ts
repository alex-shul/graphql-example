import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateClientInput {
  @Field()
  name: string;

  @Field()
  surname: string;
}
