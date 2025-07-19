FROM node:18

# Set working directory
WORKDIR /app



# Copy the rest of the source code
COPY . .

RUN npm install

# Expose default Vite / CRA dev port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
