import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
@ObjectType()
export class Post extends BaseEntity{

  @PrimaryGeneratedColumn()
  @Field()
  id!:string;

  @Column()
  @Field()
  text!:string;

  @Column()
  @Field()
  creatorId!: number; 

  @ManyToOne(() => User, user => user.posts)
  creator!: User;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;

}