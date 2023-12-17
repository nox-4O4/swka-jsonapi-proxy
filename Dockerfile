# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

# Build Stage
FROM ghcr.io/wi-hska/base-node:master

RUN apt-get update &&\
    apt-get install -y \
    openssl\
    libssl-dev \
    ca-certificates\
    pkg-config

# Copy our manifests and source code
COPY . .

# Run the application.
CMD npm install
ENTRYPOINT ["node app.js"]

