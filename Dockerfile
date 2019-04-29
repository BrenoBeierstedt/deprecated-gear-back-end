FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false app &&\

npm install --global npm@6.7.0

ENV HOME=/home/app

COPY . package.json npm-shrinkwrap.json $HOME/gear-platform/

RUN npm install

RUN chown -R app:app $HOME/*

USER app

WORKDIR $HOME/gear-platform


USER root

COPY . $HOME/gear-platform

RUN chown -R app:app $HOME/*

USER app



CMD ["npm","start"]