FROM node:17-alphine

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev"]

