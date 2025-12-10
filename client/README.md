#  How to Start Node Application with Redis (Using Docker Stack)

## 1. Run Redis Stack Using Docker**

Start Redis Stack container:

docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

This will:
* Start Redis Stack (Redis + RedisInsight UI)
* Expose Redis on **localhost:6379**
* Expose RedisInsight UI on **localhost:8001**

## 2. Open a Terminal Inside the Redis Container**

To enter the Redis CLI:

docker exec -it redis-stack redis-cli

You are now inside Redis CLI and can run Redis commands.

## 3. Set Redis Password**

Inside the Redis CLI, set a password:

CONFIG SET requirepass password

Replace `password` with your own strong password.

### Verify password:
AUTH password

If successful → Redis is now password-protected.

##  Update Your Node.js Redis Client**

Use your Redis password in your Node app:

const client = createClient({
  url: "redis://default:password@localhost:6379"
});

Replace `password` with the one you set in step 3.


## Start Node Application**
Install dependencies:
npm install

Start the app:
npm run start

Or in development:
npm run dev

## Now Your Node App + Redis Stack Is Running Successfully**

✔ Redis running in Docker
✔ Password protection enabled
✔ Node app connected securely to Redis
✔ RedisInsight available at: [http://localhost:8001](http://localhost:8001)


