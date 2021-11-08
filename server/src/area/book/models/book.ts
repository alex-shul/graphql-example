import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { User } from '../../user/models/user';

@Entity()
@ObjectType()
@InputType('BookUpdateInput')
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  author: string;

  @Field(() => Number)
  @Column({ name: 'year_written' })
  yearWritten: number;

  @Field(() => String)
  @Column()
  descriptionShort: string;

  @Field(() => String)
  @Column()
  descriptionFull: string;

  @Field(() => User, { nullable: true })
  usedBy?: User;

  @Field(() => [User], { nullable: true })
  completedBy: User[];
}
