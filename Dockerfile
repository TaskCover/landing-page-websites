FROM node:14

RUN mkdir /saas_frontend

WORKDIR /saas_frontend

COPY ./package.json /saas_frontend/

RUN npm install

COPY  . /saas_frontend

RUN npm run build

CMD ["npm", "start"]