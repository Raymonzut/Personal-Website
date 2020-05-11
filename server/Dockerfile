FROM node:latest

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD [ "node", "index.js" ]

EXPOSE 5000
