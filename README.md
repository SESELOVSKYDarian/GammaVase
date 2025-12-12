# GammaVase

Guía rápida para desplegar la app en Hostinger (o cualquier host con Node.js):

## Variables de entorno
- Crea un archivo `.env` dentro de `Backend` basado en `.env.example`. Define las credenciales de base de datos, usuario/admin y los datos SMTP.
- Ajusta `FRONTEND_URLS` con el dominio público que te asigne Hostinger (por ejemplo, `https://tu-dominio.com`).
- Crea un archivo `.env` dentro de `GammaVase` a partir de `.env.example` y coloca la misma URL pública en `VITE_API_URL`.

## Construir y ejecutar
1. Instala dependencias en ambos proyectos:
   ```bash
   cd GammaVase && npm install
   cd ../Backend && npm install
   ```
2. Genera el build de producción del frontend:
   ```bash
   cd ../GammaVase
   npm run build
   ```
   Esto crea `GammaVase/dist`, que el servidor Express sirve automáticamente.
3. Inicia la API/servidor en Hostinger (o local):
   ```bash
   cd ../Backend
   npm run start
   ```
   El servidor escuchará en `PORT` (por defecto 3000) en `0.0.0.0`.

## Notas para Hostinger
- Configura la aplicación Node en el panel apuntando a `Backend/index.js` como archivo de inicio.
- Define todas las variables de entorno del backend en el panel de variables de Hostinger.
- Expone el puerto que Hostinger indique; Express leerá el valor desde `PORT`.
- Si usas un dominio o subdominio, añádelo a `FRONTEND_URLS` para permitir CORS.
