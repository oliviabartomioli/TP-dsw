# HogarService — Frontend

Frontend de la aplicación HogarService, desarrollado para el Trabajo Práctico de Desarrollo de Software de la Universidad Tecnológica Nacional, Facultad Regional Rosario.

[Repositorio completo](https://github.com/oliviabartomioli/TP-dsw)

## 1. Descripción

HogarService es una aplicación web que permite buscar y contratar servicios domésticos, así como gestionar usuarios, profesionales, servicios y solicitudes de contratación.

El frontend proporciona una interfaz gráfica para interactuar con las funcionalidades del sistema y se comunica con el backend mediante una API REST.

## 2. Tecnologías utilizadas

- Angular
- TypeScript
- HTML5
- CSS3
- Bootstrap
- Node.js y npm

## 3. Funcionalidades

La aplicación incluye interfaces para:

- Gestión de usuarios.
- Gestión de profesionales.
- Gestión de categorías.
- Gestión de provincias y ciudades.
- Gestión de servicios.
- Gestión de disponibilidades.
- Gestión de solicitudes de contratación.
- Gestión de valoraciones.
- Gestión de favoritos.
- Búsqueda de servicios por categoría y ciudad.
- Consulta del detalle de los servicios.

Los formularios permiten crear y modificar registros, mientras que los listados facilitan su consulta y administración.

## 4. Diseño de la interfaz

La interfaz fue desarrollada utilizando Angular y Bootstrap.

Se implementó un diseño responsive para facilitar la visualización de la aplicación en distintos tamaños de pantalla.

Los componentes mantienen criterios visuales comunes para formularios, botones, tablas y mensajes.

## 5. Requisitos previos

Para ejecutar el frontend se necesita:

- Node.js.
- npm.
- El backend de HogarService configurado y en ejecución.

## 6. Instalación

Clonar el repositorio:

```bash
git clone https://github.com/oliviabartomioli/TP-dsw.git
```

Ingresar a la carpeta del frontend:

```bash
cd TP-dsw/front
```

Instalar las dependencias:

```bash
npm install
```

## 7. Ejecución

Iniciar el servidor de desarrollo:

```bash
npm start
```

Abrir la aplicación desde el navegador:

http://localhost:4200

Para utilizar las funcionalidades que requieren información de la base de datos, el backend debe encontrarse en ejecución.

## 8. Comunicación con el backend

El frontend utiliza servicios de Angular para realizar solicitudes HTTP a la API REST desarrollada con NestJS.

La dirección local habitual del backend es:

http://localhost:3000

Las operaciones realizadas desde los componentes permiten consultar, crear, modificar y eliminar información mediante los endpoints correspondientes.

## 9. Integrantes

- 54223 - Bartomioli, Olivia
- 54657 - Dulcich, Juan Ignacio
- 54629 - Llagonne, Alma

**Materia:** Desarrollo de Software

**Institución:** Universidad Tecnológica Nacional — Facultad Regional Rosario

**Proyecto:** HogarService