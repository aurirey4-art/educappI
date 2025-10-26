# E-ducap | Plataforma Educativa Integral

Plataforma educativa integral para escuelas en México. Incluye portales dedicados para administradores, maestros, alumnos y padres, con un enfoque en la interactividad en tiempo real, la gestión de contenido y la personalización.

## ✨ Características Principales

-   **Panel de Roles Dedicado:** Interfaces únicas y especializadas para Administradores, Maestros, Alumnos y Tutores.
-   **Autenticación Segura:** Sistema de login real implementado con Firebase Authentication.
-   **Base de Datos en Tiempo Real:** Sincronización de datos instantánea entre todos los roles gracias a Firestore.
-   **Gestión de Contenido:** Módulos para crear y administrar lecciones, tareas y recursos multimedia.
-   **Generador de Contenido con IA:** Herramienta para administradores que utiliza la API de Gemini para crear borradores de lecciones.
-   **Interfaz Moderna y Personalizable:** Diseño limpio con temas visuales (claro, oscuro, suave) y paletas de colores personalizables.

## 🛠️ Tecnologías Utilizadas

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **Backend & Base de Datos:** Firebase (Authentication, Firestore)
-   **API de IA:** Google Gemini API
-   **Entorno de Desarrollo:** Vite

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar las variables de entorno:**
    -   En la raíz del proyecto, crea un archivo llamado `.env`.
    -   Copia la estructura de abajo y pégala en tu nuevo archivo `.env`.
    -   Rellena los valores con las credenciales de **tu propio proyecto de Firebase** (las encontrarás en la consola de Firebase > Configuración del proyecto > Tus apps > Aplicación web).

    Tu archivo `.env` debe verse así:
    ```
    VITE_FIREBASE_API_KEY="AIzaSy..."
    VITE_FIREBASE_AUTH_DOMAIN="tu-proyecto.firebaseapp.com"
    VITE_FIREBASE_PROJECT_ID="tu-proyecto"
    VITE_FIREBASE_STORAGE_BUCKET="tu-proyecto.appspot.com"
    VITE_FIREBASE_MESSAGING_SENDER_ID="1234567890"
    VITE_FIREBASE_APP_ID="1:1234567890:web:abcdef"
    VITE_GEMINI_API_KEY="AIzaSy..."
    ```
    **IMPORTANTE:** El archivo `.gitignore` ya está configurado para que este archivo `.env` nunca se suba a GitHub, manteniendo tus claves seguras.

4.  **Ejecutar la aplicación:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` o en el puerto que indique Vite.
