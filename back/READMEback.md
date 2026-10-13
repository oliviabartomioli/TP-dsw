# HogarService — Backend

Backend de la aplicación **HogarService**, desarrollado para el Trabajo Práctico de Desarrollo de Software de la Universidad Tecnológica Nacional, Facultad Regional Rosario.

[Repositorio completo](https://github.com/oliviabartomioli/TP-dsw)

## 1. Descripción

El backend de HogarService es una API REST desarrollada con NestJS que permite administrar la información relacionada con usuarios, profesionales y servicios domésticos.

Se encarga de procesar las solicitudes enviadas desde el frontend, ejecutar la lógica de negocio y gestionar la persistencia de datos mediante MySQL y TypeORM.

## 2. Tecnologías utilizadas

- Node.js
- TypeScript
- NestJS
- TypeORM
- MySQL
- class-validator y class-transformer
- Swagger

## 3. Funcionalidades

El backend incluye módulos para gestionar:

- Usuarios.
- Profesionales.
- Categorías.
- Provincias.
- Ciudades.
- Servicios.
- Disponibilidades.
- Solicitudes de contratación.
- Valoraciones.
- Favoritos.

Entre sus funcionalidades se encuentran:

- Operaciones CRUD sobre las entidades correspondientes.
- Relaciones entre entidades, como ciudades y provincias, o servicios y categorías.
- Eliminación y restauración de registros en los módulos que lo permiten.
- Consultas de servicios por categoría y ciudad.
- Gestión de solicitudes de contratación.
- Cambios de estado de solicitudes: pendiente, aceptada, rechazada y completada.
- Registro de valoraciones asociadas a contrataciones completadas.
- Validación de los datos recibidos mediante DTO y ValidationPipe.

## 4. Estructura del backend

El proyecto utiliza una organización modular basada en NestJS.

Los principales directorios son:

- `src/modules/`: módulos correspondientes a las entidades y funcionalidades.
- `src/auth/`: componentes relacionados con autenticación.
- `src/config/`: configuración de la conexión a la base de datos.
- `src/app.module.ts`: módulo principal de la aplicación.
- `src/main.ts`: archivo de inicio del servidor.

Cada módulo organiza sus componentes según sus responsabilidades, utilizando controladores, servicios y entidades.

## 5. Requisitos previos

Para ejecutar el backend es necesario contar con:

- Node.js.
- npm.
- MySQL.
- Una base de datos local disponible.

## 6. Instalación

### 6.1. Clonar el repositorio

```bash
git clone https://github.com/oliviabartomioli/TP-dsw.git
```

Ingresar a la carpeta del backend:

```bash
cd TP-dsw/back
```

### 6.2. Instalar dependencias

Ejecutar:

```bash
npm install
```

Este comando instala las dependencias definidas en `package.json`.

## 7. Configuración de MySQL

El backend utiliza MySQL y TypeORM para almacenar y consultar la información.

### 7.1. Crear la base de datos

Iniciar el servidor MySQL y ejecutar:

```sql
CREATE DATABASE IF NOT EXISTS servicios;
```

### 7.2. Configurar la conexión

La configuración de la base de datos se encuentra en:

`src/config/typeorm.config.ts`

Los valores utilizados actualmente en el entorno de desarrollo son:

| Parámetro | Valor |
|---|---|
| Tipo | mysql |
| Host | localhost |
| Puerto | 3306 |
| Usuario | root |
| Contraseña | Credencial local de MySQL |
| Base de datos | servicios |

Antes de ejecutar el backend, se debe verificar que las credenciales configuradas en `typeorm.config.ts` coincidan con las de la instalación local de MySQL.

### 7.3. Sincronización de entidades

La configuración de TypeORM incluye:

```ts
autoLoadEntities: true,
synchronize: true,
```

`autoLoadEntities` permite cargar automáticamente las entidades registradas en los módulos.

`synchronize: true` permite sincronizar el esquema de la base de datos con las entidades durante el desarrollo.

Esta configuración está destinada al entorno de desarrollo y no se recomienda utilizarla en producción.

## 8. Ejecución del servidor

Para iniciar el backend en modo desarrollo, ejecutar:

```bash
npm run start:dev
```

El servidor se ejecuta de forma predeterminada en:

http://localhost:3000

Este comando permite reiniciar automáticamente el servidor cuando se detectan cambios en el código.

### Otros comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run start` | Inicia el backend |
| `npm run start:dev` | Inicia el backend en modo desarrollo |
| `npm run build` | Compila el proyecto |
| `npm run start:prod` | Ejecuta la versión compilada |
| `npm run test` | Ejecuta las pruebas configuradas |

## 9. Documentación de la API

El backend incluye Swagger para visualizar la documentación generada de los endpoints.

Con el servidor en ejecución, acceder a:

http://localhost:3000/test

Desde esta interfaz se pueden consultar las rutas disponibles y los métodos HTTP definidos en los controladores.

## 10. Comunicación con el frontend

El backend permite solicitudes desde el frontend Angular que se ejecuta en:

http://localhost:4200

La configuración de CORS se encuentra en `src/main.ts`.

El frontend utiliza servicios Angular para realizar solicitudes HTTP a la API y mostrar la información correspondiente.

Para que la aplicación funcione correctamente deben estar ejecutándose:

1. El servidor MySQL.
2. El backend NestJS.
3. El frontend Angular.

## 11. Validaciones

El backend utiliza `ValidationPipe` de forma global con las siguientes opciones:

```ts
transform: true,
whitelist: true,
forbidNonWhitelisted: true,
```

Estas opciones permiten transformar los datos recibidos, aplicar las validaciones definidas en los DTO y rechazar propiedades que no estén permitidas.

Las validaciones específicas dependen de las reglas definidas para cada entidad.

## 12. Pruebas de funcionamiento

Las funcionalidades principales fueron probadas manualmente mediante la aplicación Angular.

Se verificaron operaciones de:

- Creación de registros.
- Consulta de registros.
- Modificación de registros.
- Eliminación de registros.
- Restauración de registros, cuando corresponde.
- Consultas y listados con filtros.
- Gestión de solicitudes de contratación.
- Registro de valoraciones y favoritos.

## 13. Integrantes

- 54223 - Bartomioli, Olivia
- 54657 - Dulcich, Juan Ignacio
- 54629 - Llagonne, Alma

**Materia:** Desarrollo de Software

**Institución:** Universidad Tecnológica Nacional — Facultad Regional Rosario

**Proyecto:** HogarService