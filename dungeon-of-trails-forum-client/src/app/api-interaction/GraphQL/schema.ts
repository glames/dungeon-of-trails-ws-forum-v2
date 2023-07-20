import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type Comment = {
  __typename?: 'Comment';
  attachmentUrl?: Maybe<Scalars['String']['output']>;
  body: Scalars['String']['output'];
  commentTime: Scalars['DateTime']['output'];
  commentUser?: Maybe<User>;
  commentUserId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  inverseParent?: Maybe<Array<Maybe<Comment>>>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['UUID']['output']>;
  post: Post;
  postId: Scalars['UUID']['output'];
};

export type LoginInput = {
  Email?: InputMaybe<Scalars['String']['input']>;
  Password?: InputMaybe<Scalars['String']['input']>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type MutationHandler = {
  __typename?: 'MutationHandler';
  AddComment?: Maybe<Scalars['String']['output']>;
  DeletePost?: Maybe<Scalars['String']['output']>;
  EditPost?: Maybe<Scalars['String']['output']>;
  UploadPost?: Maybe<Scalars['String']['output']>;
  UserLogin?: Maybe<LoginOutput>;
  UserRegister?: Maybe<Scalars['String']['output']>;
};


export type MutationHandlerAddCommentArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationHandlerDeletePostArgs = {
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationHandlerEditPostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
  postTitle?: InputMaybe<Scalars['String']['input']>;
};


export type MutationHandlerUploadPostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  postTitle?: InputMaybe<Scalars['String']['input']>;
  threadId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationHandlerUserLoginArgs = {
  input: LoginInput;
  login?: InputMaybe<LoginInput>;
};


export type MutationHandlerUserRegisterArgs = {
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  attachmentUrl?: Maybe<Scalars['String']['output']>;
  body: Scalars['String']['output'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  id: Scalars['UUID']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  postVotes?: Maybe<Array<Maybe<PostVote>>>;
  postedAt?: Maybe<Scalars['DateTime']['output']>;
  postedUser?: Maybe<User>;
  postedUserId?: Maybe<Scalars['UUID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  thread: Thread;
  threadId: Scalars['UUID']['output'];
  title: Scalars['String']['output'];
  totalComment?: Maybe<Scalars['Int']['output']>;
  totalReply?: Maybe<Scalars['Int']['output']>;
};

export type PostSortInput = {
  attachmentUrl?: InputMaybe<SortEnumType>;
  body?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  postedAt?: InputMaybe<SortEnumType>;
  postedUser?: InputMaybe<UserSortInput>;
  postedUserId?: InputMaybe<SortEnumType>;
  score?: InputMaybe<SortEnumType>;
  thread?: InputMaybe<ThreadSortInput>;
  threadId?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  totalComment?: InputMaybe<SortEnumType>;
  totalReply?: InputMaybe<SortEnumType>;
};

export type PostVote = {
  __typename?: 'PostVote';
  action?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  post: Post;
  postId: Scalars['UUID']['output'];
};

export type QueryHandler = {
  __typename?: 'QueryHandler';
  GetPostDetail?: Maybe<Post>;
  GetThreadHotPosts?: Maybe<Array<Maybe<Post>>>;
  GetThreadPosts?: Maybe<Array<Maybe<Post>>>;
  GetUserProfile?: Maybe<User>;
  SignInWithToken?: Maybe<User>;
  Welcome?: Maybe<Scalars['String']['output']>;
};


export type QueryHandlerGetPostDetailArgs = {
  commentPageNo?: InputMaybe<Scalars['Int']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHandlerGetThreadHotPostsArgs = {
  thread?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHandlerGetThreadPostsArgs = {
  order?: InputMaybe<Array<PostSortInput>>;
  thread?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHandlerGetUserProfileArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Thread = {
  __typename?: 'Thread';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Maybe<Post>>>;
  totalComment?: Maybe<Scalars['Int']['output']>;
  totalPost?: Maybe<Scalars['Int']['output']>;
};

export type ThreadSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  totalComment?: InputMaybe<SortEnumType>;
  totalPost?: InputMaybe<SortEnumType>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  description?: Maybe<Scalars['String']['output']>;
  dob: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type UserSortInput = {
  avatarUrl?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  dob?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  gender?: InputMaybe<SortEnumType>;
  hashedPassword?: InputMaybe<SortEnumType>;
  hashedRefreshToken?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type AddCommentMutationVariables = Exact<{
  body?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddCommentMutation = { __typename?: 'MutationHandler', AddComment?: string | null };

export type DeletePostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeletePostMutation = { __typename?: 'MutationHandler', DeletePost?: string | null };

export type EditPostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  postTitle?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditPostMutation = { __typename?: 'MutationHandler', EditPost?: string | null };

export type UploadPostMutationVariables = Exact<{
  threadId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  postTitle?: InputMaybe<Scalars['String']['input']>;
}>;


export type UploadPostMutation = { __typename?: 'MutationHandler', UploadPost?: string | null };

export type UserLoginMutationVariables = Exact<{
  Email?: InputMaybe<Scalars['String']['input']>;
  Password?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserLoginMutation = { __typename?: 'MutationHandler', UserLogin?: { __typename?: 'LoginOutput', accessToken: string, user: { __typename?: 'User', id: any, email?: string | null, name: string, avatarUrl?: string | null } } | null };

export type UserRegisterMutationVariables = Exact<{
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserRegisterMutation = { __typename?: 'MutationHandler', UserRegister?: string | null };

export type GetPostDetailQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['String']['input']>;
  commentPageNo?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostDetailQuery = { __typename?: 'QueryHandler', GetPostDetail?: { __typename?: 'Post', id: any, title: string, body: string, attachmentUrl?: string | null, score?: number | null, totalComment?: number | null, totalReply?: number | null, postedAt?: any | null, postedUser?: { __typename?: 'User', id: any, name: string, email?: string | null, description?: string | null, gender?: number | null, avatarUrl?: string | null } | null, thread: { __typename?: 'Thread', id: any, name: string, description?: string | null }, comments?: Array<{ __typename?: 'Comment', id: any, body: string, parentId?: any | null, commentTime: any, commentUser?: { __typename?: 'User', id: any, name: string, description?: string | null, gender?: number | null, avatarUrl?: string | null } | null, inverseParent?: Array<{ __typename?: 'Comment', id: any, body: string, parentId?: any | null, commentTime: any, commentUser?: { __typename?: 'User', id: any, name: string, description?: string | null, gender?: number | null, avatarUrl?: string | null } | null } | null> | null } | null> | null } | null };

export type GetThreadHotPostsQueryVariables = Exact<{
  thread?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetThreadHotPostsQuery = { __typename?: 'QueryHandler', GetThreadHotPosts?: Array<{ __typename?: 'Post', id: any, postedAt?: any | null, title: string, attachmentUrl?: string | null, body: string, score?: number | null, totalComment?: number | null, totalReply?: number | null, thread: { __typename?: 'Thread', id: any, name: string }, postedUser?: { __typename?: 'User', name: string, email?: string | null } | null } | null> | null };

export type GetThreadPostsQueryVariables = Exact<{
  thread?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetThreadPostsQuery = { __typename?: 'QueryHandler', GetThreadPosts?: Array<{ __typename?: 'Post', id: any, postedAt?: any | null, title: string, attachmentUrl?: string | null, body: string, score?: number | null, totalComment?: number | null, totalReply?: number | null, thread: { __typename?: 'Thread', id: any, name: string }, postedUser?: { __typename?: 'User', name: string, email?: string | null } | null } | null> | null };

export type GetUserProfileQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserProfileQuery = { __typename?: 'QueryHandler', GetUserProfile?: { __typename?: 'User', id: any, name: string, dob: any, gender?: number | null, description?: string | null, email?: string | null, avatarUrl?: string | null, comments?: Array<{ __typename?: 'Comment', id: any, body: string, parentId?: any | null, commentTime: any, postId: any } | null> | null, posts?: Array<{ __typename?: 'Post', id: any, title: string, postedAt?: any | null, score?: number | null, totalComment?: number | null, totalReply?: number | null, thread: { __typename?: 'Thread', id: any, name: string, description?: string | null } } | null> | null } | null };

export type WelcomeQueryVariables = Exact<{ [key: string]: never; }>;


export type WelcomeQuery = { __typename?: 'QueryHandler', Welcome?: string | null };

export type SignInWithTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type SignInWithTokenQuery = { __typename?: 'QueryHandler', SignInWithToken?: { __typename?: 'User', name: string, id: any, dob: any, gender?: number | null, description?: string | null, email?: string | null, avatarUrl?: string | null } | null };


export const AddCommentDocument = gql`
    mutation AddComment($body: String, $parentId: String, $postId: String) {
  AddComment(body: $body, parentId: $parentId, postId: $postId)
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      body: // value for 'body'
 *      parentId: // value for 'parentId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String) {
  DeletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($postId: String, $content: String, $postTitle: String) {
  EditPost(postId: $postId, content: $content, postTitle: $postTitle)
}
    `;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *      postTitle: // value for 'postTitle'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const UploadPostDocument = gql`
    mutation UploadPost($threadId: String, $content: String, $postTitle: String) {
  UploadPost(threadId: $threadId, content: $content, postTitle: $postTitle)
}
    `;
export type UploadPostMutationFn = Apollo.MutationFunction<UploadPostMutation, UploadPostMutationVariables>;

/**
 * __useUploadPostMutation__
 *
 * To run a mutation, you first call `useUploadPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPostMutation, { data, loading, error }] = useUploadPostMutation({
 *   variables: {
 *      threadId: // value for 'threadId'
 *      content: // value for 'content'
 *      postTitle: // value for 'postTitle'
 *   },
 * });
 */
export function useUploadPostMutation(baseOptions?: Apollo.MutationHookOptions<UploadPostMutation, UploadPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPostMutation, UploadPostMutationVariables>(UploadPostDocument, options);
      }
export type UploadPostMutationHookResult = ReturnType<typeof useUploadPostMutation>;
export type UploadPostMutationResult = Apollo.MutationResult<UploadPostMutation>;
export type UploadPostMutationOptions = Apollo.BaseMutationOptions<UploadPostMutation, UploadPostMutationVariables>;
export const UserLoginDocument = gql`
    mutation UserLogin($Email: String, $Password: String) {
  UserLogin(input: {Email: $Email, Password: $Password}) {
    accessToken
    user {
      id
      email
      name
      avatarUrl
    }
  }
}
    `;
export type UserLoginMutationFn = Apollo.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      Email: // value for 'Email'
 *      Password: // value for 'Password'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const UserRegisterDocument = gql`
    mutation UserRegister($dob: DateTime, $email: String, $password: String, $name: String, $gender: Int) {
  UserRegister(
    dob: $dob
    email: $email
    gender: $gender
    name: $name
    password: $password
  )
}
    `;
export type UserRegisterMutationFn = Apollo.MutationFunction<UserRegisterMutation, UserRegisterMutationVariables>;

/**
 * __useUserRegisterMutation__
 *
 * To run a mutation, you first call `useUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRegisterMutation, { data, loading, error }] = useUserRegisterMutation({
 *   variables: {
 *      dob: // value for 'dob'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *      gender: // value for 'gender'
 *   },
 * });
 */
export function useUserRegisterMutation(baseOptions?: Apollo.MutationHookOptions<UserRegisterMutation, UserRegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserRegisterMutation, UserRegisterMutationVariables>(UserRegisterDocument, options);
      }
export type UserRegisterMutationHookResult = ReturnType<typeof useUserRegisterMutation>;
export type UserRegisterMutationResult = Apollo.MutationResult<UserRegisterMutation>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<UserRegisterMutation, UserRegisterMutationVariables>;
export const GetPostDetailDocument = gql`
    query GetPostDetail($postId: String, $commentPageNo: Int) {
  GetPostDetail(postId: $postId, commentPageNo: $commentPageNo) {
    id
    title
    body
    attachmentUrl
    score
    totalComment
    totalReply
    postedAt
    postedUser {
      id
      name
      email
      description
      gender
      avatarUrl
    }
    thread {
      id
      name
      description
    }
    comments {
      id
      body
      parentId
      commentTime
      commentUser {
        id
        name
        description
        gender
        avatarUrl
      }
      inverseParent {
        id
        body
        parentId
        commentTime
        commentUser {
          id
          name
          description
          gender
          avatarUrl
        }
      }
    }
  }
}
    `;

/**
 * __useGetPostDetailQuery__
 *
 * To run a query within a React component, call `useGetPostDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostDetailQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      commentPageNo: // value for 'commentPageNo'
 *   },
 * });
 */
export function useGetPostDetailQuery(baseOptions?: Apollo.QueryHookOptions<GetPostDetailQuery, GetPostDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostDetailQuery, GetPostDetailQueryVariables>(GetPostDetailDocument, options);
      }
export function useGetPostDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostDetailQuery, GetPostDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostDetailQuery, GetPostDetailQueryVariables>(GetPostDetailDocument, options);
        }
export type GetPostDetailQueryHookResult = ReturnType<typeof useGetPostDetailQuery>;
export type GetPostDetailLazyQueryHookResult = ReturnType<typeof useGetPostDetailLazyQuery>;
export type GetPostDetailQueryResult = Apollo.QueryResult<GetPostDetailQuery, GetPostDetailQueryVariables>;
export const GetThreadHotPostsDocument = gql`
    query GetThreadHotPosts($thread: String) {
  GetThreadHotPosts(thread: $thread) {
    id
    postedAt
    title
    attachmentUrl
    body
    score
    totalComment
    totalReply
    thread {
      id
      name
    }
    postedUser {
      name
      email
    }
  }
}
    `;

/**
 * __useGetThreadHotPostsQuery__
 *
 * To run a query within a React component, call `useGetThreadHotPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadHotPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadHotPostsQuery({
 *   variables: {
 *      thread: // value for 'thread'
 *   },
 * });
 */
export function useGetThreadHotPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetThreadHotPostsQuery, GetThreadHotPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThreadHotPostsQuery, GetThreadHotPostsQueryVariables>(GetThreadHotPostsDocument, options);
      }
export function useGetThreadHotPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadHotPostsQuery, GetThreadHotPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThreadHotPostsQuery, GetThreadHotPostsQueryVariables>(GetThreadHotPostsDocument, options);
        }
export type GetThreadHotPostsQueryHookResult = ReturnType<typeof useGetThreadHotPostsQuery>;
export type GetThreadHotPostsLazyQueryHookResult = ReturnType<typeof useGetThreadHotPostsLazyQuery>;
export type GetThreadHotPostsQueryResult = Apollo.QueryResult<GetThreadHotPostsQuery, GetThreadHotPostsQueryVariables>;
export const GetThreadPostsDocument = gql`
    query GetThreadPosts($thread: String) {
  GetThreadPosts(thread: $thread, order: {postedAt: DESC}) {
    id
    postedAt
    title
    attachmentUrl
    body
    score
    totalComment
    totalReply
    thread {
      id
      name
    }
    postedUser {
      name
      email
    }
  }
}
    `;

/**
 * __useGetThreadPostsQuery__
 *
 * To run a query within a React component, call `useGetThreadPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadPostsQuery({
 *   variables: {
 *      thread: // value for 'thread'
 *   },
 * });
 */
export function useGetThreadPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetThreadPostsQuery, GetThreadPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThreadPostsQuery, GetThreadPostsQueryVariables>(GetThreadPostsDocument, options);
      }
export function useGetThreadPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadPostsQuery, GetThreadPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThreadPostsQuery, GetThreadPostsQueryVariables>(GetThreadPostsDocument, options);
        }
export type GetThreadPostsQueryHookResult = ReturnType<typeof useGetThreadPostsQuery>;
export type GetThreadPostsLazyQueryHookResult = ReturnType<typeof useGetThreadPostsLazyQuery>;
export type GetThreadPostsQueryResult = Apollo.QueryResult<GetThreadPostsQuery, GetThreadPostsQueryVariables>;
export const GetUserProfileDocument = gql`
    query GetUserProfile($userId: String) {
  GetUserProfile(userId: $userId) {
    id
    name
    dob
    gender
    description
    email
    avatarUrl
    comments {
      id
      body
      parentId
      commentTime
      postId
    }
    posts {
      id
      title
      postedAt
      score
      totalComment
      totalReply
      thread {
        id
        name
        description
      }
    }
  }
}
    `;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const WelcomeDocument = gql`
    query Welcome {
  Welcome
}
    `;

/**
 * __useWelcomeQuery__
 *
 * To run a query within a React component, call `useWelcomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useWelcomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWelcomeQuery({
 *   variables: {
 *   },
 * });
 */
export function useWelcomeQuery(baseOptions?: Apollo.QueryHookOptions<WelcomeQuery, WelcomeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WelcomeQuery, WelcomeQueryVariables>(WelcomeDocument, options);
      }
export function useWelcomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WelcomeQuery, WelcomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WelcomeQuery, WelcomeQueryVariables>(WelcomeDocument, options);
        }
export type WelcomeQueryHookResult = ReturnType<typeof useWelcomeQuery>;
export type WelcomeLazyQueryHookResult = ReturnType<typeof useWelcomeLazyQuery>;
export type WelcomeQueryResult = Apollo.QueryResult<WelcomeQuery, WelcomeQueryVariables>;
export const SignInWithTokenDocument = gql`
    query SignInWithToken {
  SignInWithToken {
    name
    id
    dob
    gender
    description
    email
    avatarUrl
  }
}
    `;

/**
 * __useSignInWithTokenQuery__
 *
 * To run a query within a React component, call `useSignInWithTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignInWithTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignInWithTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useSignInWithTokenQuery(baseOptions?: Apollo.QueryHookOptions<SignInWithTokenQuery, SignInWithTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignInWithTokenQuery, SignInWithTokenQueryVariables>(SignInWithTokenDocument, options);
      }
export function useSignInWithTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignInWithTokenQuery, SignInWithTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignInWithTokenQuery, SignInWithTokenQueryVariables>(SignInWithTokenDocument, options);
        }
export type SignInWithTokenQueryHookResult = ReturnType<typeof useSignInWithTokenQuery>;
export type SignInWithTokenLazyQueryHookResult = ReturnType<typeof useSignInWithTokenLazyQuery>;
export type SignInWithTokenQueryResult = Apollo.QueryResult<SignInWithTokenQuery, SignInWithTokenQueryVariables>;