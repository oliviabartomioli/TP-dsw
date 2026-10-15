# HogarService — Frontend

Interfaz web desarrollada con Angular para que los usuarios y profesionales puedan utilizar las funcionalidades de HogarService.

## Tecnologías utilizadas

* Angular
* TypeScript
* HTML
* CSS
* Bootstrap

## Funcionalidades

El frontend permite gestionar usuarios, profesionales, categorías, provincias, ciudades, servicios, disponibilidades, solicitudes de contratación, valoraciones y favoritos.

También incluye la búsqueda de servicios por categoría y ciudad, la consulta de sus detalles y formularios para crear y modificar registros.

## Instalación

Para ejecutar el frontend es necesario tener instalados **Node.js y npm**.

### 1. Clonar el repositorio

```bash
git clone https://github.com/oliviabartomioli/TP-dsw.git
cd TP-dsw/front
```

### 2. Instalar dependencias

```bash
npm install
```

## Ejecución

Iniciar el servidor de desarrollo:

```bash
npm start
```

Abrir la aplicación en el navegador:

`http://localhost:4200`

## Conexión con el backend

El frontend se comunica con el backend mediante una API REST.

El backend se ejecuta en:

`http://localhost:3000`

Para utilizar correctamente la aplicación, deben estar ejecutándose **MySQL, el backend y el frontend**.

Las instrucciones para configurar el servidor se encuentran en el [README del backend](../back/READMEback.md).

---

[Volver al README principal](../README.md)
