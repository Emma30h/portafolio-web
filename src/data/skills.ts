import type { ComponentType } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPrisma,
  SiExpress,
  SiGraphql,
  SiNestjs,
  SiJsonwebtokens,
  SiPostgresql,
  SiSupabase,
  SiRedis,
  SiMongodb,
  SiMysql,
  SiZod,
  SiGit,
  SiGithub,
  SiVercel,
  SiHostinger,
  SiDocker,
  SiBrevo,
} from "react-icons/si";
import { FaFileExcel } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { Database, Boxes } from "lucide-react";

export type SkillDetails = {
  summary: string;
  keyFeatures: string[];
  codeExample: {
    language: string;
    code: string;
  };
  pros: string[];
  cons: string[];
  combinesWith: string;
};

export type Skill = {
  name: string;
  icon: ComponentType<{ className?: string }>;
  docsUrl: string;
  details: SkillDetails;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      {
        name: "React",
        icon: SiReact,
        docsUrl: "https://react.dev",
        details: {
          summary:
            "Librería para construir interfaces de usuario a partir de componentes reutilizables y un modelo declarativo basado en estado.",
          keyFeatures: [
            "Hooks (useState, useEffect, hooks custom) para manejar estado y efectos sin clases",
            "Virtual DOM: reconcilia cambios y actualiza el DOM real solo donde hace falta",
            "Composición de componentes en vez de herencia",
          ],
          codeExample: {
            language: "tsx",
            code: `const [open, setOpen] = useState(false);

useEffect(() => {
  document.title = open ? "Abierto" : "Cerrado";
}, [open]);`,
          },
          pros: [
            "Ecosistema enorme y maduro",
            "Modelo de componentes que favorece la reutilización",
            "Gran disponibilidad de documentación y talento",
          ],
          cons: [
            "Solo resuelve la capa de vista: routing, fetching de datos y otras piezas requieren librerías adicionales",
            "Curva de aprendizaje en conceptos como hooks y re-renders",
          ],
          combinesWith:
            "Es la base de Next.js (que le agrega routing, SSR y optimización) y se integra con Zustand para manejar estado global sin la complejidad de un store más pesado.",
        },
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        docsUrl: "https://nextjs.org/docs",
        details: {
          summary:
            "Framework sobre React que agrega routing basado en archivos, renderizado en servidor (SSR/SSG), Server Components y Server Actions.",
          keyFeatures: [
            "App Router: routing basado en carpetas (page.tsx, layout.tsx, loading.tsx)",
            "Server Components por defecto: menos JS al cliente, fetch de datos directo en el componente",
            "Server Actions: mutaciones sin escribir un endpoint de API aparte",
          ],
          codeExample: {
            language: "tsx",
            code: `"use server";

export async function guardarAgente(data: FormData) {
  await prisma.agente.create({
    data: { nombre: data.get("nombre") as string },
  });
}`,
          },
          pros: [
            "Permite mezclar renderizado en servidor y cliente en la misma app",
            "Server Actions simplifican las mutaciones sin escribir una API aparte",
            "Buen soporte de imágenes, fuentes y SEO por defecto",
          ],
          cons: [
            "Más piezas mentales que un SPA simple (qué corre en servidor vs. en cliente)",
            "Cambios frecuentes entre versiones mayores",
          ],
          combinesWith:
            "En mis proyectos lo combino con Prisma o SQL directo para la capa de datos, Tailwind CSS para estilos y Supabase como backend de autenticación/almacenamiento.",
        },
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        docsUrl: "https://www.typescriptlang.org/docs/",
        details: {
          summary:
            "Superset de JavaScript que agrega tipado estático, detectando errores en tiempo de desarrollo en vez de en producción.",
          keyFeatures: [
            "Tipos estructurales: dos tipos son compatibles si tienen la misma forma, no el mismo nombre",
            "Generics para escribir código reutilizable sin perder el tipo",
            "Utility types (Partial, Pick, Omit) para derivar tipos a partir de otros",
          ],
          codeExample: {
            language: "ts",
            code: `function primero<T>(items: T[]): T | undefined {
  return items[0];
}

primero(["a", "b"]); // string | undefined
primero([1, 2, 3]); // number | undefined`,
          },
          pros: [
            "Atrapa errores antes de correr el código",
            "Autocompletado y refactors más seguros",
            "Se integra con Zod para validar datos en runtime sin perder los tipos",
          ],
          cons: [
            "Suma tiempo de configuración y compilación",
            "Los tipos complejos pueden volverse difíciles de leer",
          ],
          combinesWith:
            "Funciona en toda la pila: en el frontend con React/Next.js, en el backend con Node/Express/NestJS, y junto con Prisma o Zod para que los tipos de la base de datos y de las validaciones lleguen hasta la UI.",
        },
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        docsUrl: "https://tailwindcss.com/docs",
        details: {
          summary:
            "Framework de CSS basado en utilidades: se escriben clases pequeñas y combinables directamente en el markup en vez de hojas de estilo separadas.",
          keyFeatures: [
            "Utilidades responsive con prefijos (sm:, md:, lg:) mobile-first",
            "Dark mode con la clase dark: sin escribir media queries a mano",
            "Variantes de estado (hover:, focus:, disabled:) directo en el markup",
          ],
          codeExample: {
            language: "tsx",
            code: `<button className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 dark:bg-indigo-500">
  Guardar
</button>`,
          },
          pros: [
            "Prototipado rápido sin saltar entre archivos",
            "Consistencia visual mediante un sistema de escalas (espaciado, colores, tipografía)",
            "El bundle final solo incluye las clases realmente usadas",
          ],
          cons: [
            "El markup puede volverse verboso con muchas clases",
            "Requiere acostumbrarse a pensar en utilidades en vez de componentes CSS",
          ],
          combinesWith:
            "Se usa naturalmente con React/Next.js, donde cada componente encapsula sus propias clases; también soporta dark mode con la misma sintaxis, sin JS adicional.",
        },
      },
      {
        name: "Zustand",
        icon: Boxes,
        docsUrl: "https://zustand.docs.pmnd.rs/",
        details: {
          summary:
            "Librería minimalista de manejo de estado global para React, sin el boilerplate de Redux.",
          keyFeatures: [
            "Un store se crea con create() y se consume como un hook, sin Provider",
            "Selectors: cada componente se suscribe solo al slice de estado que usa, evitando renders de más",
            "Middlewares opcionales (persist, devtools) para casos concretos, sin imponerlos",
          ],
          codeExample: {
            language: "ts",
            code: `const useCounter = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));

// en un componente:
const count = useCounter((s) => s.count);`,
          },
          pros: [
            "API muy simple: un hook para leer y actualizar estado",
            "Poco código repetitivo comparado con Redux",
            "No requiere envolver la app en un Provider",
          ],
          cons: [
            "Menos estructura impuesta que Redux, lo que puede desordenar proyectos grandes sin convenciones propias",
            "Ecosistema de herramientas (devtools, middlewares) más chico",
          ],
          combinesWith:
            "Se complementa con React/Next.js para estado de UI que no depende del servidor (filtros, modales, selección), dejando el estado del servidor a fetching directo o librerías especializadas.",
        },
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        docsUrl: "https://nodejs.org/docs/latest/api/",
        details: {
          summary:
            "Entorno de ejecución de JavaScript del lado del servidor, basado en el motor V8.",
          keyFeatures: [
            "Event loop: un solo hilo que no bloquea en operaciones de I/O (archivos, red, DB)",
            "CommonJS y ES Modules conviven (require vs. import)",
            "API de streams para procesar datos grandes sin cargarlos enteros en memoria",
          ],
          codeExample: {
            language: "js",
            code: `import { readFile } from "node:fs/promises";

const data = await readFile("agentes.json", "utf-8");
const agentes = JSON.parse(data);`,
          },
          pros: [
            "Mismo lenguaje en frontend y backend, lo que reduce el cambio de contexto",
            "Modelo asíncrono no bloqueante, bueno para I/O intensivo (APIs, bases de datos)",
            "Ecosistema npm enorme",
          ],
          cons: [
            "No es la mejor opción para tareas muy intensivas en CPU (cálculo pesado, procesamiento de imágenes en volumen)",
            "El manejo de errores asíncronos requiere disciplina",
          ],
          combinesWith:
            "Es la base de Next.js, Express y NestJS; junto con Prisma o node-postgres arma la capa de acceso a datos del backend.",
        },
      },
      {
        name: "Express",
        icon: SiExpress,
        docsUrl: "https://expressjs.com/",
        details: {
          summary:
            "Framework minimalista para Node.js: define rutas, middlewares y respuestas HTTP con muy poca estructura impuesta.",
          keyFeatures: [
            "Middlewares encadenados: cada uno puede modificar el request/response o cortar la cadena",
            "Routers modulares para separar rutas por dominio",
            "app.use() para lógica transversal (auth, logging, CORS) sin repetirla en cada ruta",
          ],
          codeExample: {
            language: "js",
            code: `app.use(express.json());

app.get("/agentes/:id", async (req, res) => {
  const agente = await db.agentes.findById(req.params.id);
  res.json(agente);
});`,
          },
          pros: [
            "Curva de aprendizaje baja",
            "Total libertad para organizar el proyecto como se necesite",
            "Middlewares disponibles para casi cualquier necesidad (auth, logging, CORS)",
          ],
          cons: [
            "Esa libertad también significa definir convenciones propias en equipos grandes",
            "Menos estructura de fábrica que frameworks más opinados como NestJS",
          ],
          combinesWith:
            "Suele combinarse con JWT para autenticación stateless y con un ORM (Prisma) o driver SQL directo para la base de datos.",
        },
      },
      {
        name: "NestJS",
        icon: SiNestjs,
        docsUrl: "https://docs.nestjs.com/",
        details: {
          summary:
            "Framework para Node.js con arquitectura modular inspirada en Angular (módulos, controladores, servicios, inyección de dependencias).",
          keyFeatures: [
            "Decoradores (@Controller, @Injectable, @Get) para declarar rutas y dependencias",
            "Inyección de dependencias: los servicios se piden por el constructor, Nest resuelve las instancias",
            "Módulos que agrupan controllers + providers relacionados",
          ],
          codeExample: {
            language: "ts",
            code: `@Controller("agentes")
export class AgentesController {
  constructor(private readonly service: AgentesService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }
}`,
          },
          pros: [
            "Estructura clara para proyectos grandes o en equipo",
            "Integra bien TypeScript, validación y documentación (Swagger) de forma nativa",
            "Buen soporte para GraphQL, microservicios y colas",
          ],
          cons: [
            "Más conceptos para aprender que Express",
            "Puede ser más código del necesario para features muy simples",
          ],
          combinesWith:
            "Se integra naturalmente con Prisma o TypeORM para datos, JWT/Passport para auth, y puede exponer tanto REST como GraphQL desde la misma base de código.",
        },
      },
      {
        name: "GraphQL",
        icon: SiGraphql,
        docsUrl: "https://graphql.org/learn/",
        details: {
          summary:
            "Lenguaje de consultas para APIs: el cliente pide exactamente los campos que necesita, en una sola consulta, en vez de múltiples endpoints REST.",
          keyFeatures: [
            "Un único endpoint: el cliente elige qué campos pedir en cada query",
            "Schema fuertemente tipado (SDL) que documenta la API automáticamente",
            "Resolvers: una función por campo que sabe cómo resolver ese dato",
          ],
          codeExample: {
            language: "graphql",
            code: `type Agente {
  id: ID!
  nombre: String!
  rango: Rango!
}

type Query {
  agente(id: ID!): Agente
}`,
          },
          pros: [
            "Evita over-fetching y under-fetching de datos",
            "Un solo endpoint tipado con schema autodescriptivo",
            "Buen fit cuando distintas pantallas necesitan formas distintas de los mismos datos",
          ],
          cons: [
            "Cachear respuestas es más complejo que con REST",
            "Requiere más setup inicial (schema, resolvers) para casos simples",
          ],
          combinesWith:
            "Se monta típicamente sobre Node.js/NestJS o Express, y puede convivir con REST en el mismo backend para las partes que no lo necesitan.",
        },
      },
      {
        name: "Prisma ORM",
        icon: SiPrisma,
        docsUrl: "https://www.prisma.io/docs",
        details: {
          summary:
            "ORM para Node.js/TypeScript: define el modelo de datos en un schema y genera un cliente tipado para consultar la base de datos.",
          keyFeatures: [
            "Schema declarativo (schema.prisma) que define modelos y relaciones",
            "Cliente autogenerado y tipado según ese schema",
            "Migraciones versionadas con prisma migrate",
          ],
          codeExample: {
            language: "ts",
            code: `const agente = await prisma.agente.findUnique({
  where: { id },
  include: { rango: true },
});

console.log(agente.rango.nombre); // tipado automáticamente`,
          },
          pros: [
            "Autocompletado y tipos generados automáticamente a partir del schema",
            "Migraciones versionadas incluidas",
            "Sintaxis de consultas más legible que SQL crudo para casos comunes",
          ],
          cons: [
            "Consultas muy complejas a veces son más simples de escribir en SQL directo",
            "Una capa de abstracción más entre el código y la base de datos",
          ],
          combinesWith:
            "Es la pieza central de la capa de datos en Perfiles Garden, trabajando junto con PostgreSQL (vía Supabase) y TypeScript para que el tipado llegue de la base de datos a la UI.",
        },
      },
      {
        name: "Zod",
        icon: SiZod,
        docsUrl: "https://zod.dev/",
        details: {
          summary:
            "Librería de validación de esquemas para TypeScript: valida datos en runtime (formularios, body de requests) e infiere el tipo TypeScript automáticamente a partir del esquema.",
          keyFeatures: [
            "z.infer<> deriva el tipo TypeScript directamente del schema, sin duplicarlo",
            "safeParse() devuelve un resultado tipado en vez de lanzar una excepción",
            "Los schemas se pueden componer con .extend(), .pick(), .merge()",
          ],
          codeExample: {
            language: "ts",
            code: `const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginInput = z.infer<typeof loginSchema>;`,
          },
          pros: [
            "Una sola fuente de verdad para validación y tipos, sin duplicar definiciones",
            "Mensajes de error claros y personalizables",
            "Se integra bien con Server Actions y formularios",
          ],
          cons: [
            "Overhead de aprendizaje si el equipo no conoce validación basada en schemas",
            "Esquemas muy anidados pueden volverse difíciles de mantener",
          ],
          combinesWith:
            "En Calendario Garden valida las credenciales de login antes de tocar la base de datos; en general se usa junto con TypeScript para que la validación en runtime y los tipos en tiempo de compilación no se desincronicen.",
        },
      },
      {
        name: "JWT",
        icon: SiJsonwebtokens,
        docsUrl: "https://jwt.io/introduction",
        details: {
          summary:
            "JSON Web Tokens: estándar para representar credenciales de forma compacta y firmada, usado típicamente para autenticación stateless entre cliente y servidor.",
          keyFeatures: [
            "Tres partes separadas por puntos: header.payload.signature, codificadas en base64url",
            "La firma garantiza integridad, no confidencialidad: cualquiera puede leer el payload",
            "exp define expiración; el servidor la valida antes de confiar en el token",
          ],
          codeExample: {
            language: "ts",
            code: `const token = jwt.sign({ userId: 1 }, "secreto", { expiresIn: "2h" });

const payload = jwt.verify(token, "secreto");`,
          },
          pros: [
            "No requiere guardar sesión en el servidor (stateless), lo que facilita escalar horizontalmente",
            "Permite llevar en el token la info mínima necesaria (rol, id de usuario)",
            "Estándar ampliamente soportado",
          ],
          cons: [
            "Un token robado es válido hasta que expira: hay que pensar bien tiempos de expiración y revocación",
            "No conviene guardar datos sensibles en el payload (se puede leer sin la clave, aunque no modificar sin invalidar la firma)",
          ],
          combinesWith:
            "Se usa junto con Express o NestJS para proteger rutas, y suele combinarse con bcrypt para el hash de contraseñas en el login.",
        },
      },
      {
        name: "Brevo (SMTP)",
        icon: SiBrevo,
        docsUrl: "https://developers.brevo.com/",
        details: {
          summary:
            "Plataforma de envío de emails; se usa vía su servidor SMTP para mandar correos transaccionales (recuperación de contraseña, notificaciones) desde el backend.",
          keyFeatures: [
            "Se integra como cualquier servidor SMTP (host, puerto, usuario, API key), sin SDK propietario obligatorio",
            "Templates y tracking de entregas desde su panel, además de la API",
            "Límite de envíos diarios en el plan gratuito, a tener en cuenta al diseñar el cron",
          ],
          codeExample: {
            language: "ts",
            code: `const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: { user, pass },
});

await transporter.sendMail({ to, subject, html });`,
          },
          pros: [
            "No hay que mantener infraestructura propia de envío de correo",
            "Buena entregabilidad comparado con enviar desde un servidor propio",
            "Panel para ver el estado de cada envío",
          ],
          cons: [
            "Dependencia de un servicio externo y de sus límites de envío en el plan gratuito",
            "Requiere manejar credenciales SMTP de forma segura (variables de entorno)",
          ],
          combinesWith:
            "En Calendario Garden se dispara desde un cron job de Vercel que arma el resumen diario y lo envía por este SMTP, dejando registro de cada entrega en la base de datos.",
        },
      },
    ],
  },
  {
    title: "Bases de datos & análisis de datos",
    skills: [
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        docsUrl: "https://www.postgresql.org/docs/",
        details: {
          summary:
            "Sistema de gestión de bases de datos relacional, open source, conocido por su robustez y soporte de tipos de datos avanzados (JSON, arrays, full-text search).",
          keyFeatures: [
            "Transacciones ACID: una serie de cambios se aplica todo o nada",
            "Índices (B-tree, GIN, GiST) para acelerar consultas según el tipo de dato",
            "Tipos avanzados: JSONB, arrays, full-text search nativo",
          ],
          codeExample: {
            language: "sql",
            code: `SELECT a.nombre, r.nombre AS rango
FROM agente a
JOIN rango r ON r.id = a.rango_id
WHERE a.sector_id = 3;`,
          },
          pros: [
            "Muy confiable para integridad de datos (transacciones ACID)",
            "Soporta relaciones complejas, clave en sistemas con muchas entidades vinculadas",
            "Buen rendimiento incluso con consultas complejas",
          ],
          cons: [
            "Requiere más planificación de esquema que una base NoSQL para prototipos rápidos",
            "Escalar horizontalmente es más trabajoso que con algunas bases NoSQL",
          ],
          combinesWith:
            "Es la base de datos de ambos proyectos reales (Perfiles Garden y Calendario Garden): en uno accedida vía Prisma y en el otro con SQL directo (node-postgres), ambos sobre Supabase.",
        },
      },
      {
        name: "MySQL",
        icon: SiMysql,
        docsUrl: "https://dev.mysql.com/doc/",
        details: {
          summary:
            "Sistema de gestión de bases de datos relacional, uno de los más usados históricamente en aplicaciones web.",
          keyFeatures: [
            "Motores de almacenamiento intercambiables (InnoDB para transacciones, MyISAM para lecturas simples)",
            "Replicación maestro-esclavo madura para escalar lecturas",
            "AUTO_INCREMENT nativo para claves primarias",
          ],
          codeExample: {
            language: "sql",
            code: `CREATE TABLE agente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120)
);`,
          },
          pros: [
            "Amplia adopción y documentación",
            "Buen rendimiento en lecturas para aplicaciones web tradicionales",
            "Fácil de conseguir hosting compatible (muy común en hosting compartido)",
          ],
          cons: [
            "Algunas funciones avanzadas (JSON, funciones de ventana) llegaron más tarde que en PostgreSQL",
            "Menor flexibilidad en tipos de datos avanzados",
          ],
          combinesWith:
            "Suele combinarse con Node.js/Express o backends PHP; con un ORM como Prisma se puede intercambiar por PostgreSQL con cambios mínimos en el código de la aplicación.",
        },
      },
      {
        name: "SQL Server",
        icon: DiMsqlServer,
        docsUrl: "https://learn.microsoft.com/en-us/sql/sql-server/",
        details: {
          summary:
            "Sistema de gestión de bases de datos relacional de Microsoft, común en entornos corporativos que ya usan el ecosistema Microsoft.",
          keyFeatures: [
            "T-SQL: variante de SQL con procedimientos almacenados, funciones y manejo de errores propio (TRY/CATCH)",
            "Integración directa con herramientas de BI (SSRS, Power BI)",
            "Niveles de aislamiento de transacciones configurables por consulta",
          ],
          codeExample: {
            language: "sql",
            code: `CREATE PROCEDURE ObtenerAgente @Id INT AS
  SELECT nombre FROM Agente WHERE id = @Id;`,
          },
          pros: [
            "Buena integración con herramientas Microsoft (Active Directory, Power BI, .NET)",
            "Herramientas de administración maduras (SSMS)",
            "Buen soporte para procedimientos almacenados y reporting",
          ],
          cons: [
            "Licenciamiento más costoso que alternativas open source",
            "Menos común fuera de entornos Microsoft",
          ],
          combinesWith:
            "Encaja naturalmente en stacks .NET o en organizaciones que ya reportan con Power BI/Excel sobre esa misma base.",
        },
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        docsUrl: "https://www.mongodb.com/docs/",
        details: {
          summary:
            "Base de datos NoSQL orientada a documentos: guarda los datos como documentos tipo JSON en vez de tablas con columnas fijas.",
          keyFeatures: [
            "Documentos BSON (JSON binario) sin esquema fijo entre documentos de la misma colección",
            "Aggregation pipeline: transforma datos en etapas encadenadas ($match, $group, $lookup)",
            "Índices sobre cualquier campo, incluso dentro de documentos anidados",
          ],
          codeExample: {
            language: "js",
            code: `db.agentes.insertOne({ nombre: "Ana", sectorId: 3 });

db.agentes.find({ sectorId: 3 });`,
          },
          pros: [
            "Esquema flexible, útil cuando la forma de los datos varía o cambia seguido",
            "Escala horizontalmente de forma más directa que una base relacional",
            "Buen fit para datos jerárquicos o poco estructurados",
          ],
          cons: [
            "Sin JOINs nativos: modelar relaciones complejas requiere más cuidado (embeber vs. referenciar)",
            "Menos garantías de integridad que una base relacional si no se diseña con cuidado",
          ],
          combinesWith:
            "Se usa típicamente con Node.js/Express vía Mongoose, y es una alternativa a PostgreSQL cuando el dominio no necesita relaciones muy estructuradas.",
        },
      },
      {
        name: "Supabase",
        icon: SiSupabase,
        docsUrl: "https://supabase.com/docs",
        details: {
          summary:
            "Plataforma de backend como servicio sobre PostgreSQL: da base de datos administrada, autenticación, storage de archivos y una API REST/realtime lista para usar.",
          keyFeatures: [
            "Row Level Security (RLS) de Postgres para definir permisos por fila directo en la base",
            "Cliente JS que combina auth, storage y queries con una sola librería",
            "Realtime: suscribirse a cambios de una tabla vía websockets",
          ],
          codeExample: {
            language: "ts",
            code: `const { data } = await supabase
  .from("agente")
  .select("*")
  .eq("id", id);`,
          },
          pros: [
            "Evita levantar infraestructura propia para auth, storage y base de datos",
            "Sigue siendo PostgreSQL real por debajo, sin encierro total en un formato propietario",
            "Plan gratuito razonable para proyectos chicos o medianos",
          ],
          cons: [
            "Dependencia de un proveedor externo para piezas críticas (auth, storage)",
            "Algunas funciones avanzadas de Postgres requieren configuración extra para habilitarse",
          ],
          combinesWith:
            "En Perfiles Garden se usa para base de datos, autenticación y storage de fotos de perfil; en Calendario Garden solo la base de datos, accedida con una conexión de solo lectura para sincronizar datos entre ambos proyectos.",
        },
      },
      {
        name: "Redis",
        icon: SiRedis,
        docsUrl: "https://redis.io/docs/latest/",
        details: {
          summary:
            "Base de datos en memoria clave-valor, usada típicamente como caché o para datos que necesitan lecturas muy rápidas.",
          keyFeatures: [
            "Estructuras de datos nativas: strings, hashes, lists, sets, sorted sets",
            "TTL (expiración) por clave, ideal para caché que se invalida solo",
            "Operaciones atómicas (INCR, SETNX) útiles para locks o contadores",
          ],
          codeExample: {
            language: "ts",
            code: `await redis.set("agente:1", JSON.stringify(agente), "EX", 60);

const cached = await redis.get("agente:1");`,
          },
          pros: [
            "Latencia muy baja al vivir en memoria",
            "Estructuras de datos útiles más allá de un simple caché (listas, sets, contadores)",
            "Reduce carga sobre la base de datos principal en consultas frecuentes",
          ],
          cons: [
            "Los datos no persisten de forma tan robusta como en una base de datos relacional (aunque soporta persistencia configurable)",
            "Suma una pieza de infraestructura más para mantener",
          ],
          combinesWith:
            "En Perfiles Garden actúa como caché frente a PostgreSQL/Prisma, para aliviar consultas repetidas desde las API Routes.",
        },
      },
      {
        name: "SQL",
        icon: Database,
        docsUrl: "https://www.postgresql.org/docs/current/sql.html",
        details: {
          summary:
            "Lenguaje estándar para consultar y manipular bases de datos relacionales; la base sobre la que se apoyan PostgreSQL, MySQL y SQL Server.",
          keyFeatures: [
            "Declarativo: describe QUÉ se quiere, no cómo obtenerlo (eso lo resuelve el motor)",
            "JOINs para combinar tablas relacionadas (INNER, LEFT, RIGHT)",
            "Funciones de ventana (OVER, PARTITION BY) para cálculos sin colapsar filas",
          ],
          codeExample: {
            language: "sql",
            code: `SELECT nombre, sector_id
FROM agente
WHERE sector_id = 3
ORDER BY nombre;`,
          },
          pros: [
            "Portable entre motores relacionales, con pequeñas variaciones de sintaxis",
            "Expresivo para filtrar, combinar y agregar datos",
            "Habilidad transferible entre proyectos y stacks",
          ],
          cons: [
            "Consultas muy complejas (múltiples JOINs, subconsultas) pueden ser difíciles de leer y mantener",
            "Optimizar rendimiento requiere entender índices y planes de ejecución",
          ],
          combinesWith:
            "Es la base de todo lo relacional: se usa tanto directo (como en Calendario Garden con node-postgres) como generado por un ORM como Prisma.",
        },
      },
      {
        name: "Excel",
        icon: FaFileExcel,
        docsUrl: "https://support.microsoft.com/en-us/excel",
        details: {
          summary:
            "Hoja de cálculo usada para análisis de datos, reportes y como formato de intercambio con usuarios no técnicos.",
          keyFeatures: [
            "Tablas dinámicas para resumir y cruzar datos sin escribir fórmulas complejas",
            "Fórmulas como BUSCARV/XLOOKUP para combinar datos de distintas hojas",
            "Se puede generar programáticamente desde el backend (ExcelJS) para exportar reportes",
          ],
          codeExample: {
            language: "ts",
            code: `const sheet = workbook.addWorksheet("Agentes");
sheet.addRow(["Nombre", "Rango"]);
sheet.addRow(["Ana Pérez", "Oficial"]);`,
          },
          pros: [
            "Formato universal que cualquier usuario de negocio sabe abrir y leer",
            "Rápido para análisis exploratorio con tablas dinámicas y fórmulas",
            "Fácil de generar desde el backend para exportar reportes",
          ],
          cons: [
            "No escala bien para volúmenes grandes de datos ni procesos automatizados complejos",
            "Propenso a errores manuales en fórmulas o rangos",
          ],
          combinesWith:
            "En Perfiles Garden se usa como formato de exportación (junto con CSV) para que administradores saquen listados y reportes del sistema sin necesitar acceso directo a la base de datos.",
        },
      },
    ],
  },
  {
    title: "Herramientas",
    skills: [
      {
        name: "Git",
        icon: SiGit,
        docsUrl: "https://git-scm.com/doc",
        details: {
          summary:
            "Sistema de control de versiones: registra el historial de cambios del código y permite trabajar en paralelo sin pisarse.",
          keyFeatures: [
            "Cada commit es una foto completa del proyecto (no solo un diff), identificado por un hash",
            "Ramas livianas: crear una rama es solo mover un puntero, no copiar archivos",
            "Merge vs. rebase: dos formas distintas de integrar cambios de una rama a otra",
          ],
          codeExample: {
            language: "bash",
            code: `git add .
git commit -m "Agrega turnos rotativos"
git push`,
          },
          pros: [
            "Historial completo y reversible de cada cambio",
            "Ramas (branches) para desarrollar features en paralelo sin afectar el código estable",
            "Estándar de facto: se usa en prácticamente cualquier equipo",
          ],
          cons: [
            "Conceptos como rebase, conflictos de merge o historial reescrito pueden confundir al principio",
            "Buenas prácticas de commits y branches requieren disciplina del equipo",
          ],
          combinesWith:
            "Es la base de GitHub (donde vive el remoto) y del despliegue en Vercel, que redeploya automáticamente al pushear a la rama principal.",
        },
      },
      {
        name: "GitHub",
        icon: SiGithub,
        docsUrl: "https://docs.github.com/",
        details: {
          summary:
            "Plataforma que aloja repositorios Git en la nube y agrega colaboración: pull requests, issues, revisiones de código y automatización (Actions).",
          keyFeatures: [
            "Pull requests para revisar código antes de mergear a la rama principal",
            "GitHub Actions para correr tests/builds automáticamente en cada push",
            "Issues para trackear bugs y features, vinculables a un PR",
          ],
          codeExample: {
            language: "yaml",
            code: `on: [pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build`,
          },
          pros: [
            "Punto central para colaborar, revisar código y discutir cambios",
            "Se integra directo con Vercel para despliegue automático en cada push",
            "Portfolio público de código, útil para mostrar trabajo",
          ],
          cons: [
            "Funciones avanzadas (Actions con muchos minutos, seguridad avanzada) tienen costo en repos privados",
            "Requiere buenas prácticas de PRs para que el historial siga siendo útil",
          ],
          combinesWith:
            "Conecta directamente con Vercel (CI/CD) y es donde están alojados tanto este portfolio como Perfiles Garden y Calendario Garden.",
        },
      },
      {
        name: "Vercel",
        icon: SiVercel,
        docsUrl: "https://vercel.com/docs",
        details: {
          summary:
            "Plataforma de hosting especializada en Next.js (aunque soporta otros frameworks): despliega automáticamente desde GitHub, con preview deployments por cada PR.",
          keyFeatures: [
            "Preview deployment automático por cada pull request, con su propia URL",
            "Edge Functions y Vercel Cron sin levantar infraestructura propia",
            "Variables de entorno separadas por ambiente (development, preview, production)",
          ],
          codeExample: {
            language: "json",
            code: `{
  "crons": [
    { "path": "/api/notificaciones/diarias", "schedule": "0 9 * * *" }
  ]
}`,
          },
          pros: [
            "Integración nativa con Next.js: Server Components, Server Actions y funciones edge sin configuración extra",
            "Deploy automático en cada push, con URLs de preview por rama",
            "Vercel Cron para tareas programadas sin infraestructura propia",
          ],
          cons: [
            "El plan gratuito tiene límites de uso que hay que vigilar en proyectos con tráfico real",
            "Cierto vendor lock-in en features específicas de la plataforma (como Cron o Edge Functions)",
          ],
          combinesWith:
            "Aloja tanto este portfolio como Calendario Garden, donde además se usa Vercel Cron para disparar el envío diario de notificaciones por email.",
        },
      },
      {
        name: "Hostinger",
        icon: SiHostinger,
        docsUrl: "https://support.hostinger.com/",
        details: {
          summary:
            "Proveedor de hosting compartido/VPS, una alternativa más tradicional (y económica) a plataformas serverless como Vercel.",
          keyFeatures: [
            "Planes de hosting compartido y VPS, con panel propio (hPanel)",
            "Soporte para desplegar apps Node.js en VPS con PM2 o Docker",
            "Certificados SSL y dominios administrables desde el mismo panel",
          ],
          codeExample: {
            language: "bash",
            code: `npm run build
pm2 start npm --name "app" -- start`,
          },
          pros: [
            "Costo accesible para proyectos personales o de bajo tráfico",
            "Control más directo sobre el servidor en planes VPS",
            "Buena opción cuando no se necesita todo el ecosistema de una plataforma serverless",
          ],
          cons: [
            "Requiere más configuración manual que un deploy automático tipo Vercel",
            "Escalar tráfico alto es más manual (no autoescala como una plataforma serverless)",
          ],
          combinesWith:
            "Es una alternativa a Vercel para proyectos que no necesitan Server Actions o Edge Functions, o donde conviene un hosting más económico y tradicional.",
        },
      },
      {
        name: "Docker",
        icon: SiDocker,
        docsUrl: "https://docs.docker.com/",
        details: {
          summary:
            "Herramienta para empaquetar una aplicación junto con todo lo que necesita para correr (dependencias, versión de runtime) en un contenedor portable.",
          keyFeatures: [
            "Imágenes por capas: cada instrucción del Dockerfile es una capa cacheable",
            "docker-compose para levantar varios servicios (app + DB + Redis) con un comando",
            "Contenedores son efímeros: el estado persistente va en volúmenes, no en el contenedor",
          ],
          codeExample: {
            language: "dockerfile",
            code: `FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]`,
          },
          pros: [
            '"Funciona en mi máquina" deja de ser un problema: el contenedor corre igual en cualquier entorno',
            "Facilita levantar servicios auxiliares (bases de datos, Redis) en desarrollo con un solo comando",
            "Estándar para desplegar en casi cualquier proveedor cloud",
          ],
          cons: [
            "Suma una capa de aprendizaje (Dockerfile, docker-compose, volúmenes, redes)",
            "Las imágenes mal optimizadas pueden pesar mucho y hacer los builds lentos",
          ],
          combinesWith:
            "Útil para levantar PostgreSQL, MySQL o Redis en local sin instalarlos directamente en la máquina, y como base para desplegar en proveedores que no son serverless.",
        },
      },
    ],
  },
];
