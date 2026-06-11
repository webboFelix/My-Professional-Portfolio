import ProjectForm from "@/components/ProjectForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader
        title="Create Project"
        description="Add a new project to your portfolio"
        backHref="/projects"
      />
      <ProjectForm />
    </div>
  );
}
