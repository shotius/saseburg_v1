import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  postId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  login: UserResponse;
  register: UserResponse;
  updateComment: Comment;
};

export type MutationCreateCommentArgs = {
  input: CreatePostInput;
};

export type MutationCreatePostArgs = {
  text: Scalars['String'];
};

export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegisterArgs = {
  credentials: RegisterCredentials;
};

export type Post = {
  __typename?: 'Post';
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  creator?: Maybe<User>;
  id: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  comments: Array<Comment>;
  hello: Scalars['String'];
  me: User;
  posts: Array<Post>;
  users: Array<User>;
};

export type QueryCommentsArgs = {
  postId: Scalars['Float'];
};

export type RegisterCredentials = {
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  sex: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  birthData: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  sex: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreatePostInput = {
  content: Scalars['String'];
  postId: Scalars['Float'];
};

export type GeneralFieldErrorFragment = {
  __typename?: 'FieldError';
  field: string;
  message: string;
};

export type GeneralUserFragment = {
  __typename?: 'User';
  id: number;
  firstName: string;
  email: string;
};

export type CreateCommentMutationVariables = Exact<{
  input: CreatePostInput;
}>;

export type CreateCommentMutation = {
  __typename?: 'Mutation';
  createComment: {
    __typename?: 'Comment';
    content: string;
    creatorId: number;
    postId: number;
  };
};

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: { __typename?: 'Post'; id: string; text: string };
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    user?: Maybe<{
      __typename?: 'User';
      id: number;
      firstName: string;
      email: string;
    }>;
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
  };
};

export type RegisterMutationVariables = Exact<{
  registerCredentials: RegisterCredentials;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    user?: Maybe<{
      __typename?: 'User';
      firstName: string;
      lastName: string;
      email: string;
    }>;
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
  };
};

export type CommentsQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;

export type CommentsQuery = {
  __typename?: 'Query';
  comments: Array<{
    __typename?: 'Comment';
    content: string;
    postId: number;
    creatorId: number;
  }>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: { __typename?: 'User'; id: number; firstName: string; email: string };
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = {
  __typename?: 'Query';
  posts: Array<{
    __typename?: 'Post';
    id: string;
    text: string;
    creator?: Maybe<{
      __typename?: 'User';
      id: number;
      firstName: string;
      email: string;
    }>;
    comments?: Maybe<
      Array<{ __typename?: 'Comment'; content: string; creatorId: number }>
    >;
  }>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: 'Query';
  users: Array<{
    __typename?: 'User';
    id: number;
    firstName: string;
    email: string;
  }>;
};

export const GeneralFieldErrorFragmentDoc = gql`
  fragment GeneralFieldError on FieldError {
    field
    message
  }
`;
export const GeneralUserFragmentDoc = gql`
  fragment GeneralUser on User {
    id
    firstName
    email
  }
`;
export const CreateCommentDocument = gql`
  mutation CreateComment($input: createPostInput!) {
    createComment(input: $input) {
      content
      creatorId
      postId
    }
  }
`;

export function useCreateCommentMutation() {
  return Urql.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument);
}
export const CreatePostDocument = gql`
  mutation CreatePost($text: String!) {
    createPost(text: $text) {
      id
      text
    }
  }
`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument
  );
}
export const LoginDocument = gql`
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      user {
        ...GeneralUser
      }
      errors {
        ...GeneralFieldError
      }
    }
  }
  ${GeneralUserFragmentDoc}
  ${GeneralFieldErrorFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const RegisterDocument = gql`
  mutation Register($registerCredentials: RegisterCredentials!) {
    register(credentials: $registerCredentials) {
      user {
        firstName
        lastName
        email
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const CommentsDocument = gql`
  query Comments($postId: Float!) {
    comments(postId: $postId) {
      content
      postId
      creatorId
    }
  }
`;

export function useCommentsQuery(
  options: Omit<Urql.UseQueryArgs<CommentsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<CommentsQuery>({ query: CommentsDocument, ...options });
}
export const MeDocument = gql`
  query Me {
    me {
      ...GeneralUser
    }
  }
  ${GeneralUserFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const PostsDocument = gql`
  query Posts {
    posts {
      id
      text
      creator {
        ...GeneralUser
      }
      comments {
        content
        creatorId
      }
    }
  }
  ${GeneralUserFragmentDoc}
`;

export function usePostsQuery(
  options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
}
export const UsersDocument = gql`
  query Users {
    users {
      ...GeneralUser
    }
  }
  ${GeneralUserFragmentDoc}
`;

export function useUsersQuery(
  options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
}
