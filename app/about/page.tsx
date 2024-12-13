import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const skills = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Node.js', 'Python', 'WebGL', 'Three.js', 'p5.js', 'Figma',
  'UI/UX Design', 'Interaction Design', 'Creative Coding', 'Max/MSP',
  'Web Audio API', 'RNBO', 'Git', 'WebRTC', 'WebSockets', 'REST APIs'
];

const socialLinks = [
  { label: 'LinkedIn', url: 'https://linkedin.com' },
  { label: 'Instagram', url: 'https://instagram.com' },
  { label: 'X', url: 'https://x.com' },
  { label: 'Gmail', url: 'mailto:email@example.com' },
  { label: 'CV', url: '/cv.pdf' },
];

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>About</p>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.imageContainer}>
            <Image
              src="/headshot.jpg"
              alt="Hudson Treu"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.bio}>
              <p>I'm Hudson, designer and creative developer currently working as a design technologist for the Digital Technology Innovation R&D team at SageNet and recently graduated from the MS-HCI program at Georgia Tech.</p>
              <br />
              <p>As a design technologist, I both design and build interactive digital experiences at all scales, driven by a passion for enhancing human experiences through technology and 6 years professional experience. My work blends experience design, interface design, and UI engineering. I specialize in bringing designs to life through nuanced prototyping with emerging tech.</p>
              <br />
              <p>I also have a love for interactive digital arts. In my practice as a media artist, I aim to explore how digital art and contemporary media aesthetics can shape innovative interaction paradigms in software design.</p>
            </div>

            <div className={styles.skills}>
              <h2>Skills</h2>
              <div className={styles.skillsList}>
                {skills.map((skill) => (
                  <span key={skill} className={styles.skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className={styles.social}>
              <h2>Links</h2>
              <div className={styles.socialLinks}>
                {socialLinks.map((link) => (
                  <Link key={link.label} href={link.url} target="_blank" className={styles.socialLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}