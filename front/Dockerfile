# Use a imagem oficial do Node.js como base para construir o frontend
FROM node:18 AS build

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do frontend
COPY . .

# Construa a aplicação
RUN npm run build

# Use uma imagem Nginx para servir o frontend
FROM nginx:1.25

# Copie os arquivos de build para o Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Inicie o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
