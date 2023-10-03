FROM node:14

WORKDIR /api

COPY . ./

RUN npm install

COPY . /api/

EXPOSE 8080

CMD ["npm", "start"]
