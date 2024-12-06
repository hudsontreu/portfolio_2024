import { ProjectGrid } from "../components/project-grid";

export default function WorkPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="p-8 space-y-2 h-[180px]">
        <p className="max-w-2xl text-muted-foreground">
          Exploring the potential of generative AI to transform perceptual experiences in digital media.
        </p>
      </div>
      <div className="flex-1 px-8">
        <div className="flex gap-8 mb-6">
          <button className="text-sm font-medium text-foreground">All</button>
          <button className="text-sm text-muted-foreground hover:text-foreground">Projects</button>
          <button className="text-sm text-muted-foreground hover:text-foreground">Experiments</button>
        </div>
        <div className="bg-muted/50 rounded-lg p-8">
          <ProjectGrid />
        </div>
      </div>
    </div>
  );
}