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

# Use a imagem do Node.js para rodar o servidor de preview do Vite
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de build para o diretório de trabalho
COPY --from=build /usr/src/app/dist /usr/src/app/dist

# Instale o Vite novamente para rodar o servidor
RUN npm install -g vite

# Exponha a porta 4173 (padrão do Vite)
EXPOSE 4173

# Comando para rodar o servidor de preview do Vite
CMD ["vite", "preview", "--port", "4173", "--host"]
