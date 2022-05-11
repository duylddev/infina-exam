FROM node:16-alpine

WORKDIR /home/app

COPY . .

RUN  apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN npm install pm2 -g
RUN yarn && yarn build

RUN apk add tzdata

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
