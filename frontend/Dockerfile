# Use a stable Node.js version for building the Angular app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if using npm)
COPY package*.json ./

# Install Angular CLI globally and project dependencies
RUN npm install -g @angular/cli
RUN npm install

# Copy the rest of your Angular project
COPY . .

# Build your Angular app for production
RUN ng build --configuration production

# Use a smaller base image for serving the production build (optional but recommended)
FROM nginx:alpine AS production

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/task-manager-app /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
