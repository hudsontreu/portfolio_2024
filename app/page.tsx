import Image from "next/image";
import HeroArt from "./components/heroArt";

export default function Home() {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="p-8 space-y-2">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">DESIGN</h1>
          <h2 className="text-4xl font-bold">TECHNOLOGIST</h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Exploring the potential of generative AI to transform perceptual experiences in digital media.
        </p>
      </div>
      <div className="flex-1 relative">
        <HeroArt />
      </div>
    </div>
  );
}
