# Etapa 1: Build da imagem
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Runtime da imagem
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
