FROM node:16

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY app.js ./

# Exports
EXPOSE 3000
CMD [ "npm", "run", "start.dev" ]

