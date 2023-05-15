FROM node:18-alpine


WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

VOLUME [ "/app/node_modules" ]

RUN node ace swagger:generate

CMD ["node", "ace", "serve", "--watch"]

