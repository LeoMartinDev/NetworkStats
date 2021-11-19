FROM node:16

WORKDIR /app
RUN chown node:node /app
USER node

RUN apt-get install curl && \
  curl -s https://install.speedtest.net/app/cli/install.deb.sh | sudo bash && \
  apt-get install speedtest

COPY ./package*.json ./

ENV NODE_ENV=production

RUN npm ci

COPY . .

CMD ["npm", "start"]
