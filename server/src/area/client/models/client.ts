import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { BookUsage } from '../../book/models/usage';

@Entity()
@ObjectType()
export class Client extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  surname: string;

  @Field(() => Boolean)
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [BookUsage])
  currentBookUsages: BookUsage[];

  @Field(() => [BookUsage])
  completedBookUsages: BookUsage[];
}
