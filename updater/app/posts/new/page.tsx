import PostForm from "@/components/PostForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NewPostPage() {
  return (
    <div>
      <PageHeader
        title="Create Post"
        description="Write a new blog post or writeup"
        backHref="/posts"
      />
      <PostForm />
    </div>
  );
}
