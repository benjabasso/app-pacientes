# 🧠 App Pacientes

**App Pacientes** es una aplicación web desarrollada con **Node.js**, **Express**, **MongoDB** y **React**, diseñada para gestionar el registro y control de pacientes de manera ágil y moderna.  
Permite crear, editar, eliminar y listar pacientes con una arquitectura escalable, mantenible y segura.

---

## 🚀 Tecnologías utilizadas

### 🏗️ Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Token)  
- bcryptjs  
- dotenv  
- Arquitectura **MVC**

### 🎨 Frontend (próximo)
- React.js  
- Vite  
- Axios  
- React Router DOM  
- TailwindCSS  

---

## 📂 Estructura del proyecto
app-pacientes/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── app.js
│ │ └── server.js
│ ├── .env
│ └── package.json
│
└── frontend/ (por crear con React)

---

## ⚙️ Instalación y configuración

### 1️⃣ Clonar el repositorio
```bash
git clone git@github.com:benjabasso/app-pacientes.git
cd app-pacientes
```

### 2️⃣ Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3️⃣ Crear archivo .env
```bash
PORT=3000
MONGO_URI=tu_cadena_de_conexion_mongodb
JWT_SECRET=clave_secreta_segura
```

### 4️⃣ Ejecutar el servidor
```bash
npm run dev
```

El servidor correrá en:
👉 http://localhost:3000

---

## 🧩 Endpoints principales

### 🔐 Usuarios

| Método | Endpoint              | Descripción             |
| :----: | :-------------------- | :---------------------- |
|  POST  | `/api/users/register` | Registrar nuevo usuario |
|  POST  | `/api/users/login`    | Iniciar sesión          |

### 👤 Pacientes

| Método | Endpoint            | Descripción             |
| :----: | :------------------ | :---------------------- |
|   GET  | `/api/patients`     | Listar pacientes        |
|  POST  | `/api/patients`     | Crear paciente          |
|   GET  | `/api/patients/:id` | Obtener paciente por ID |
|   PUT  | `/api/patients/:id` | Actualizar paciente     |
| DELETE | `/api/patients/:id` | Eliminar paciente       |

---

## 🧱 Arquitectura del proyecto

Patrón: MVC (Model - View - Controller)

  - **Models**: Definen la estructura de los datos en MongoDB

  - **Controllers**: Contienen la lógica del negocio

  - **Routes**: Definen los endpoints y conectan con los controladores

  - **Middleware**: Manejadores de autenticación, validaciones, errores, etc.
  
---

## 🧪 Testeo de API

Podés probar los endpoints con **Postman** o **Thunder Client**.

**Ejemplo:**

- Método: POST
- URL: http://localhost:3000/api/users/register
- Headers:
```bash
{
    "Content-Type": "application/json"
}
```
- Body:
```bash
{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456"
}
```
---

## 🔮 Próximas mejoras

- Implementación del frontend completo con React
- Sistema de roles y permisos
- Gestión de citas médicas
- Dashboard con estadísticas
- Deploy en Render / Vercel

---

## 🤝 Contribuciones

🤝 Contribuciones

Las contribuciones son bienvenidas.
Hacé un fork del proyecto, creá una rama con tu mejora y abrí un **Pull Request**.

## 👤 Autor

### **Benjamin Basso**
### 📍 Argentina
### 🔗 GitHub