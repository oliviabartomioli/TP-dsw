# HogarService

Trabajo Práctico de Desarrollo de Software — UTN Facultad Regional Rosario.

## Integrantes

- 54223 - Bartomioli, Olivia
- 54657 - Dulcich, Juan Ignacio
- 54629 - Llagonne, Alma

## ¿De qué trata el proyecto?

HogarService es una aplicación web que conecta a personas que necesitan contratar servicios domésticos con profesionales que los ofrecen.

La idea es facilitar la búsqueda y contratación de servicios como plomería, electricidad, limpieza, pintura, etc.

Los usuarios pueden buscar servicios por categoría o ciudad, consultar sus detalles y enviar solicitudes de contratación. Los profesionales pueden publicar sus servicios, indicar su disponibilidad y gestionar las solicitudes recibidas.

También se pueden guardar profesionales favoritos y dejar valoraciones de los servicios realizados.

## Tecnologías utilizadas

El proyecto está dividido en dos partes:

- **Frontend:** Angular, TypeScript, HTML, CSS y Bootstrap.
- **Backend:** NestJS, TypeScript, TypeORM y MySQL.

Ambas partes se comunican mediante una API REST.

## Requisitos

Versiones con las que se desarrolló y probó el proyecto:

- Node.js v22.22.3 y npm 10.9.8
- MySQL 8.0.45
- Git 2.53.0

## Cómo correrlo

Para ejecutar el proyecto es necesario tener instalados Node.js, npm y MySQL.

### 1. Clonar el repositorio

```bash
git clone https://github.com/oliviabartomioli/TP-dsw.git
cd TP-dsw
```

### 2. Configurar la base de datos

Iniciar MySQL y crear una base de datos llamada `servicios`.

En la carpeta principal del proyecto, copiar el archivo de ejemplo del backend:

 ```bash
cp back/.env.example back/.env
```

En Windows (PowerShell): `copy back\.env.example back\.env`

Completar en `back/.env` los datos de tu MySQL (`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`) y un valor cualquiera para `JWT_SECRET`.

Las tablas se crean automáticamente la primera vez que se inicia el backend.

### 3. Ejecutar el backend

Desde la carpeta del proyecto:

```bash
cd back
npm install
npm run start:dev
```

El backend se ejecuta en el puerto `3000`.

### 4. Ejecutar el frontend

Abrir otra terminal desde la carpeta principal del proyecto:

```bash
cd front
npm install
npm start
```

Abrir la aplicación en el navegador:

`http://localhost:4200`

Para que todo funcione, deben estar ejecutándose MySQL, el backend y el frontend.

## Probar la API (Swagger)

Con el backend en ejecución, la documentación interactiva de la API está en:

`http://localhost:3000/test`

Desde ahí se pueden probar todos los endpoints sin usar el frontend.

## Datos de prueba

Al iniciar por primera vez, las tablas se crean vacías. Como algunas entidades dependen de otras, conviene cargarlas en este orden, desde las pantallas del frontend (`http://localhost:4200`) o desde Swagger:

1. **Provincia** (ej. Santa Fe)
2. **Ciudad** (depende de una provincia, ej. Rosario)
3. **Categoría** (ej. Electricidad)
4. **Usuario** (cliente que contrata)
5. **Profesional** (depende de una ciudad)
6. **Servicio** (depende de una categoría y un profesional)

Con eso ya se puede probar el flujo principal:

1. En **Buscar servicios**, filtrar por categoría o ciudad y ver el detalle.
2. Crear una **Solicitud** para un servicio (queda en estado `pendiente`).
3. Aceptar la solicitud y luego marcarla como `completada`.
4. Crear una **Reseña** para esa solicitud (solo se pueden valorar solicitudes completadas).

## Documentación

La documentación del proyecto se encuentra en la carpeta [docs](docs/README.md)

El desarrollo y los aportes de cada integrante también pueden consultarse en el [historial de commits del repositorio](https://github.com/oliviabartomioli/TP-dsw/commits).

Para más información sobre la instalación y ejecución de cada parte, consultar los README del [backend](https://github.com/oliviabartomioli/TP-dsw/blob/main/back/READMEback.md) y del [frontend](https://github.com/oliviabartomioli/TP-dsw/blob/main/front/READMEfront.md).

## Propuesta del trabajo práctico

La propuesta original, los requisitos funcionales y el alcance definido para regularidad y aprobación se encuentran en [proposal.md](https://github.com/oliviabartomioli/TP-dsw/blob/main/Proposal.md).
