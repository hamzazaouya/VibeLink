# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY user/package*.json ./

# Install dependencies, including typescript and ts-node
RUN npm install
RUN npm install -g ts-node nodemon

# Copy the rest of your application code
COPY user/ .

# Copy the index.html from the parent directory
COPY index.html ./index.html

# Expose the port your app runs on
EXPOSE 3000

# Use nodemon and ts-node to run the TypeScript app
CMD ["nodemon", "--exec", "ts-node", "src/app.ts"]
