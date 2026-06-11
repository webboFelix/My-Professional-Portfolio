import VideoForm from "@/components/VideoForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NewVideoPage() {
  return (
    <div>
      <PageHeader
        title="Create Video"
        description="Upload a video to Cloudinary"
        backHref="/videos"
      />
      <VideoForm />
    </div>
  );
}
