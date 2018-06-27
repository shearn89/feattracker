FROM node:8-alpine

ENV NODE_ENV production
ENV NODE_PORT 8080
ENV DEBUG feattracker:*

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD npm start
