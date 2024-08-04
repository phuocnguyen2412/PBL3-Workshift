FROM node:18-alpine

WORKDIR /app

COPY ./pbl3.client ./

RUN apk add --no-cache zsh \
    && npm install


CMD [ "npm","run", "dev" ]
