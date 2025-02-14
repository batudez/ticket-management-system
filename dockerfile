FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN apt-get update -y && apt-get install -y openssl

CMD ["npm", "run", "start:prod"]




