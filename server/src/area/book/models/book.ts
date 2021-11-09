import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { BookUsage } from './usage';

@Entity()
@ObjectType()
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

  @Field(() => BookUsage, { nullable: true })
  currentUsage?: BookUsage;

  @Field(() => [BookUsage])
  completedUsages: BookUsage[];
}
