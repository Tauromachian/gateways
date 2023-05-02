FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]