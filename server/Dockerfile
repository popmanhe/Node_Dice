FROM node:7.8

#RUN mkdir /usr/nodedice
#RUN mkdir /usr/nodedice/logs
#ADD package.json /usr/nodedice
#ADD ./dist/nodeDiceServer.js /usr/nodedice
WORKDIR /usr/nodedice/
#RUN npm install --only=production
#RUN npm install pm2 -g
#expose node server port
EXPOSE  4000
CMD ["pm2-docker", "dist/nodeDiceServer.js"]




