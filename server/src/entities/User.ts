import { Sex } from 'src/types';
import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';

@ObjectType()
@Entity()
export class User extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!:string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column()
  sex!: Sex;

  @Field()
  @Column()
  birthData!: Date;


  @Field()
  @Column({unique: true})
  email!: string;

  @Column()
  password!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  
  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, post => post.creatorId)
  @Field(() => [Post], {nullable: true})
  posts: Post[];
}