import { notFound } from "next/navigation";

import { api } from "@/lib/api";

type Params = Promise<{ id: string }>;

const CreatePost = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const res = await api.posts[":id"].$get({ param: { id } });

  if (!res.ok) notFound();

  const { post } = await res.json();

  return (
    <div className="flex min-h-screen flex-col items-center p-4 pt-20">
      <div>
        Title:
        <span className="font-bold">{post.title}</span>
      </div>
      <div>
        Content:
        <span className="font-bold">{post.content}</span>
      </div>
      <div>
        Author:
        <span className="font-bold"></span>
      </div>
      <div>
        Created at:
        <span className="font-bold"></span>
      </div>
    </div>
  );
};

export default CreatePost;
