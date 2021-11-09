import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

export type Book = {
  __typename?: 'Book';
  id: Scalars['ID'];
  title: Scalars['String'];
  author: Scalars['String'];
  yearWritten: Scalars['Float'];
  descriptionShort: Scalars['String'];
  descriptionFull: Scalars['String'];
  currentUsage?: Maybe<BookUsage>;
  completedUsages: Array<BookUsage>;
};

export type BookUsage = {
  __typename?: 'BookUsage';
  id: Scalars['ID'];
  book: Book;
  client: Client;
  startDate: Scalars['DateTime'];
  endDate?: Maybe<Scalars['DateTime']>;
};

export type Client = {
  __typename?: 'Client';
  id: Scalars['ID'];
  name: Scalars['String'];
  surname: Scalars['String'];
  isActive: Scalars['Boolean'];
  currentBookUsages: Array<BookUsage>;
  completedBookUsages: Array<BookUsage>;
};

export type CreateBookInput = {
  title: Scalars['String'];
  descriptionShort: Scalars['String'];
  descriptionFull: Scalars['String'];
};

export type CreateClientInput = {
  name: Scalars['String'];
  surname: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  addClient: Client;
  updateClient: Client;
  deleteClient: Scalars['Boolean'];
  createBook: Book;
  updateBook: Book;
  deleteBook: Scalars['Boolean'];
  giveBookToUser: BookUsage;
  takeBookFromUser: BookUsage;
};


export type MutationAddClientArgs = {
  data: CreateClientInput;
};


export type MutationUpdateClientArgs = {
  data: UpdateClientInput;
  id: Scalars['String'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['String'];
};


export type MutationCreateBookArgs = {
  data: CreateBookInput;
};


export type MutationUpdateBookArgs = {
  data: UpdateBookInput;
  id: Scalars['String'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['String'];
};


export type MutationGiveBookToUserArgs = {
  bookId: Scalars['Float'];
  clientId: Scalars['Float'];
};


export type MutationTakeBookFromUserArgs = {
  bookId: Scalars['Float'];
  clientId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  clients: Array<Client>;
  client: Client;
  books: Array<Book>;
  book: Book;
};


export type QueryClientArgs = {
  id: Scalars['String'];
};


export type QueryBookArgs = {
  id: Scalars['Float'];
};

export type UpdateBookInput = {
  title?: Maybe<Scalars['String']>;
  descriptionShort?: Maybe<Scalars['String']>;
  descriptionFull?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  yearWritten?: Maybe<Scalars['Float']>;
};

export type UpdateClientInput = {
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Book: ResolverTypeWrapper<Book>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  BookUsage: ResolverTypeWrapper<BookUsage>;
  Client: ResolverTypeWrapper<Client>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateBookInput: CreateBookInput;
  CreateClientInput: CreateClientInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  UpdateBookInput: UpdateBookInput;
  UpdateClientInput: UpdateClientInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Book: Book;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Float: Scalars['Float'];
  BookUsage: BookUsage;
  Client: Client;
  Boolean: Scalars['Boolean'];
  CreateBookInput: CreateBookInput;
  CreateClientInput: CreateClientInput;
  DateTime: Scalars['DateTime'];
  Mutation: {};
  Query: {};
  UpdateBookInput: UpdateBookInput;
  UpdateClientInput: UpdateClientInput;
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  yearWritten?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  descriptionShort?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  descriptionFull?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currentUsage?: Resolver<Maybe<ResolversTypes['BookUsage']>, ParentType, ContextType>;
  completedUsages?: Resolver<Array<ResolversTypes['BookUsage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookUsageResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookUsage'] = ResolversParentTypes['BookUsage']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  book?: Resolver<ResolversTypes['Book'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  currentBookUsages?: Resolver<Array<ResolversTypes['BookUsage']>, ParentType, ContextType>;
  completedBookUsages?: Resolver<Array<ResolversTypes['BookUsage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<MutationAddClientArgs, 'data'>>;
  updateClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<MutationUpdateClientArgs, 'data' | 'id'>>;
  deleteClient?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteClientArgs, 'id'>>;
  createBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationCreateBookArgs, 'data'>>;
  updateBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationUpdateBookArgs, 'data' | 'id'>>;
  deleteBook?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteBookArgs, 'id'>>;
  giveBookToUser?: Resolver<ResolversTypes['BookUsage'], ParentType, ContextType, RequireFields<MutationGiveBookToUserArgs, 'bookId' | 'clientId'>>;
  takeBookFromUser?: Resolver<ResolversTypes['BookUsage'], ParentType, ContextType, RequireFields<MutationTakeBookFromUserArgs, 'bookId' | 'clientId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  clients?: Resolver<Array<ResolversTypes['Client']>, ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<QueryClientArgs, 'id'>>;
  books?: Resolver<Array<ResolversTypes['Book']>, ParentType, ContextType>;
  book?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<QueryBookArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Book?: BookResolvers<ContextType>;
  BookUsage?: BookUsageResolvers<ContextType>;
  Client?: ClientResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

