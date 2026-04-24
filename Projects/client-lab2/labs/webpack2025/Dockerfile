FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx webpack

EXPOSE 3000

CMD ["npx", "serve", ".", "-l", "3000"]
