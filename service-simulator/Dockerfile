FROM node:22.4.1-alpine

RUN npm install -g npm@10.8.1

RUN mkdir -p /var/www/simulator

WORKDIR /var/www/simulator

ADD . /var/www/simulator

RUN npm install

CMD npm run build && npm run start:prod
