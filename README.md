# AZA Dental Clinic

Intranet para la gestión interna de una clínica dental.

## Stack Actual

- Java 21
- Spring Boot 4.1.0
- Hibernate ORM 7.4.2.Final
- PostgreSQL 17
- React 19.2.7
- Vite 8.1.0
- Ant Design 6.4.5

## Despliegue con Docker

El proyecto está preparado para ejecutarse completo con Docker Compose:

```bash
docker compose up -d --build
```

Después de arrancar, abre la aplicación en:

```text
http://localhost
```

El backend queda expuesto en `http://localhost:8080` y PostgreSQL en `localhost:5432`.

## Variables y datos

La configuración de conexión a base de datos y credenciales del backend se resuelve por variables de entorno dentro de `docker-compose.yml`. El contenedor de PostgreSQL inicializa la base con `template.sql`.

## Desarrollo local

Si quieres ejecutar cada parte fuera de Docker:

- Backend: abre `aza_intranet_back` y ejecuta Maven con Java 21.
- Frontend: abre `aza_intranet_front` y ejecuta `npm install` seguido de `npm run dev`.

## Notas

- El frontend consume el API desde la ruta `/intranet/DentalAesthetics`.
- El despliegue productivo del frontend se sirve con Nginx y hace proxy del API al backend.