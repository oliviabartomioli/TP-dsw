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

## Cómo correrlo

Para ejecutar el proyecto es necesario tener instalados Node.js, npm y MySQL.

### 1. Clonar el repositorio

```bash
git clone https://github.com/oliviabartomioli/TP-dsw.git
cd TP-dsw
```

### 2. Configurar la base de datos

Iniciar MySQL y crear una base de datos llamada `servicios`.

Configurar los datos de conexión en el backend, en el archivo:

`back/src/config/typeorm.config.ts`

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

## Documentación

La documentación del proyecto se encuentra en la carpeta [docs](docs/README.md)

El desarrollo y los aportes de cada integrante también pueden consultarse en el [historial de commits del repositorio](https://github.com/oliviabartomioli/TP-dsw/commits).

Para más información sobre la instalación y ejecución de cada parte, consultar los README del [backend](https://github.com/oliviabartomioli/TP-dsw/blob/main/back/READMEback.md) y del [frontend](https://github.com/oliviabartomioli/TP-dsw/blob/main/front/READMEfront.md).

## Propuesta del trabajo práctico

La propuesta original, los requisitos funcionales y el alcance definido para regularidad y aprobación se encuentran en [proposal.md](https://github.com/oliviabartomioli/TP-dsw).