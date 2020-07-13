FROM node:14

WORKDIR /app/

COPY package* /app/
RUN npm ci

COPY . .
RUN npm run build

RUN npm install -g serve

CMD ["serve", "public/"]