# 🦋 Butterfly API
Una API REST para gestionar información sobre mariposas africanas. Originalmente desarrollada con MySQL y posteriormente migrada a **MongoDB Atlas**.

---

## ✨ Características

- 🔄 **CRUD completo** para mariposas (Crear, Leer, Actualizar, Eliminar)
- ✅ **Validación de datos** con express-validator
- 🗄️ **Base de datos MongoDB** con Mongoose
- 🧪 **Tests unitarios** con Jest y Supertest
- ⚙️ **Configuración de entorno** con variables de entorno
- 📖 **Documentación completa** de endpoints

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
|------------|-----------|
| **Node.js & Express.js** | Backend y servidor web |
| **MongoDB Atlas** | Base de datos (migrado desde MySQL) |
| **Mongoose** | ODM para MongoDB |
| **Jest & Supertest** | Testing y pruebas de integración |
| **express-validator** | Validación de datos |
| **dotenv** | Gestión de variables de entorno |

---

## 🚀 Instalación y Configuración

### 1️⃣ Clona el repositorio
```bash
git clone https://github.com/API-Nectara/api-nectara-mongoDB.git
cd Api-Nectara-Mongo
```

### 2️⃣ Instala las dependencias
```bash
npm install
```

### 3️⃣ Configura las variables de entorno
Copia el archivo `.env_example` a `.env` y edítalo con tus datos:

```env
MONGODB_URI=<Tu URI de MongoDB>
DB_NAME=<El nombre de tu base de datos>
PORT=8080
```

### 4️⃣ Inicia el servidor
```bash
node app.js
```

---

## 📊 Estructura de la Base de Datos

### 🦋 Modelo Butterfly

```javascript
{
  common_name: String (required),         // Nombre común
  scientific_name: String (required),     // Nombre científico  
  location: String (required),            // Ubicación
  description: String (required, min:10), // Descripción
  habitat: String (required),             // Hábitat
  image: String (required, URL),          // URL de la imagen
  migratory: Boolean (required),          // Es migratoria
  createdAt: Date,                        // Fecha de creación
  updatedAt: Date                         // Fecha de actualización
}
```

---

## 🛣️ Endpoints de la API

### 📋 GET `/butterflies`
> Obtiene todas las mariposas

