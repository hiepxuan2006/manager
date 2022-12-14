FROM node:14

EXPOSE 5005


WORKDIR /app

RUN npm i npm@latest 

COPY package.json package-lock.json ./

run yarn install

COPY . .

CMD [ "node", "index.js" ]