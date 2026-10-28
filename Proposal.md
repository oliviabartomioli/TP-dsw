# TP-dsw

Trabajo práctico de Desarrollo de Software - UTN FRRO

# Propuesta TP DSW

## Grupo

### Integrantes

* 54223 - Bartomioli, Olivia
* 54657 - Dulcich, Juan Ignacio
* 54629 - Llagonne, Alma

### Repositorios

* [Fullstack app - HogarService](https://github.com/oliviabartomioli/TP-dsw)

## App para contratar servicios domésticos

### Descripción

La aplicación permite a las personas registrarse como clientes o prestadores de servicios.

Los clientes pueden buscar servicios según su categoría, ubicación o disponibilidad, y realizar solicitudes de contratación.

Los prestadores pueden publicar sus servicios y gestionar las solicitudes recibidas.

La plataforma facilita la conexión entre quienes necesitan contratar servicios domésticos y los profesionales que los ofrecen.

### Modelo
<img width="1169" height="1654" alt="modelo de dominio  drawio" src="https://github.com/user-attachments/assets/786181a3-e146-4403-8bdf-64aa89614d9e" />

[Ver modelo en Draw.io](https://app.diagrams.net/#G1e64FdKF6mJaFL2ZmbHjIrkDlq72qxt0d#%7B%22pageId%22%3A%22CfnHQOyYAmgUjdnhFKlx%22%7D)

## Alcance Funcional

### Alcance Mínimo

**Regularidad:**

| Req                     | Detalle                                                                                                                                                                                                                           |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD simple             | 1. CRUD Usuario<br>2. CRUD Categoría<br>3. CRUD Provincia                                                                                                                                                                         |
| CRUD dependiente        | 1. CRUD Servicio {depende de Categoría y Profesional}<br>2. CRUD Ciudad {depende de Provincia}                                                                                                                                    |
| Listado<br>+<br>detalle | 1. Listado de servicios filtrado por categoría, muestra servicio, precio y profesional => detalle CRUD Servicio.<br>2. Listado de servicios filtrado por ciudad, muestra servicio, profesional y precio => detalle CRUD Servicio. |
| CUU/Epic                | 1. Solicitar la contratación de un servicio doméstico.<br>2. Gestionar una solicitud de contratación (aceptar, rechazar o completar).                                                                                             |

**Adicionales para Aprobación:**

| Req      | Detalle                                                                                                                                                                                                                                               |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD     | 1. CRUD Usuario<br>2. CRUD Servicio<br>3. CRUD Categoría<br>4. CRUD Ciudad<br>5. CRUD Provincia<br>6. CRUD Disponibilidad<br>7. CRUD Favorito                                                                                                         |
| CUU/Epic | 1. Registro e inicio de sesión con perfiles de cliente y profesional.<br>2. Solicitar la contratación de un servicio doméstico.<br>3. Gestionar una solicitud de contratación (aceptar, rechazar o completar).<br>4. Calificar un servicio realizado. |
