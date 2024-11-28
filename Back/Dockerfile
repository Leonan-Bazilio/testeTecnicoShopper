# Use a imagem oficial do Node.js como base
FROM node:18

# Defina um diretório de trabalho diferente, se preferir
WORKDIR /app

# Copie os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Instale as dependências (runtime somente, sem devDependencies)
RUN npm install --production

# Copie o restante do código para o container
COPY . .

# Compile o TypeScript
RUN npm run dist

# Exponha a porta
EXPOSE 8080

# Inicie a aplicação
CMD ["node", "dist/server.js"]
