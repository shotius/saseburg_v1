import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
@ObjectType()
export class Post extends BaseEntity{

  @Field()
  @PrimaryGeneratedColumn()
  id!:string;

  @Field()
  @Column()
  text!:string;

  @Field()
  @Column()
  creatorId!: number; 

  @Field(() => User, {nullable: true})
  @ManyToOne(() => User, user => user.posts)
  user!: User;

  @Field(() => [Comment], {nullable: true})
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

}