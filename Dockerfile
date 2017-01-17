FROM node:latest
MAINTAINER Sergio Alonso <sergio@sergioalonso.es>

ADD package.json /src/package.json

RUN npm install -g supervisor

RUN /usr/sbin/useradd --create-home --home-dir /usr/local/nonroot --shell /bin/bash nonroot
RUN chown -R nonroot /src
USER nonroot
ENV HOME /usr/local/nonroot
WORKDIR /src

RUN npm i --production --ignore-scripts --unsafe-perm
RUN npm i --only=dev --ignore-scripts --unsafe-perm

ADD . /src

EXPOSE 3000

CMD ["supervisor", "server.js"]
