import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateBookInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  descriptionShort?: string;

  @Field({ nullable: true })
  descriptionFull?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  yearWritten?: number;
}
