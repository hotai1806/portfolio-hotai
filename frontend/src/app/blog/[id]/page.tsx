import Link from "next/link";

import { gql } from "@apollo/client";
import { getClient } from "../../../app/lib/apolloClient";

const GET_POSTS_BY_ID = gql`
  query ($postId: ID) {
    post(id: $postId) {
      author {
        username
      }
      comments {
        author {
          username
        }
      }
      content
      createdAt
      id
      title
    }
  }
`;

type Params = Promise<{ id: string }>;

export default async function BlogPostPage(props: { params: Params }) {
  // In a real app, you would fetch the post data based on the ID
  const client = getClient();
  const { data } = await client.query({
    query: GET_POSTS_BY_ID, // this will query the id only
    variables: {
      postId: "1",
    },
  });
  const id = (await props.params).id;

  const post = {
    id: id,

    title: data.post.title,
    content: data.post.content,
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
