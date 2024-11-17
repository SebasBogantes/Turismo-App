# Turismo-App

Un proyecto MERN (MongoDB, Express.js, React.js y Node.js) con arquitectura MVC diseñado para explorar destinos turísticos en Costa Rica.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener los siguientes programas instalados en tu máquina:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [npm](https://www.npmjs.com/) (generalmente viene con Node.js)
- [MongoDB](https://www.mongodb.com/) (puedes usar una base de datos local o una en la nube como [MongoDB Atlas](https://www.mongodb.com/atlas))

---

## Instrucciones de instalación

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local con el siguiente comando:

```bash
git clone https://github.com/SebasBogantes/Turismo-App.git
```

Accede al directorio del proyecto:

```bash
cd Turismo-App
```

### 2. Instalar dependencias
El proyecto está dividido en dos partes principales: Frontend (client) y Backend (server). Asegúrate de instalar las dependencias para ambas partes.

#### Frontend (client)
Accede a la carpeta client:

```bash
cd client
```

Instala las dependencias necesarias:
```bash
npm install
```
Instala Bootstrap para los estilos:

```bash
npm install bootstrap
```
Esto instalará todas las bibliotecas necesarias, incluyendo:

- React
- Bootstrap
- React Router

Vuelve a la raíz del proyecto para continuar con la configuración del backend:

```bash
cd ..
```

#### Backend (server)
Accede a la carpeta server desde la raíz del proyecto:

```bash
cd server
```
Instala las dependencias necesarias:

```bash
npm install
```

Instala Multer para manejar archivos:

```bash
npm install multer
```
Multer se utiliza para manejar la carga de imágenes en el servidor.

Esto instalará las siguientes bibliotecas principales:

- Express
- Multer (para gestión de archivos)
- dotenv (para variables de entorno)
- mongoose (para conexión con MongoDB)


### 3. Configurar variables de entorno
En la carpeta server, crea un archivo .env para definir las siguientes variables:

```bash
Copiar código
MONGO_URI=tu_conexion_mongo
PORT=5000
JWT_SECRET=tu_secreto_jwt
``` 
- MONGO_URI: URL de conexión a tu base de datos MongoDB.
- PORT: Puerto en el que se ejecutará el servidor (por defecto 5000).
- JWT_SECRET: Una clave secreta para manejar autenticaciones JWT.

---

### Ejecutar el proyecto
#### Frontend (client)
Accede a la carpeta del cliente:

```bash
cd client
```
Ejecuta el siguiente comando para iniciar el servidor del cliente en modo desarrollo:

```bash
npm start
```
Por defecto, el frontend estará disponible en http://localhost:3000.

#### Backend (server)
Desde la raíz del proyecto, accede a la carpeta del servidor:

```bash
cd server
```
Ejecuta el siguiente comando para iniciar el servidor del backend en modo desarrollo:

```bash
npm start
```
Por defecto, el backend estará disponible en http://localhost:5000.



### Dependencias utilizadas
#### Frontend (client)
- React: Biblioteca principal para construir la interfaz de usuario.
- Bootstrap: Biblioteca de estilos para diseño responsivo y atractivo.
- React Router: Manejo de rutas en la aplicación.
#### Backend (server)
- Express: Framework para construir el backend.
- Multer: Manejo de archivos (como imágenes) en el backend.
- dotenv: Gestión de variables de entorno.
- mongoose: Conexión y manejo de datos en MongoDB.


