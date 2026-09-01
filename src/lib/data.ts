// ─── Portfolio Data ─────────────────────────────────────────────────────────

export const hero = {
  name: "SRIRAJ M",
  title: "Full Stack Developer",
  headline:
    "Building scalable, full-stack web applications with React, Next.js & Node.js — spanning front-end architecture to back-end APIs.",
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Front-End",
    skills: [
      "React.js", "Redux", "Context API", "Vue.js", "Next.js",
      "JavaScript", "TypeScript", "HTML5", "CSS3/SCSS", "Tailwind CSS",
      "Ant Design", "Material UI",
    ],
  },
  {
    category: "Back-End",
    skills: ["Node.js", "Express.js", "PHP (Laravel, Yii2)", "REST API Design & Integration"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    category: "Architecture",
    skills: ["Micro Frontend (MFE) Architecture", "Component-Based Development"],
  },
  {
    category: "Testing & Tools",
    skills: [
      "Git", "Bitbucket", "JIRA", "Monday", "CI/CD Pipelines",
      "Jest", "GitHub Copilot", "Cursor", "Claude", "ChatGPT / AI-Assisted Development",
    ],
  },
];

export type Project = {
  name: string;
  client?: string;
  points: string[];
  tech: string[];
  stat?: { label: string; value: string };
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  projects: Project[];
};

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Mitrahsoft Solutions",
    period: "Sept 2022 – Present",
    projects: [
      {
        name: "Real Estate Management",
        points: [
          "Developed and maintained front-end components using React.js and JavaScript for a landlord/tenant management platform supporting 1,000+ landlords and 10,000+ property listings.",
          "Built a drag-and-drop content management tool enabling landlords to create and publish marketing templates across web and social channels.",
          "Integrated SQL databases to manage property listings, leads, and dashboard data, and optimised site performance, reducing average page load time by 50%.",
          "Delivered feature demos directly to business stakeholders, translating functional requirements into working UI.",
        ],
        tech: ["React.js", "PHP (Yii2)", "MySQL", "SCSS", "Redux Toolkit", "AWS S3"],
        stat: { value: "90%", label: "Page load improvement" },
      },
      {
        name: "Conference Management",
        points: [
          "Built dynamic, role-based forms and validation flows for administrators, organizers, reviewers, and participants across 6 conference-management modules, including submissions, reviews, registrations, and event workflows.",
          "Developed responsive, reusable UI components with React, Redux, and Tailwind CSS across all 6 modules for a multi-client conference platform.",
          "Designed and integrated REST APIs with a Node.js backend to manage conference data and module-based functionality across the platform.",
          "Implemented Redux-based state management to maintain data consistency across 6 interconnected application modules.",
          "Reviewed pull requests for engineers on other project teams and helped onboard and train 10+ new developers, supporting code quality and team ramp-up beyond own project scope.",
        ],
        tech: ["React.js", "Redux Thunk", "Next.js", "Node.js", "MySQL", "PostgreSQL", "Tailwind CSS", "Ant Design", "Material UI"],
        stat: { value: "6", label: "Interconnected modules" },
      },
      {
        name: "Internal Application",
        points: [
          "Developed and maintained employee management features using ReactJS and TypeScript for timesheets, exercises, leave management, and employee workflows.",
          "Designed reusable UI components and responsive screens to enhance employee and reviewer experience.",
          "Implemented exercise submission and review workflows with feedback, correction, and rework cycles.",
          "Integrated APIs and managed application data handling for employee details, timesheets, submissions, and leave records.",
          "Performed unit testing using Jest, debugging, and performance optimisation to ensure application reliability.",
        ],
        tech: ["React.js", "TypeScript", "Jest", "MongoDB", "Node.js", "Rest API", "Bootstrap"],
      },
    ],
  },
];

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  type: "email" | "linkedin" | "phone";
};

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "srirajappu22@gmail.com",
    href: "mailto:srirajappu22@gmail.com",
    type: "email",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sriraj-m-654b78246",
    href: "https://linkedin.com/in/sriraj-m-654b78246",
    type: "linkedin",
  },
  {
    label: "Phone",
    value: "+91 88380 76826",
    href: "tel:+918838076826",
    type: "phone",
  },
];
