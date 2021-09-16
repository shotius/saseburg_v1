import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  content!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @Column()
  postId!: number;

  // @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  // @Field()
  // @ManyToOne(() => Comment, comments => comments.comments)
  // comments!: Comment;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
