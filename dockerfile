# Etapa 1: Build do projeto 
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: NGINX
FROM nginx:stable-alpine

# Remove conf padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia build
COPY --from=build /app/dist /usr/share/nginx/html

# Copia conf personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
