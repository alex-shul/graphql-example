import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity('usage')
@ObjectType()
export class BookUsage extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column({ name: 'book_id' })
  bookId: number;

  @Field(() => Number)
  @Column({ name: 'user_id' })
  userId: number;

  @Field(() => Date)
  @Column({ name: 'start_date' })
  startDate: Date;

  @Field(() => Date)
  @Column({ name: 'end_date', nullable: true })
  endDate?: Date;
}
