# Filename: Dockerfile
#
# docker build -t jamiekyu/smartthings-switch-toggler .
# docker run -d -p8888:8888 -e SMARTTHINGS_PAT_TOKEN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# -e SMARTTHINGS_DEVICE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx jamiekyu/smartthings-switch-toggler
#
# Publishing to Docker Hub
# docker login
# docker tag jamiekyu/smartthings-switch-toggler jamiekyu/smartthings-switch-toggler:latest
# docker push jamiekyu/smartthings-switch-toggler:latest
#
FROM node
WORKDIR /home/node/app
COPY package*.json /home/node/app/
RUN npm install
COPY . /home/node/app/
RUN chmod +x /home/node/app/index.js
EXPOSE 8888
CMD [ "node", "index.js" ]
