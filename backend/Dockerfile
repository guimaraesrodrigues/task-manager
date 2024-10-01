# Use a stable Node.js version as the base image
FROM node:18-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you're using npm)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your Next.js app runs on
EXPOSE 3001

# Start your Next.js app
CMD ["npm", "run", "dev"]
