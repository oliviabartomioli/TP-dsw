# HogarService

**Trabajo Práctico de Desarrollo de Software — UTN Facultad Regional Rosario**

## 1. Grupo

### Integrantes

- 54223 - Bartomioli, Olivia
- 54657 - Dulcich, Juan Ignacio
- 54629 - Llagonne, Alma

### Repositorio

[Repositorio de HogarService — GitHub](https://github.com/oliviabartomioli/TP-dsw)

El proyecto utiliza un único repositorio que contiene el frontend y el backend.

## 2. Aplicación para contratar servicios domésticos

### Descripción

HogarService es una aplicación web destinada a facilitar la búsqueda y contratación de servicios domésticos.

El sistema permite gestionar usuarios, profesionales y servicios, consultar servicios disponibles según su categoría o ciudad y administrar solicitudes de contratación.

Los profesionales pueden tener servicios asociados y registrar sus disponibilidades. Las solicitudes permiten representar el proceso de contratación mediante diferentes estados: pendiente, aceptada, rechazada y completada.

La aplicación también permite registrar valoraciones de servicios realizados y administrar profesionales favoritos.

El objetivo es facilitar la conexión entre personas que necesitan contratar servicios domésticos y profesionales que ofrecen dichos servicios.

### Modelo

![Modelo del sistema](https://github.com/user-attachments/assets/476734b5-356a-4d61-b460-8e6038a44227)

[Diagrama del proyecto en Google Drive](https://drive.google.com/file/d/1e64FdKF6mJaFL2ZmbHjIrkDlq72qxt0d/view?usp=sharing)

## 3. Alcance funcional

### Alcance mínimo — Regularidad

| Requisito | Implementación |
|---|---|
| CRUD simple | 1. CRUD Usuario; 2. CRUD Categoría; 3. CRUD Provincia |
| CRUD dependiente | 1. CRUD Servicio, dependiente de Categoría y Profesional; 2. CRUD Ciudad, dependiente de Provincia |
| Listado y detalle | 1. Listado de servicios filtrados por categoría; 2. Listado de servicios filtrados por ciudad. Ambos permiten consultar el detalle del servicio seleccionado |
| CUU / Epic | 1. Contratar un servicio doméstico; 2. Gestionar una solicitud de contratación: aceptar, rechazar y completar |

Las funcionalidades del alcance mínimo se encuentran implementadas y fueron probadas manualmente desde la aplicación.

### Funcionalidades adicionales implementadas

Además del alcance mínimo, HogarService incorpora las siguientes funcionalidades:

| Funcionalidad | Descripción |
|---|---|
| Gestión de profesionales | Creación, consulta, modificación, eliminación y restauración de profesionales |
| Gestión de disponibilidades | Creación, consulta, modificación y eliminación de disponibilidades asociadas a profesionales |
| Gestión de favoritos | Creación, consulta, eliminación y restauración de profesionales favoritos |
| Gestión de valoraciones | Creación, consulta, modificación, eliminación y restauración de valoraciones |
| Gestión de solicitudes | Creación y administración de solicitudes, incluyendo cambios de estado |
| Búsqueda de servicios | Filtrado de servicios por categoría y ciudad |
| Detalle de servicios | Visualización de descripción, precio, categoría y profesional asociado |

### Alcance adicional para aprobación

El alcance originalmente propuesto para aprobación contempla:

| Requisito | Detalle |
|---|---|
| CRUD | Usuario, Servicio, Categoría, Ciudad, Provincia, Disponibilidad y Favorito |
| CUU / Epic | 1. Registro e inicio de sesión de usuarios con roles de cliente y profesional; 2. Contratar un servicio doméstico; 3. Gestionar solicitudes; 4. Calificar un servicio realizado |

Las funcionalidades de contratación, gestión de solicitudes y valoración de servicios cuentan con implementaciones dentro del sistema.

El inicio de sesión y la autenticación con roles se mantienen como funcionalidades previstas para una etapa posterior.

### Alcance adicional voluntario

Por el momento, no se definen funcionalidades voluntarias adicionales fuera de las ya implementadas.

## 4. Tecnologías utilizadas

### Frontend

- Angular
- TypeScript
- HTML5
- CSS3
- Bootstrap

### Backend

- NestJS
- TypeScript
- TypeORM
- MySQL
- API REST

### Herramientas de desarrollo

- Visual Studio Code
- Node.js
- npm
- Git
- GitHub

## 5. Arquitectura del sistema

HogarService utiliza una arquitectura cliente-servidor.

El frontend, desarrollado con Angular, proporciona la interfaz mediante la cual los usuarios interactúan con las funcionalidades del sistema.

El backend, desarrollado con NestJS, expone una API REST que recibe las solicitudes del frontend y ejecuta la lógica de negocio.

La información se almacena en una base de datos MySQL, utilizando TypeORM para gestionar las entidades y sus relaciones.

### Estructura del proyecto

```text
TP-dsw/
├── back/
│   └── Backend desarrollado con NestJS
├── front/
│   └── Frontend desarrollado con Angular
├── .gitignore
└── README.md
```

La documentación complementaria del trabajo práctico se organizará en una carpeta `docs/`.

## 6. Funcionalidades principales

### Gestión de entidades

La aplicación permite administrar:

- Usuarios.
- Profesionales.
- Categorías.
- Provincias.
- Ciudades.
- Servicios.
- Disponibilidades.
- Solicitudes.
- Valoraciones.
- Favoritos.

Los módulos implementan las operaciones correspondientes de creación, consulta, modificación y eliminación. Cuando está contemplado, también permiten restaurar registros eliminados.

### Búsqueda de servicios

Los usuarios pueden buscar servicios disponibles mediante filtros por categoría o ciudad.

Los resultados muestran información del servicio, su precio, categoría y profesional asociado.

También es posible consultar el detalle de cada servicio seleccionado.

### Contratación de servicios

El sistema permite registrar solicitudes de contratación asociadas a un usuario y un servicio.

Las solicitudes pueden encontrarse en los siguientes estados:

- Pendiente.
- Aceptada.
- Rechazada.
- Completada.

### Valoraciones

Se pueden registrar valoraciones de servicios asociados a solicitudes completadas, incluyendo una calificación y un comentario.

### Favoritos

El sistema permite registrar profesionales como favoritos y administrar dichos registros.

### Disponibilidades

Los profesionales pueden tener disponibilidades registradas, indicando el día de la semana y el horario de inicio y finalización.

## 7. Requisitos previos

Para ejecutar el proyecto localmente se necesita:

- Node.js.
- npm.
- MySQL.
- Git, para clonar el repositorio.
- Un editor de código, como Visual Studio Code.

## 8. Instalación y ejecución

El frontend y el backend se ejecutan de manera independiente.

### 8.1. Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone https://github.com/oliviabartomioli/TP-dsw.git
```

Ingresar a la carpeta del proyecto:

```bash
cd TP-dsw
```

### 8.2. Configurar la base de datos

El proyecto utiliza MySQL como sistema de gestión de base de datos.

1. Iniciar el servidor MySQL.
2. Crear una base de datos llamada `servicios`.
3. Configurar los datos de conexión en el backend.
4. Verificar que el servidor MySQL esté disponible.

La configuración de TypeORM se encuentra en:

`back/src/config/typeorm.config.ts`

Los parámetros utilizados por el proyecto son:

| Parámetro | Valor |
|---|---|
| Motor | MySQL |
| Servidor | localhost |
| Puerto | 3306 |
| Base de datos | servicios |
| Usuario | Configurable según el entorno local |
| Contraseña | Configurable según el entorno local |

Es necesario adaptar las credenciales a la instalación local de MySQL antes de ejecutar el backend.

La configuración actual de desarrollo utiliza `synchronize: true` en TypeORM, lo que permite sincronizar las entidades con el esquema de la base de datos. Esta opción está destinada al entorno de desarrollo.

### 8.3. Instalar y ejecutar el backend

Abrir una terminal en la carpeta del proyecto y ejecutar:

```bash
cd back
npm install
npm run start:dev
```

El backend se inicia en modo desarrollo.

La API utiliza el puerto `3000`, según la configuración habitual del proyecto.

### 8.4. Instalar y ejecutar el frontend

Abrir otra terminal y ejecutar:

```bash
cd front
npm install
npm start
```

Una vez iniciado el servidor de Angular, acceder desde el navegador a:

http://localhost:4200

### 8.5. Verificar el funcionamiento

Para utilizar la aplicación deben estar en ejecución:

1. El servidor MySQL.
2. El backend NestJS.
3. El frontend Angular.

Con los tres servicios disponibles, se pueden utilizar las funcionalidades de gestión, búsqueda, contratación y valoración.

## 9. Documentación del proyecto

La documentación complementaria del trabajo práctico incluirá:

- Propuesta y alcance funcional.
- Modelo de entidades y relaciones.
- Seguimiento de tareas y funcionalidades.
- Registro de reuniones y avances.
- Enlaces a los Pull Requests.
- Instrucciones de instalación y ejecución.

Esta documentación se organizará en el directorio `docs/` del repositorio.

## 10. Estado del proyecto

Las funcionalidades correspondientes al alcance mínimo de regularidad se encuentran implementadas y fueron probadas manualmente desde la aplicación.

También se desarrollaron funcionalidades adicionales relacionadas con profesionales, disponibilidades, solicitudes, favoritos y valoraciones.

El frontend cuenta con un diseño responsive desarrollado con Angular, CSS y Bootstrap.

La documentación y los elementos correspondientes a la entrega se encuentran en preparación.

## 11. Información académica

**Institución:** Universidad Tecnológica Nacional — Facultad Regional Rosario

**Materia:** Desarrollo de Software

**Proyecto:** HogarService

**Modalidad:** Trabajo práctico grupal

**Objetivo de entrega:** Regularidad