"use client";
import Link from "next/link";

import { gql } from "@apollo/client";
// import client from "@/app/lib/apolloClient";

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

interface BlogPostParams {
  params: {
    id: string;
  };
}
interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  slug: string;
  comments: {
    id: string;
    content: string;
    date: string;
  };
  tags: string[];
  createdAt: string;
}

export async function getStaticProps() {
  // const { data } = await client.query({ query: GET_POSTS });
  // Render the first 10 posts at build time
  // return data.slice(0, 10).map((post: BlogPost) => ({
  //   slug: post.slug,
  // }));
}

export default function BlogPostPage({ params }: BlogPostParams) {
  // In a real app, you would fetch the post data based on the ID
  const post = {
    id: params.id,
    title: "Getting Started with Next.js App Router",
    content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      `,
    date: "2025-02-12",
    author: {
      name: "John Doe",
      avatar: "/api/placeholder/40/40",
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <time className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>

        <div className="prose lg:prose-xl">{post.content}</div>

        <div className="mt-12">
          <Link
            href="/blog"
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </main>
  );
}
