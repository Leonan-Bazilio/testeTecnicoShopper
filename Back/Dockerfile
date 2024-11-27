# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do backend
COPY . .

# Compile o TypeScript
RUN npm run dist

# Exponha a porta 8080
EXPOSE 8080

# Defina as variáveis de ambiente no container
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV GOOGLE_API_KEY=${GOOGLE_API_KEY}

# Inicie a aplicação
CMD ["npm", "run", "start:dist"]
