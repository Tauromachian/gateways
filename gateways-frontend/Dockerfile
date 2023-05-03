FROM node:18-alpine as build-stage

# Make the 'app' folder the current working directory
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json yarn.lock .env.production ./

# Install project dependencies
RUN yarn global add http-server && yarn install

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Build app for production with minification
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]