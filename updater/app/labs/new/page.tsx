import LabForm from "@/components/LabForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NewLabPage() {
  return (
    <div>
      <PageHeader
        title="Create Lab"
        description="Document a new lab walkthrough"
        backHref="/labs"
      />
      <LabForm />
    </div>
  );
}
