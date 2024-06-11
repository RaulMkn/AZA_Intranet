# AZA DENTAL CLINIC (1.0)

Intranet creada para la gestion interna de una clinica dental.

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Principales Tecnologías Utilizadas](#principales-tecnologías-utilizadas)
3. [Instalación](#instalación)
4. [Uso](#uso)


## Introducción

Este proyecto es una aplicación de intranet desarrollada para los alumnos del MEDAC Fuenlabrada, que proporciona diferentes funcionalidades relacinadas con el mundo de la Odontología.

## Principales Tecnologías Utilizadas
- Java JDK 17
- Spring Framework
- Hibernate ORM
- React 18
- Vite
- ANT Design
- PostgreSQL

## Instalación

## Requisitos Previos
- Java JDK 17 instalado y configurado
- Node.js y npm instalados

## Ejemplo de instalación.

### Introducción
Esta guía proporciona un ejemplo para instalar y configurar el proyecto. Se incluyen pasos para la configuración de la base de datos PostgreSQL en un contenedor Docker, la configuración del backend en IntelliJ IDEA y la configuración del frontend utilizando npm.

### Requisitos Previos
Asegúrese de tener instalados los siguientes programas antes de comenzar:
- **IntelliJ IDEA**: IDE para desarrollo Java y Kotlin.
- **Node.js con npm**: Plataforma y gestor de paquetes para JavaScript.
- **Docker**: Plataforma para desarrollar, enviar y ejecutar aplicaciones.
- **Visual Studio Code (opcional)**: Editor de código para desarrollo web.
- **DBeaver (opcional)**: Herramienta de gestión de bases de datos.

### Configuración de la Base de Datos
#### Configuración del Contenedor Docker
1. Descargue la imagen de PostgreSQL desde Docker Hub:
    ```
    docker pull postgres
    ```
2. Cree y ejecute un nuevo contenedor de PostgreSQL:
    ```
    docker run --name mi_postgres -e POSTGRES_PASSWORD=mi_password -d postgres
    ```
3. Verifique que el contenedor esté en ejecución:
    ```
    docker ps
    ```

#### Creación de la Base de Datos
1. Abra DBeaver y cree una nueva conexión PostgreSQL.
2. Complete la configuración de la conexión con los detalles necesarios.
3. Pruebe la conexión y guárdela.

#### Configuración del Contenido de la Base de Datos
1. Abra un editor SQL en DBeaver.
2. Copie y ejecute el contenido del archivo Template.sql para crear tablas y rellenarlas con datos de prueba.

### Configuración del Backend
1. Abra el proyecto en IntelliJ IDEA.
2. Configure el JDK como Amazon Corretto JDK 17.
3. Modifique los archivos application.properties e hibernate.cfg.xml (elimine .mock del nombre) para la conexión a la base de datos.
4. Compile y ejecute el proyecto desde IntelliJ IDEA.

## Configuración del Frontend
1. Abra la terminal y navegue hasta el directorio aza_intranet_front.
2. Ejecute el comando `npm install` para instalar las dependencias del proyecto.
3. Ejecute el comando `npm run dev` para iniciar el servidor de desarrollo.

