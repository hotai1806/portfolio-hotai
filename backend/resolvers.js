// File: resolvers.js
import { format } from "date-fns";

// In-memory database
let users = [
  {
    id: "1",
    username: "admin",
    email: "admin@blog.com",
    createdAt: new Date().toISOString(),
  },
];

let posts = [
  {
    id: "1",
    title: "Welcome to our blog",
    content: "This is our first blog post!",
    slug: "welcome-to-our-blog",
    authorId: "1",
    published: true,
    tags: ["welcome", "first-post"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let comments = [
  {
    id: "1",
    content: "Great first post!",
    authorId: "1",
    postId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const resolvers = {
  User: {
    posts: (user) => posts.filter((post) => post.authorId === user.id),
    comments: (user) =>
      comments.filter((comment) => comment.authorId === user.id),
  },

  Post: {
    author: (post) => users.find((user) => user.id === post.authorId),
    comments: (post) =>
      comments.filter((comment) => comment.postId === post.id),
    slug: (post) => generateSlug(post.title),
  },

  Comment: {
    author: (comment) => users.find((user) => user.id === comment.authorId),
    post: (comment) => posts.find((post) => post.id === comment.postId),
  },

  Query: {
    posts: (_, { limit = 10, offset = 0 }) => {
      return posts
        .filter((post) => post.published)
        .slice(offset, offset + limit);
    },

    post: (_, { id, slug }) => {
      if (id) {
        return posts.find((post) => post.id === id);
      }
      return posts.find((post) => generateSlug(post.title) === slug);
    },

    user: (_, { id }) => users.find((user) => user.id === id),

    postsByTag: (_, { tag }) => {
      return posts.filter((post) => post.published && post.tags.includes(tag));
    },

    searchPosts: (_, { query }) => {
      const lowercaseQuery = query.toLowerCase();
      return posts.filter(
        (post) =>
          post.published &&
          (post.title.toLowerCase().includes(lowercaseQuery) ||
            post.content.toLowerCase().includes(lowercaseQuery))
      );
    },
  },

  Mutation: {
    createPost: (_, { input }, { currentUser }) => {
      const newPost = {
        id: String(posts.length + 1),
        ...input,
        authorId: currentUser.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      posts.push(newPost);
      return newPost;
    },

    updatePost: (_, { id, input }, { currentUser }) => {
      const index = posts.findIndex((post) => post.id === id);
      if (index === -1) throw new Error("Post not found");

      const post = posts[index];
      if (post.authorId !== currentUser.id) {
        throw new Error("Not authorized");
      }

      posts[index] = {
        ...post,
        ...input,
        updatedAt: new Date().toISOString(),
      };

      return posts[index];
    },

    deletePost: (_, { id }, { currentUser }) => {
      const post = posts.find((p) => p.id === id);
      if (!post) return false;

      if (post.authorId !== currentUser.id) {
        throw new Error("Not authorized");
      }

      posts = posts.filter((p) => p.id !== id);
      comments = comments.filter((c) => c.postId !== id);
      return true;
    },

    createComment: (_, { postId, content }, { currentUser }) => {
      const newComment = {
        id: String(comments.length + 1),
        content,
        authorId: currentUser.id,
        postId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      comments.push(newComment);
      return newComment;
    },

    updateComment: (_, { id, content }, { currentUser }) => {
      const index = comments.findIndex((comment) => comment.id === id);
      if (index === -1) throw new Error("Comment not found");

      const comment = comments[index];
      if (comment.authorId !== currentUser.id) {
        throw new Error("Not authorized");
      }

      comments[index] = {
        ...comment,
        content,
        updatedAt: new Date().toISOString(),
      };

      return comments[index];
    },

    deleteComment: (_, { id }, { currentUser }) => {
      const comment = comments.find((c) => c.id === id);
      if (!comment) return false;

      if (comment.authorId !== currentUser.id) {
        throw new Error("Not authorized");
      }

      comments = comments.filter((c) => c.id !== id);
      return true;
    },
  },
};
