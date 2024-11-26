# NestJS Microservices Project

This project is built using **NestJS** and follows a microservices architecture. It includes several services that work together to form a complete solution. The main services are:

- **Gateway**: Acts as the API gateway that routes requests to the appropriate services.
- **Service-Attemp**: Handles logic related to attempts (e.g., tracking phishing attempts).
- **Service-Simulator**: Simulates business logic or operations for testing purposes.
- **Mail Service**: Responsible for sending emails in response to system events.

## Tech Stack

- **Backend**: NestJS for managing the phishing simulation and attempts logic.
- **Database**: MongoDB for storing user data and phishing attempt information.
- **Containerization**: Docker to containerize the application and manage its services.
- **Messaging**: (Optional) Add any messaging system like Kafka, NATS, etc. if applicable.

## Project Structure

The project is organized as follows:

```bash
app/
├── gateway/           # API Gateway (NestJS)
├── service-attempt/   # Service for attempt-related logic (NestJS)
├── service-simulator/ # Service to simulate business operations (NestJS)
├── mail-service/      # Email service (NestJS)
├── docker-compose.yml # Docker Compose configuration to run the entire app
└── db_data/           # Directory to persist MongoDB data (Docker volume)
```
## How to Run

Clone the repository and navigate to the project folder:
   ```bash
git clone <repository_url>
cd <folder_name>
```

Run the application using Docker Compose:
```bash
docker compose up -d
```

**Accessing the Application**
Once the containers are up and running, you can access the API gateway at:
 - **Backend: http://localhost:4000**
 - **Swagger: http://localhost:4000/api-docs**

### Stopping the Application

To stop and remove all running containers, use the following command:
```bash
docker-compose down
   ```

### Notes

•	MongoDB data is persisted in the db_data/ directory.

•	Ensure that .env files are set up in both the backend/ and frontend/ directories before running the app.

### Troubleshooting

•	Docker Issues: If you encounter any Docker issues, ensure Docker and Docker Compose are installed correctly.

•	Port Conflicts: Make sure that the ports are not being used by other services on your system.
