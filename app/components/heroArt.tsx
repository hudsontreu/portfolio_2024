import Image from 'next/image';

export default function HeroArt() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/fireBoy.jpg"  // Make sure to add your image to the public directory
        alt="Hero Art"
        fill
        className="object-cover"
        priority
        quality={100}
      />
    </div>
  );
}