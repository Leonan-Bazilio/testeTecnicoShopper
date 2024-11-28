# Etapa de construção
FROM node:18-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Instale as dependências e construa o projeto
RUN npm install
COPY . .
RUN npm run build

# Etapa de execução
FROM nginx:alpine

# Copie o build para o servidor NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Execute o NGINX
CMD ["nginx", "-g", "daemon off;"]