export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  summary: string;
  role: string;
  stack: string[];
  repoUrl?: string;
  featured: boolean;
  highlights: string[];
  architecture: {
    description: string;
    diagram: string;
  };
  dataModel: {
    description: string;
    diagram: string;
  };
  features: { title: string; description: string }[];
};

export const projects: Project[] = [
  {
    slug: "perfiles-garden",
    title: "Perfiles Garden",
    shortDescription:
      "Sistema de gestión de legajos y turnos para personal policial.",
    summary:
      "Aplicación web interna para administrar los legajos digitales del personal de una dirección policial: datos personales, médicos, laborales y disciplinarios, junto con la gestión de turnos, licencias y ascensos. Reemplaza planillas y procesos manuales por un sistema centralizado con control de accesos por rol.",
    role: "Diseño y desarrollo full-stack (frontend, backend y modelo de datos)",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL (Supabase)",
      "Supabase Auth",
      "Redis",
      "Tailwind CSS",
    ],
    featured: true,
    highlights: [
      "Control de acceso por rol (SUPERADMIN, ADMIN, SUPERVISOR, OPERADOR, READONLY)",
      "Portal de autogestión: el personal solicita cambios (foto, datos) y un admin los aprueba",
      "Registro de auditoría de cada cambio sobre los legajos",
      "Motor de rotación de turnos y seguimiento de licencias/francos",
      "Exportación a Excel/CSV de listados y reportes",
    ],
    architecture: {
      description:
        "El frontend y el backend conviven en el mismo proyecto Next.js usando el App Router: las páginas se renderizan como Server Components, las mutaciones (crear, editar, aprobar) pasan por Server Actions y algunas integraciones puntuales se exponen como API Routes. Toda la app habla con la base de datos a través de Prisma como capa de acceso a datos. Supabase se usa como backend de infraestructura: Postgres administrado, autenticación de usuarios y almacenamiento de archivos (fotos de perfil). Redis se usa como caché para aliviar consultas frecuentes.",
      diagram: `flowchart TD
    Browser[Navegador] --> RSC[Server Components]
    Browser --> SA[Server Actions]
    Browser --> API[API Routes]
    Browser -->|Login| Auth[Supabase Auth]

    RSC --> Prisma[Prisma ORM]
    SA --> Prisma
    API --> Prisma
    SA --> Storage[Supabase Storage]
    API --> Redis[(Redis Cache)]

    Prisma --> DB[(PostgreSQL)]
    Auth --> DB
    Storage --> DB`,
    },
    dataModel: {
      description:
        "El modelo real tiene más de 20 tablas en Prisma; este diagrama muestra el núcleo simplificado. La entidad central es Agente, que se vincula a un Rango y a un Sector (que a su vez puede tener subsectores, formando una jerarquía). Cada Agente puede tener una cuenta de Usuario asociada, y acumula historial de cambios de estado y de rango para trazabilidad. La asignación a turnos pasa por una tabla intermedia (TurnoAgente) típica de una relación muchos-a-muchos, y las licencias y solicitudes de edición quedan registradas contra el agente que las originó.",
      diagram: `erDiagram
    AGENTE }o--|| RANGO : posee
    AGENTE }o--|| SECTOR : pertenece_a
    SECTOR ||--o{ SECTOR : subsector_de
    AGENTE ||--o| USUARIO : vinculado_a
    AGENTE ||--o{ HISTORIAL_ESTADO : registra
    AGENTE ||--o{ HISTORIAL_RANGO : registra
    AGENTE ||--o{ LICENCIA : solicita
    AGENTE ||--o{ SOLICITUD_EDICION : envia
    TURNO ||--o{ TURNO_AGENTE : incluye
    AGENTE ||--o{ TURNO_AGENTE : asignado_a
    TURNO ||--o{ DIA_TURNO : programa`,
    },
    features: [
      {
        title: "Roles y permisos",
        description:
          "Cinco niveles de acceso definen qué puede ver y modificar cada usuario, desde solo lectura hasta control total del sistema.",
      },
      {
        title: "Aprobaciones con flujo de trabajo",
        description:
          "Cambios sensibles (foto de perfil, datos del legajo, vinculación de cuenta por CUIL/DNI) se piden como solicitud y quedan pendientes de aprobación de un administrador.",
      },
      {
        title: "Auditoría",
        description:
          "Cada modificación relevante queda registrada en una tabla de auditoría, para poder reconstruir qué cambió, cuándo y quién lo hizo.",
      },
      {
        title: "Gestión de turnos y licencias",
        description:
          "Programación de turnos rotativos por día, cobertura de turnos externos y seguimiento de licencias con control de saldo disponible.",
      },
    ],
  },
  {
    slug: "calendario-garden",
    title: "Calendario Garden",
    shortDescription:
      "Calendario institucional de efemérides y cumpleaños, con notificaciones automáticas por email.",
    summary:
      "Aplicación complementaria a Perfiles Garden: un calendario anual/mensual de efemérides institucionales y cumpleaños del personal, con un panel de administración y el envío de un resumen diario por email de forma automática. Un aspecto particular del proyecto es que sincroniza datos de cumpleaños directamente desde la base de datos de Perfiles Garden, evitando cargar la misma información dos veces.",
    role: "Diseño y desarrollo full-stack (frontend, backend y modelo de datos)",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL (Supabase)",
      "node-postgres (SQL directo)",
      "Vercel Cron",
      "Brevo (email transaccional)",
      "Tailwind CSS",
    ],
    featured: true,
    highlights: [
      "Sincronización de datos entre dos proyectos: lee cumpleaños desde la base de Perfiles Garden en modo solo lectura",
      "Autenticación propia con verificación de email por código (OTP) y recuperación de contraseña",
      "Acceso público compartible (link/QR) con sesión limitada para clientes externos",
      "Envío diario automático de resumen por email vía cron, con registro de entregas",
      "Carga de contenido mensual desde archivos PDF",
    ],
    architecture: {
      description:
        "A diferencia de Perfiles Garden, acá no hay una capa ORM: las páginas del App Router llaman a API Routes que ejecutan SQL parametrizado directamente contra PostgreSQL (con node-postgres y, para algunas operaciones, el cliente REST de Supabase). La autenticación es propia (cookies de sesión, bcrypt y validación con Zod) en vez de usar Supabase Auth. Un cron job de Vercel dispara diariamente un endpoint que arma el resumen del día y lo envía por email a través de Brevo, dejando registro de cada envío. El dato más particular de la arquitectura es la sincronización entre proyectos: una conexión de solo lectura consulta la tabla de agentes de Perfiles Garden (misma instancia de Supabase, otro esquema) para actualizar automáticamente los cumpleaños, sin pisar los que se cargaron a mano.",
      diagram: `flowchart TD
    Browser[Navegador] --> Pages[Paginas App Router]
    Browser --> API[API Routes]
    API --> PG["SQL directo (node-postgres)"]
    API --> RestClient[Cliente REST Supabase]
    PG --> DB[(PostgreSQL en Supabase)]
    RestClient --> DB

    Cron["Vercel Cron (diario)"] --> Job[Endpoint de notificaciones]
    Job --> PG
    Job --> Brevo[Brevo Email API]

    Sync["Conexion de solo lectura"] --> AgentesDB[(Tabla agentes de Perfiles Garden)]
    Job --> Sync`,
    },
    dataModel: {
      description:
        "No usa Prisma: el esquema vive como SQL versionado. Los usuarios administrativos tienen un rol (ADMIN o CLIENTE) y, si son CLIENTE, quedan asociados a un cliente concreto. El registro y la recuperación de contraseña se apoyan en tablas de códigos de un solo uso (OTP) con expiración. Los cumpleaños pueden cargarse a mano o llegar sincronizados desde Perfiles Garden. Cada corrida del cron queda registrada, junto con el detalle de a quién se le envió cada email, lo que permite auditar los envíos.",
      diagram: `erDiagram
    USERS ||--o{ USER_ROLES : tiene
    USER_ROLES }o--o| CLIENTS : pertenece_a
    USERS ||--o{ EMAIL_VERIFICATION_CODES : genera
    USERS ||--o{ PASSWORD_RESET_CODES : genera
    NOTIFICATION_RUNS ||--o{ NOTIFICATION_DELIVERIES : registra
    NOTIFICATION_DELIVERIES }o--|| EMAIL_RECIPIENTS : envia_a
    BIRTHDAYS ||--o{ NOTIFICATION_DELIVERIES : incluye`,
    },
    features: [
      {
        title: "Sincronización entre proyectos",
        description:
          "Consulta en modo solo lectura la base de datos de Perfiles Garden para mantener actualizados los cumpleaños del personal sin duplicar la carga de datos.",
      },
      {
        title: "Autenticación propia con OTP",
        description:
          "Verificación de email y recuperación de contraseña mediante códigos temporales, sin depender de un proveedor externo de autenticación.",
      },
      {
        title: "Acceso público controlado",
        description:
          "Un link (o QR) compartible habilita una sesión de solo lectura para clientes externos, sin exponer el panel de administración.",
      },
      {
        title: "Notificaciones automáticas",
        description:
          "Un cron diario arma y envía el resumen del día por email, dejando registro de cada entrega para poder auditar el envío.",
      },
    ],
  },
];
