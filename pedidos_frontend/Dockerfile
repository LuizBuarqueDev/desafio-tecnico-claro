# Etapa de build
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --configuration production


# Servidor nginx
FROM nginx:alpine

COPY --from=build /app/dist/pedidos_frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]