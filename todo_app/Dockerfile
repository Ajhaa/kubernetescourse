FROM node:14 as client

WORKDIR /client/
COPY client/package* /client/
RUN npm ci
COPY client .
RUN npm run build


FROM node:14

WORKDIR /app
RUN mkdir shared
COPY server/package* /app/
RUN npm ci
COPY server .
COPY --from=client /client/public/build ./public

CMD ["npm", "start"]