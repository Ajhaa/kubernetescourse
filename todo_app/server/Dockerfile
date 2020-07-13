FROM node:14

WORKDIR /app
RUN mkdir shared
COPY package* /app/
RUN npm ci
COPY . .

CMD ["npm", "start"]