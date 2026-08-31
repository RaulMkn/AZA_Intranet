# AZA Dental Clinic - Intranet

Aplicación web interna para la gestión de una clínica dental: citas, pacientes, dentistas, intervenciones, eventos y departamentos.

## Stack

| Capa | Tecnología |
|------|-----------|
| Backend | Java 21, Spring Boot 4.1, Hibernate 7.4, PostgreSQL 17 |
| Frontend | React 19, Vite 8, Ant Design 6, MUI DataTables |
| Infra | Docker, Nginx (reverse proxy), Hikari (connection pool) |

## Requisitos

- Docker y Docker Compose

Para desarrollo local sin Docker:
- Java 21
- Node.js 22+
- PostgreSQL 17

## Despliegue con Docker

```bash
docker compose up -d --build
```

Esto levanta tres servicios:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| frontend | http://localhost | App React servida por Nginx |
| backend | http://localhost:8080 | API REST Spring Boot |
| db | localhost:5432 | PostgreSQL |

La base de datos se inicializa automáticamente con `template.sql` en el primer arranque. Los datos persisten en el volumen `aza_intranet_db_data`.

### Credenciales por defecto (Docker)

| Recurso | Usuario | Contraseña |
|---------|---------|------------|
| PostgreSQL | aza | aza |
| API (Basic Auth) | maken | yuki |

Estas credenciales se configuran en `docker-compose.yml` mediante variables de entorno.

## Desarrollo local

### Backend

```bash
cd aza_intranet_back
./mvnw spring-boot:run
```

Requiere una instancia de PostgreSQL accesible en `localhost:5432` con la base `aza_intranet` creada e inicializada con `template.sql`. Las credenciales por defecto en desarrollo son `aza:aza` (configurables en `application.properties`).

### Frontend

```bash
cd aza_intranet_front
npm install --legacy-peer-deps
npm run dev
```

El servidor de desarrollo arranca en `http://localhost:5173`. El proxy de Vite redirige las llamadas a `/intranet/DentalAesthetics` al backend en `localhost:8080`.

Para desarrollo local, configura la variable de entorno `APP_CORS_ORIGIN` del backend para incluir el origen del frontend:

```bash
APP_CORS_ORIGIN=http://localhost:5173,http://localhost
```

## Arquitectura

```
aza_intranet_front/          React SPA (Vite)
  src/
    scenes/                  Páginas (Login, Home, CRUD de cada entidad)
    utils/                   Utilidades, dropdowns reutilizables, API config
    DTOs/                    Objetos de transferencia para formularios

aza_intranet_back/           API REST (Spring Boot)
  src/main/java/com/example/
    controllers/             Endpoints REST
    service/                 Lógica de negocio
    dao/                     Capa de acceso a datos (JPA EntityManager)
    entity/                  Entidades JPA
    dto/                     DTOs de respuesta
    configuration/           CORS, ModelMapper, manejo de excepciones

docker-compose.yml           Orquestación de los 3 servicios
template.sql                 Script de inicialización de la BD
```

## API

Todos los endpoints están bajo `/intranet/DentalAesthetics` y requieren autenticación Basic Auth.

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /login | Autenticación de dentista |
| GET | /dentists | Listar dentistas |
| POST | /dentist | Crear dentista (multipart) |
| GET | /patients | Listar pacientes |
| POST | /patient | Crear paciente |
| GET | /appointments | Listar citas |
| POST | /appointment | Crear cita |
| GET | /interventions | Listar intervenciones |
| POST | /intervention | Crear intervención |
| GET | /events | Listar eventos |
| POST | /event | Crear evento |
| GET | /departments | Listar departamentos |
| DELETE | /{entidad}/id/{id} | Eliminar por ID |

## Nginx

En producción (Docker), Nginx sirve el frontend estático y hace reverse proxy de las peticiones API al contenedor del backend:

- `GET /` → archivos estáticos de React (SPA con fallback a `index.html`)
- `GET|POST|DELETE /intranet/DentalAesthetics/*` → `http://backend:8080`
