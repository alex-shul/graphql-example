import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Client } from '../../client/models/client';
import { Book } from './book';

@Entity('usage')
@ObjectType()
export class BookUsage extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Book)
  @JoinColumn({ name: 'book_id' })
  @ManyToOne(() => Book)
  book: Book;

  @Column({ name: 'client_id' })
  clientId: number;

  @Field(() => Client)
  client: Client;

  @Field(() => Date)
  @Column({ name: 'start_date' })
  startDate: Date;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'end_date', nullable: true })
  endDate?: Date;
}
