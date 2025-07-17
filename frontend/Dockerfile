FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY app/package*.json ./
RUN npm install

# Copy the rest of the source code
COPY ./app .

# Expose default Vite / CRA dev port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
