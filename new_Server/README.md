# How to Start Node Application with Redis (Using Docker Stack)

## 1. Run Redis Stack Using Docker

Start Redis Stack container:
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

This will:
* Start Redis Stack (Redis + RedisInsight UI)
* Expose Redis on **localhost:6379**
* Expose RedisInsight UI on **localhost:8001**

## 2. Open a Terminal Inside the Redis Container

To enter the Redis CLI:

docker exec -it redis-stack redis-cli

You are now inside Redis CLI and can run Redis commands.

## 3. Set Redis Password

Inside the Redis CLI, set a password:

CONFIG SET requirepass password

Replace password with your own strong password.

### Verify password:
AUTH password
If successful → Redis is now password-protected.

## 4. Access Redis CLI Using Password

Since Redis is running inside Docker, you can directly open the CLI with authentication:

docker exec -it redis-stack redis-cli -a password

Once inside, test connectivity with:

ping

## 5. Start Dependent Services

Before running your Node.js app, you must have **Redis**, **MongoDB**, and **Kafka** running. You can manage these using Docker Compose.

### Commands:

* **Build & run all services in detached mode:**
  docker compose up -d --build
  
* **Run specific services:**
  docker-compose up -d redis mongo zookeeper kafka

* **Verify containers are running:**
  docker compose ps
  
* **View logs (example for Kafka):**
  docker compose logs -f kafka
  
  Or view all logs:

  docker compose logs -f
  

* **Stop and clean up containers and volumes:**
  docker-compose down -v
  
  Or without removing volumes:

  docker-compose down
  
## 6. Update Your Node.js Redis Client

Use your Redis password in your Node.js app:

const client = createClient({
  url: "redis://default:password@localhost:6379"
});


Replace password with the one you set in step 3.

## 7. Start Node Application

Install dependencies:
npm install

Start the app:
npm run start

Or in development mode:
npm run dev
