// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// =================================================================
// INSTRUCCIONES IMPORTANTES PARA LA CONFIGURACIÓN DE FIREBASE
// =================================================================
// 1. Ve a la consola de tu proyecto de Firebase: https://console.firebase.google.com/
// 2. Haz clic en el icono de engranaje (⚙️) junto a "Project Overview" y selecciona "Project settings".
// 3. En la pestaña "General", baja hasta la sección "Your apps".
// 4. Selecciona tu aplicación web (o créala si no existe).
// 5. Busca el objeto `firebaseConfig` que se muestra en el SDK.
// 6. Copia los valores de ese objeto y pégalos aquí abajo,
//    reemplazando los textos como "TU_API_KEY_AQUI".
// =================================================================

const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_AUTH_DOMAIN_AQUI",
  projectId: "TU_PROJECT_ID_AQUI",
  storageBucket: "TU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "TU_MESSAGING_SENDER_ID_AQUI",
  appId: "TU_APP_ID_AQUI"
};

// ADVERTENCIA: No compartas este archivo con claves reales en un
// repositorio público. La configuración actual es para desarrollo
// y pruebas. Para producción, se deben usar variables de entorno.

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase para usar en la aplicación
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
