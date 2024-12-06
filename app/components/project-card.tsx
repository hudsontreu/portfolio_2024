import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  date: string;
  imageUrl: string;
  href: string;
}

export function ProjectCard({ title, date, imageUrl, href }: ProjectCardProps) {
  return (
    <Link href={href} className="block">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white">
          <div>{title}</div>
          <div>{date}</div>
        </div>
      </div>
    </Link>
  );
}
