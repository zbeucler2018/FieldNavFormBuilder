FROM node:14.17.1

WORKDIR /code

COPY package.json /code/package.json

EXPOSE 3000

RUN npm install

COPY . /code/

CMD ["npm", "start"]