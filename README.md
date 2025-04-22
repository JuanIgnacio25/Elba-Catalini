# 🚗 La Casa del Accesorio

La Casa del Accesorio es un sistema de gestión de pedidos con catálogo online, orientado a ventas de faros de iluminacion universal BAIML y accesorios para vehículos. Está desarrollado íntegramente con Next.js, tanto para el back-end como el front-end, y utiliza MongoDB como base de datos. La aplicación está desplegada en Railway.

## 🌐 URL de Producción

Puedes ver el sitio en funcionamiento en: [https://elbacatalini.com/](https://elbacatalini.com/)

## ✨ Características Principales

- Catálogo online con imágenes y descripciones.
- Carrito de compras persistente para usuarios registrados y visitantes.
- Autenticación y registro de usuarios.
- Gestión de pedidos y visualización de historial por parte del usuario.
- Panel de administración para CRUD de productos, usuarios y pedidos.
- Envío de correos automáticos (confirmación de pedido, credenciales, etc.).
- Diseño responsive adaptado a dispositivos móviles.

## ⚙️ Tecnologías Utilizadas

- Next.js 14, Next.js API routes, Nextauth
- MongoDB + Mongoose
- Tailwind CSS y CSS
- Nodemailer, jwt, ajv, exceljs, framer motion
- Railway , MongoDB Atlas , Cloudinary

## Instalacion

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/nombre-del-repo.git
cd nombre-del-repo
```
2. Instala las dependencias:

```bash
npm install
```
3. Configura las variables de entorno en un archivo .env.local:

```bash
MONGO_ATLAS_URL=url_data_base
NODE_ENV=enviroment
NEXTAUTH_URL=url_server
NEXTAUTH_COOKIE_SECURE=boolean
NEXTAUTH_SECRET=
NEXT_PUBLIC_WEBSITE_DOMAIN=domain
EMAIL_USER=user_email_sending_emails
EMAIL_PASSWORD=appkey_email_sending_emails
RECIEVER_EMAIL_USER=email_receiving_emails
JWT_SECRET=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

4. Inicia el servidor: 

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
