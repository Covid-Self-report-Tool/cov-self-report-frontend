# Resources
# https://dev.to/peterj/run-a-react-app-in-a-docker-container-kjn
# https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/

# Alpine base image that satisfies node-gyp deps
FROM andreysenov/node-gyp

# Need to be root to run apk stuff
USER root

# AWS Amplify needs Git and OpenSSH, which are no included in default Alpine
RUN apk add --no-cache git openssh curl

# Switch back to default user
USER node
RUN mkdir -p /home/node/app

# Create app directory
WORKDIR /home/node/app

# Commands should be run using this to mount the volume: -v $(pwd):/covid
# WORKDIR /covid

# Attempt to make the build work
# ENV GENERATE_SOURCEMAP false

# Install deps (wildcard ensures package.json AND package-lock.json are copied)
# COPY package*.json ./

# RUN npm install

# Bundle app source
# COPY . .

# If you are building your code for production
# RUN npm ci --only=production
