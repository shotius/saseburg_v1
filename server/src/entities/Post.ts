import { Field, ObjectType } from 'type-graphql';
import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

@Entity()
@ObjectType()
export class Post extends BaseEntity{

  @PrimaryGeneratedColumn()
  @Field()
  id!:string;

  @Column()
  @Field()
  text!:string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;
}