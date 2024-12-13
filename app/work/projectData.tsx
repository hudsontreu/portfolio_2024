interface Project {
  id: number;
  title: string;
  subtitle?: string;  
  group: 'project' | 'experiment';
  iframePath?: string;  
  category_1: 'art' | 'design';
  tags: string[];
  thumbnailType: 'image' | 'video';
  thumbnailUrl: string;
  scope: string[];
  date: string;
  credits?: string[];  
  contributions?: string[];  
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Generative Contemplations",
        group: "experiment",
        iframePath: "/iframes/generativeContemplations_p5_rnbo/index.html",
        category_1: "art",
        tags: ["web", "real-time software", "generative"],
        thumbnailType: "image",
        thumbnailUrl: "/genContemplation_cardImg.png",
        scope: ["p5.js", "RNBO", "Web Audio API", "JavaScript"],
        date: "Sep 2024",
        contributions: []
    },
    {
        id: 2,
        title: "v.4MP",
        subtitle: "A Machine Learning Approach to Creating Dynamic Visual Music Systems",
        group: "project",
        category_1: "design",
        tags: ["software"],
        thumbnailType: "image",
        thumbnailUrl: "/v.4mp_cardImg.png",
        scope: ["UX Design", "UI Design", "Software Engineering"],
        date: "Apr 2024",
        contributions: []
    },
    {
        id: 3,
        title: "Accessible Safari",
        subtitle: "A Sonified Safari Experience for the Vision-Impaired through Real-Time Object Detection and Scene Description",
        group: "project",
        category_1: "design",
        tags: ["software"],
        thumbnailType: "video",
        thumbnailUrl: "/p5.mp4",
        scope: ["UX Design", "UI Design", "Software Engineering"],
        date: "Dec 2024",
        credits: ["Gururaj Deshpande", "Rochan Madhusudhan", "Shaam Bala"],
        contributions: ["Research", "Design", "Sonification"]
    },
    {
        id: 4,
        title: "Memory Mosaic",
        subtitle: "Impressions of past, present, asnd future guests are curated into a haunting art exhibition within a hotel lobby.",
        group: "project",
        category_1: "art",
        tags: ["Interactive Installation", "Real-time Software"],
        thumbnailType: "image",
        thumbnailUrl: "/reflection.png",
        scope: ["UX Design", "UI Design", "Software Engineering"],
        date: "May 2024",
        contributions: []
    },
    {
        id: 5,
        title: "Shape Gen",
        group: "experiment",
        iframePath: "/iframes/p5_ShapeGen/index.html",
        category_1: "art",
        tags: ["web", "real-time software", "generative"],
        thumbnailType: "image",
        thumbnailUrl: "/fireBoy.jpg",
        scope: ["p5.js", "RNBO", "Web Audio API", "JavaScript"],
        date: "Sep 2024",
        contributions: []
    },
    {
        id: 6,
        title: "Shelf Edge",
        group: "project",
        category_1: "art",
        tags: ["web", "real-time software", "generative"],
        thumbnailType: "video",
        thumbnailUrl: "/shelfedge_clip_01.mov",
        scope: ["p5.js", "RNBO", "Web Audio API", "JavaScript"],
        date: "Sep 2024",
        contributions: []
    }
  ];