# Dockerfile for website-template
#
# Maintainer: Erivando Sena <erivandosena@gmail.com>
#
# Description: Este Dockerfile cria uma imagem para website, um aplicativo da Web em Node.
#
# Build instructions:
#   docker build -t erivando/website-node:latest --build-arg 'VERSION=1.0.0' .
#   docker push erivando/website-node:latest
#
# Build Arm instructions:
# docker buildx create --name armbuilder
# docker buildx use armbuilder
# docker buildx build --platform linux/amd64,linux/arm64/v8 -t erivando/website-node:latest --build-arg 'VERSION=1.0.0' --push .
#
# Usage:
#
#   docker run -it --rm -d -p 8088:80 --name website erivando/website-node:latest
#   docker logs -f --tail --until=2s website
#   docker exec -it website bash
#
# Dependencies: node:lts
#
# Environment variables:
#
#   VERSION: usado na tag de imagem ou como parte dos metadados da mesma.
#
# Notes:
#
# - Este Dockerfile assume que o código do aplicativo está localizado no diretório atual
# - O aplicativo pode ser acessado em um navegador da Web em http://www.updevops.com.br/
# - https://hub.docker.com/r/erivando/website-node
#
# Version: 1.0

FROM node:lts

LABEL \
  org.opencontainers.image.vendor="UP DevOps" \
  org.opencontainers.image.title="Official Node Docker image" \
  org.opencontainers.image.description="Site de Currículos" \
  org.opencontainers.image.version="1.0.0" \
  org.opencontainers.image.url="https://hub.docker.com/r/erivando/website-node" \
  org.opencontainers.image.source="https://github.com/erivandosena/tcc-g8.git" \
  org.opencontainers.image.licenses="MIT" \
  org.opencontainers.image.author="erivandosena, UP DevOps" \
  org.opencontainers.image.company="CICLO 2 AWS 16 G8" \
  org.opencontainers.image.maintainer="UP DevOps"

RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
  software-properties-common \
  nano \
  sudo \
  && apt-get update && apt-get install -y certbot \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

RUN echo "node ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/node && \
  chmod 0440 /etc/sudoers.d/node && \
  visudo -cf /etc/sudoers.d/node

RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER node

RUN mkdir -p .well-known/acme-challenge

EXPOSE 80

CMD [ "node", "app.js" ]