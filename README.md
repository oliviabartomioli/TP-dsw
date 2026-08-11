# TP-dsw
Trabajo práctico de Desarrollo de Software - UTN FRRO
# Propuesta TP DSW

## Grupo
### Integrantes
* 54223 - Bartomioli, Olivia
* 54657 - Dulcich, Juan Ignacio
* 54629 - Llagonne, Alma
### Repositorios
* [frontend app](http://hyperlinkToGihubOrGitlab)
* [backend app](http://hyperlinkToGihubOrGitlab)
*Nota*: si utiliza un monorepo indicar un solo link con fullstack app.

## App para contratar servicios domésticos
### Descripción
La aplicación permite a usuarios registrarse como clientes o prestadores de servicios.
Los clientes pueden buscar servicios según categoría, ubicación o disponibilidad, y realizar solicitudes de contratación.
Los prestadores pueden publicar sus servicios y gestionar las solicitudes.
La plataforma facilita la conexión entre oferta y demanda de servicios, mejorando la experiencia de contratación.

### Modelo
![ModeloTpContrataciones](https://github.com/user-attachments/assets/476734b5-356a-4d61-b460-8e6038a44227)

https://drive.google.com/file/d/1e64FdKF6mJaFL2ZmbHjIrkDlq72qxt0d/view?usp=sharing

## Alcance Funcional 

### Alcance Mínimo
 

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Usuario<br>2. CRUD Categoría<br>3. CRUD Provincia|
|CRUD dependiente|1. CRUD Servicio {depende de categoría} <br>2. CRUD Ciudad {depende de Provincia} |
|Listado<br>+<br>detalle| 1. Listado de servicios filtrado por categoria, muestra servicio, precio y prestador => detalle CRUD Servicio<br> 2. Listado de servicios filtrado por ciudad, muestra servicio, prestador y precio => detalle CRUD Solicitud|
|CUU/Epic|1. Contratar un servicio doméstico<br>2. Gestionar una solicitud (aceptar/rechazar y completar)<br>3. Calificar un servicio realizado|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Usuario<br>2. CRUD Servicio<br>3. CRUD Categoría<br>4. CRUD Ciudad<br>5. CRUD Provincia<br>6. CRUD Disponibilidad<br>7. CRUD Favorito|
|CUU/Epic|1. Registro e inicio de sesión de usuarios con roles<br>2. Contratar un servicio<br>3. Gestionar una solicitud (aceptar, rechazar y completar)<br>4. Visualizar historial de servicios realizados|


### Alcance Adicional Voluntario


|Req|Detalle|
|:-|:-|
|Listados ||
|CUU/Epic||
|Otros||
