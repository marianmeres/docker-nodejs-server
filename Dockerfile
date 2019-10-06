
##################################################################################
FROM node:alpine as builder
RUN apk add --update --no-cache git
RUN mkdir -p /node_modules
RUN chown -R node:node /node_modules
USER node
COPY package.json ./
RUN npm install

##################################################################################
FROM node:alpine as app
RUN apk add --update --no-cache mc git
WORKDIR /home/node/app

COPY --chown=node:node . .

RUN mkdir -p /home/node/app/dist
RUN chmod -R 777 /home/node/app
RUN chown -R node:node /home/node/app

COPY --from=builder --chown=node:node node_modules ./node_modules

USER node
EXPOSE 8080

CMD npm run start
