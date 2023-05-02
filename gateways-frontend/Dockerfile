FROM node:18-alpine

# Make the 'app' folder the current working directory
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn global add http-server && yarn install

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Build app for production with minification
RUN yarn build

EXPOSE 8080
CMD [ "http-server", "dist" ]