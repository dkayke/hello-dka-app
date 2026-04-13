# Usando uma imagem leve do Node
FROM node:18-alpine

# Criando a pasta da aplicação
WORKDIR /usr/src/app

# Copiando os arquivos (supondo que você rode npm install antes ou use apenas libs nativas)
# Para este exemplo simples, vamos apenas copiar o app.js
COPY app.js .

# Instalando o express de forma rápida
RUN npm install express

# Porta que a aplicação usa
EXPOSE 3000

# Comando para rodar
CMD ["node", "app.js"]