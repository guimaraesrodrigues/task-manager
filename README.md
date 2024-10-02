# Task Manager App

This is a simple task manager application built with a Next.js backend, an Angular frontend, and a MongoDB database, all orchestrated with Docker Compose.

## Prerequisites

- **Docker:** Download and install Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).
- **Docker Compose:** This usually comes bundled with Docker Desktop.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
Configure Environment Variables (Optional):

You can customize the database connection string and other settings by creating a .env file in the root directory. Here's an example:

MONGODB_URI=mongodb://mongodb:27017/your-database-name
# ... other environment variables ...
Start the Application with Docker Compose:

docker-compose up -d
This command will:

Build the frontend and backend images.
Start the MongoDB database container.
Start the frontend and backend application containers.
Access the Application:

Once the containers are up and running, you can access the task manager application in your web browser at: http://localhost:4200.
Stopping the Application
docker-compose down
This will stop and remove the containers.

Available Scripts (Inside Containers)
Backend
npm run dev: Starts the Next.js development server (inside the container).
npm run build: Builds the Next.js application for production (inside the container).
npm start: Starts the Next.js application in production mode (inside the container).
Frontend
ng serve: Starts the Angular development server (inside the container).
ng build: Builds the Angular application for production (inside the container).
ng test: Runs unit tests (inside the container).
ng e2e: Runs end-to-end tests (inside the container).
Built With
Backend: Next.js
Frontend: Angular
Database: MongoDB
Containerization: Docker Compose
Contributing
If you'd like to contribute to this project, please fork the repository and create a pull request.

License
This project is licensed under the MIT License.


**Key Points:**

- **Docker Compose:** This setup uses Docker Compose to define and manage the entire application stack (database, frontend, and backend) within isolated containers.
- **Environment Variables:** You can customize settings using a `.env` file, which Docker Compose will load automatically.
- **Port Mapping:** Docker Compose will map the necessary ports from the containers to your host machine, so you can access the application in your browser.

**Remember to:**

- Replace placeholders like `your-username` and `your-database-name` with your actual values.
- Update the "Built With" and "License" sections if necessary.
- Add any other relevant information or instructions specific to your application.
- Consider adding screenshots or a demo video to your README to make it more engaging.