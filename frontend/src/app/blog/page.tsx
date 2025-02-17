// app/blog/page.tsx
"use client";
import Link from "next/link";

import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query {
    posts {
      title
      updatedAt
      tags
      slug
      published
      id
      createdAt
      content
    }
  }
`;

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  createdAt: string;
  author?: {
    name?: string;
    avatar?: string;
  };
}

// This would typically come from an API or database
// const posts: BlogPost[] = [
//   {
//     id: "1",
//     title: "Getting Started with Next.js App Router",
//     excerpt:
//       "Learn how to build modern web applications with Next.js 13+ App Router...",
//     date: "2025-02-12",
//     author: {
//       name: "John Doe",
//       avatar: "/api/placeholder/40/40",
//     },
//   },
//   {
//     id: "2",
//     title: "Mastering Tailwind CSS",
//     excerpt: "Discover the power of utility-first CSS with Tailwind...",
//     date: "2025-02-10",
//     author: {
//       name: "Jane Smith",
//       avatar: "/api/placeholder/40/40",
//     },
//   },
// ];

export default function BlogPage() {
  const { data, loading, error } = useQuery(GET_POSTS);

  // Render the first 10 posts at build time

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const posts = data.posts.map((post: BlogPost) => ({
    id: post.id,
    title: post.title,
    date: post.createdAt,
  }));
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600">
          Explore our latest articles and insights about web development.
        </p>
      </header>

      <div className="grid gap-8">
        {posts.map((post: BlogPost) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/blog/${post.id}`}>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {/* <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full mr-4"
                  /> */}
                  <div>
                    {/* <p className="font-medium">{post.author.name}</p> */}
                    <time className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.title}</p>

                <span className="text-blue-600 font-medium hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
