FROM node:7.8

RUN mkdir /usr/nodedice
WORKDIR /usr/nodedice/
RUN npm install pm2 -g
#expose node server port
EXPOSE  3000
CMD ["pm2-docker","nodedice_server.yml"]