FROM node:14

WORKDIR /client

COPY . ./

RUN npm install

COPY . /client/

EXPOSE 3000

CMD ["npm", "start"]
