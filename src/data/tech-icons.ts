import type { ComponentType } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiPrisma,
  SiZod,
  SiJsonwebtokens,
  SiBrevo,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSupabase,
  SiRedis,
  SiGit,
  SiGithub,
  SiVercel,
  SiHostinger,
  SiDocker,
} from "react-icons/si";
import { FaFileExcel } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { Database, Boxes } from "lucide-react";

type IconComponent = ComponentType<{ className?: string }>;

const techIcons: Record<string, IconComponent> = {
  "next.js": SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  "tailwind css": SiTailwindcss,
  zustand: Boxes,
  "node.js": SiNodedotjs,
  express: SiExpress,
  nestjs: SiNestjs,
  graphql: SiGraphql,
  prisma: SiPrisma,
  "prisma orm": SiPrisma,
  zod: SiZod,
  jwt: SiJsonwebtokens,
  brevo: SiBrevo,
  postgresql: SiPostgresql,
  "node-postgres": SiPostgresql,
  mysql: SiMysql,
  "sql server": DiMsqlServer,
  mongodb: SiMongodb,
  supabase: SiSupabase,
  "supabase auth": SiSupabase,
  "supabase storage": SiSupabase,
  redis: SiRedis,
  sql: Database,
  excel: FaFileExcel,
  git: SiGit,
  github: SiGithub,
  vercel: SiVercel,
  "vercel cron": SiVercel,
  hostinger: SiHostinger,
  docker: SiDocker,
};

function normalizeTechName(name: string): string {
  return name
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+\d+(\.\d+)*$/g, "")
    .trim()
    .toLowerCase();
}

export function getTechIcon(name: string): IconComponent | undefined {
  return techIcons[normalizeTechName(name)];
}
