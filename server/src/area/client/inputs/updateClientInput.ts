import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateClientInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  surname?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}
