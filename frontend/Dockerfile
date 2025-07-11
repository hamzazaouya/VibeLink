# we will use the latest version of node available from the Docker Hub.
FROM node:latest

################################# BUILD TIME #########################################

# Create app directory, where your app will live its lifetime.
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./Matcha/*.json ./

# Installing the packages while the image is building
RUN npm install

# The app binds to port 3000, so exposing port 3000 to be used by the docker network
EXPOSE 5000

################################# RUNTIME ##############################################3

# Runtime command to be executed when the container is launched
ENTRYPOINT [ "sh", "script.sh" ]