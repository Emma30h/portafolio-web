import type { ComponentType } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiSupabase,
  SiRedis,
  SiZod,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";
import { FaFileExcel } from "react-icons/fa";
import { Database } from "lucide-react";

export type Skill = {
  name: string;
  icon: ComponentType<{ className?: string }>;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Prisma ORM", icon: SiPrisma },
      { name: "Zod", icon: SiZod },
    ],
  },
  {
    title: "Bases de datos & análisis de datos",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Supabase", icon: SiSupabase },
      { name: "Redis", icon: SiRedis },
      { name: "SQL", icon: Database },
      { name: "Excel", icon: FaFileExcel },
    ],
  },
  {
    title: "Herramientas",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Vercel", icon: SiVercel },
    ],
  },
];
