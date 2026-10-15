# HogarService — Backend

API REST desarrollada con NestJS para gestionar los datos y las funcionalidades de HogarService.

## Tecnologías utilizadas

* Node.js
* TypeScript
* NestJS
* TypeORM
* MySQL
* Swagger

## Funcionalidades

El backend permite gestionar usuarios, profesionales, categorías, provincias, ciudades, servicios, disponibilidades, solicitudes de contratación, valoraciones y favoritos.

Incluye operaciones CRUD, relaciones entre entidades, filtros de servicios por categoría y ciudad, y gestión de los estados de las solicitudes.

## Instalación

Para ejecutar el backend es necesario tener instalados **Node.js, npm y MySQL**.

### 1. Clonar el repositorio

```bash
git clone https://github.com/oliviabartomioli/TP-dsw.git
cd TP-dsw/back
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

Iniciar MySQL y crear la base de datos:

```sql
CREATE DATABASE IF NOT EXISTS servicios;
```

Verificar los datos de conexión en:

`src/config/typeorm.config.ts`

La configuración local utiliza MySQL en el puerto `3306`. El usuario y la contraseña deben coincidir con los de la instalación local.

## Ejecución

Iniciar el servidor:

```bash
npm run start:dev
```

El backend se ejecuta en:

`http://localhost:3000`

## Documentación de la API

Con el servidor en ejecución, se puede acceder a Swagger desde:

[Ver documentación de Swagger](http://localhost:3000/test#/)
