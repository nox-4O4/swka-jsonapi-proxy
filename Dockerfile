FROM ghcr.io/wi-hska/base-node:master
WORKDIR /app
COPY package.json package-lock.json ./
RUN ["npm", "ci"]
COPY . .
CMD ["node", "app.js"]
