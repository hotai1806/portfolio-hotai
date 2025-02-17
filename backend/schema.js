// File: schema.js
import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post!]!
    comments: [Comment!]!
    createdAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    slug: String!
    author: User!
    comments: [Comment!]!
    published: Boolean!
    tags: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    posts(limit: Int, offset: Int): [Post!]!
    post(id: ID, slug: String): Post
    user(id: ID!): User
    postsByTag(tag: String!): [Post!]!
    searchPosts(query: String!): [Post!]!
  }

  input CreatePostInput {
    title: String!
    content: String!
    tags: [String!]!
    published: Boolean = false
  }

  input UpdatePostInput {
    title: String
    content: String
    tags: [String!]
    published: Boolean
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!

    createComment(postId: ID!, content: String!): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }
`;