**Respuesta exitosa (200):**
```json
[
  {
    "id": "60f7d2b5a1b2c3d4e5f6g7h8",
    "common_name": "Mariposa Reina Africana",
    "scientific_name": "Danaus chrysippus",
    "location": "África subsahariana",
    "description": "Color naranja intenso con alas negras y puntos blancos...",
    "habitat": "Sabana y zonas abiertas",
    "image": "https://example.com/butterfly.jpg",
    "migratory": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### 🔍 GET `/butterflies/:id`
> Obtiene una mariposa específica por ID

**Parámetros:**
- `id`: ObjectId de MongoDB

**Respuestas:**
- `200` ✅ Mariposa encontrada
- `400` ❌ ID inválido
- `404` ❌ Mariposa no encontrada

### ➕ POST `/butterflies`
> Crea una nueva mariposa

**Body (JSON):**
```json
{
  "common_name": "Mariposa Ejemplo",
  "scientific_name": "Lepidoptera exemplum", 
  "location": "África Oriental",
  "description": "Una hermosa mariposa con características únicas y coloridas",
  "habitat": "Bosques tropicales",
  "image": "https://example.com/butterfly.jpg",
  "migratory": false
}
```

**Respuestas:**
- `201` ✅ Mariposa creada exitosamente
- `400` ❌ Errores de validación

### ✏️ PUT `/butterflies/:id`
> Actualiza una mariposa existente

**Parámetros:**
- `id`: ObjectId de MongoDB

**Body (JSON):** _Mismo formato que POST_

**Respuestas:**
- `200` ✅ Mariposa actualizada exitosamente
- `400` ❌ Errores de validación o ID inválido
- `404` ❌ Mariposa no encontrada

### 🗑️ DELETE `/butterflies/:id`
> Elimina una mariposa

**Parámetros:**
- `id`: ObjectId de MongoDB

**Respuestas:**
- `200` ✅ Mariposa eliminada exitosamente
- `400` ❌ ID inválido

---

## ✅ Validaciones

| Campo | Validación |
|-------|------------|
| `common_name` | ✔️ Requerido, no vacío |
| `scientific_name` | ✔️ Requerido, no vacío |
| `location` | ✔️ Requerido, no vacío |
| `description` | ✔️ Requerido, mínimo 10 caracteres |
| `habitat` | ✔️ Requerido, no vacío |
| `image` | ✔️ Requerido, debe ser una URL válida |
| `migratory` | ✔️ Requerido, debe ser booleano |

---

## 🧪 Testing

### Ejecutar tests:
```bash
npm test
```

### 📝 Características de los tests:
- ✅ Los tests usan una **base de datos separada** (`nectara_test_db`) para mantener la integridad
- 🧹 Cada test **crea y limpia** sus propios datos usando los métodos de Mongoose
- 📊 **Cobertura completa** de todos los endpoints CRUD

### 📸 Ejecución de Tests
![Ejecución de Tests](./docs/images/Captura%20de%20pantalla%202025-09-12%20155816.png)

---

## 🔄 Migración MySQL → MongoDB

### 🔧 Cambios Realizados

| Aspecto | Antes (MySQL) | Después (MongoDB) |
|---------|---------------|-------------------|
| **ORM/ODM** | Sequelize | Mongoose |
| **Modelos** | Modelos SQL | Esquemas MongoDB |
| **Conexión** | MySQL local | MongoDB Atlas |
| **IDs** | Numéricos | ObjectIds |
| **Validaciones** | Sequelize | Mongoose + express-validator |

### 📦 Datos Iniciales

La API incluye **19 especies de mariposas africanas** con información detallada sobre:

- 🏷️ Nombres comunes y científicos
- 🌍 Ubicaciones específicas  
- 📝 Descripciones detalladas
- 🏞️ Hábitats naturales
- ✈️ Patrones migratorios
- 🖼️ Imágenes de referencia

---

## 📁 Estructura del Proyecto

```
📦 Butterfly API
├── 📂 controllers/
│   └── 📄 ButterflyController.js    # Controladores de la API
├── 📂 database/
│   └── 📄 db_connection.js          # Configuración de MongoDB
├── 📂 models/
│   └── 📄 ButterflyModel.js         # Modelo de Mongoose
├── 📂 routes/
│   └── 📄 butterflyRoutes.js        # Rutas de la API
├── 📂 validators/
│   └── 📄 butterfliesValidators.js  # Validaciones
├── 📂 test/
│   ├── 📄 butterflies.test.js       # Tests principales
│   └── 📄 jest.setup.js             # Configuración de Jest
├── 📂 seeds/
│   └── 📄 ButterflySeeds.sql        # Datos iniciales (SQL legacy)
├── 📄 .env_example                  # Ejemplo de variables de entorno
├── 📄 .editorconfig                 # Configuración del editor
└── 📄 jest.config.js                # Configuración de Jest
```

---

## 🚨 Manejo de Errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| `400` | Bad Request | Datos inválidos o ID malformado |
| `404` | Not Found | Recurso no encontrado |
| `500` | Internal Server Error | Error del servidor |

> **Nota:** Todos los errores devuelven un JSON con información descriptiva

---

## 🔧 Desarrollo

### Comandos útiles
```bash
# Desarrollo con recarga automática
npm run dev

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

---

## 👩‍💻 Equipo de Backend

<div align="center">

### 🌟 **Desarrolladoras**

| Nombre | Rol |
|--------|-----|
| **Paloma Gómez** | Backend Developer |
| **Gema Yébenez** | Backend Developer |
| **Maryori Cruz** | Backend Developer |
| **Ana Muruzabal** | Backend Developer |
| **Camila Arenas** | Backend Developer |

</div>

---

<div align="center">
  <p>✨ <strong>¡Gracias por usar Butterfly API!</strong> ✨</p>
  <p>🦋 <em>Conservando la biodiversidad, una mariposa a la vez</em> 🦋</p>
</div>
