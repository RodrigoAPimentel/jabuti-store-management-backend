FROM node:14.14.0-alpine3.12

RUN apk add --no-cache bash

RUN npm config set cache /home/node/api/.npm-cache --global

RUN npm i -g @nestjs/cli@^7.0.0

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY package.json yarn.* ./

RUN yarn

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD [ "yarn", "start:dev" ]

