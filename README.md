# Backend Guide – Clean Architecture

## Simulador de Ahorro Digital (NestJS + PostgreSQL)

Este proyecto implementa el backend para el Simulador de Ahorro Digital siguiendo los principios de **Arquitectura Limpia**.

### 1️⃣ Principios de Arquitectura Limpia

- **Independencia de frameworks**: El núcleo del negocio no depende de NestJS ni de TypeORM.
- **Separación de responsabilidades**: Cada capa tiene una función clara y única.
- **Reglas de negocio aisladas**: Los casos de uso contienen la lógica sin conocer detalles de infraestructura.
- **Infraestructura reemplazable**: La base de datos o el motor de búsqueda pueden ser cambiados sin afectar el dominio.
- **Flujo de dependencias hacia adentro**: Las dependencias apuntan hacia el círculo interno (Entities -> Use Cases -> Controllers).

### 2️⃣ Capas del Backend

- **Domain**: Entidades y contratos (interfaces) de repositorios.
- **Application**: Casos de uso que orquestan la lógica de negocio.
- **Infrastructure**: Implementaciones técnicas (TypeORM, Express Controllers, DTOs).
- **Modules**: Configuración de inyección de dependencias de NestJS.

### 3️⃣ Estructura de Archivos

```
src/
├── domain/                # Núcleo del negocio
│   ├── entities/          # Entidades puras
│   └── repositories/      # Interfaces de repositorios
├── application/           # Casos de uso
│   └── use-cases/         # Lógica de aplicación
├── infrastructure/        # Detalles técnicos
│   ├── database/          # TypeORM, Entidades ORM, Repositorios
│   ├── http/              # Controladores y DTOs
│   └── auth/              # JWT y Estrategias
├── modules/               # Módulos de NestJS
└── main.ts                # Punto de entrada
```

### 4️⃣ Endpoints Principales

- `GET /api/products`: Lista de productos con filtros (`name`, `type`).
- `POST /api/simulator`: Cálculo de rentabilidad basado en monto inicial y aportes.
- `POST /api/onboarding`: Registro de intención con validación de recaptcha.
- `POST /api/auth/login`: Autenticación para proteger endpoints de usuario.

### 5️⃣ Instalación y Uso

1. Configurar variables de entorno en `.env`:
   - `DATABASE_URL`: URL de conexión a PostgreSQL (Neon).
   - `JWT_SECRET`: Secreto para tokens JWT.
2. `npm install`
3. `npm run start:dev`

> [!NOTE]
> El proyecto incluye un `SeedService` que poblará la base de datos con productos iniciales al arrancar por primera vez.
