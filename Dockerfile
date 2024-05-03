# Use the latest LTS version of Node.js
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that your app runs on
EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]
