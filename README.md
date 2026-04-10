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
![imagen del modelo]()

*Nota*: incluir un link con la imagen de un modelo, puede ser modelo de dominio, diagrama de clases, DER. Si lo prefieren pueden utilizar diagramas con [Mermaid](https://mermaid.js.org) en lugar de imágenes.

## Alcance Funcional 

### Alcance Mínimo
 

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Usuario<br>2. CRUD Servicio<br>3. CRUD Categoría|
|CRUD dependiente|1. CRUD Reseña {depende de Usuario y Solicitud} <br>2. CRUD Solicitud {depende de Usuario y Servicio} |
|Listado<br>+<br>detalle| 1. Listado de servicios filtrado por categoria, muestra servicio, precio y prestador => detalle CRUD Servicio<br> 2. Listado de solicitudes filtrado por estado, muestra servicio, cliente, fecha y estado => detalle CRUD Solicitud|
|CUU/Epic|1. Contratar un servicio doméstico<br>2. Gestionar una solicitud (aceptar/rechazar y completar)<br>3. Calificar un servicio realizado|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Usuario<br>2. CRUD Servicio<br>3. CRUD Categoria<br>4. CRUD Solicitud<br>5. CRUD Reseña<br>6. CRUD Disponibilidad<br>7. CRUD Favorito|
|CUU/Epic|1. Registro e inicio de sesión de usuarios con roles<br>2. Contratar un servicio<br>3. Gestionar una solicitud (aceptar, rechazar y completar)<br>4. Visualizar historial de servicios realizados|


### Alcance Adicional Voluntario


|Req|Detalle|
|:-|:-|
|Listados ||
|CUU/Epic||
|Otros||
