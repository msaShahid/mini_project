# TypeScript Express Server (MERN API Backend)

A clean, scalable **Express + TypeScript** API  with **MongoDB**, **JWT authentication**, **Zod validation**, and **modular architecture**.

## Project Structure
```
src/
 ├── config/
 │    └── db.ts
 ├── controllers/
 │    ├── userController.ts
 │    └── taskController.ts
 ├── middleware/
 │    ├── authMiddleware.ts
 │    └── errorMiddleware.ts
 ├── models/
 │    ├── User.ts
 │    └── Task.ts
 ├── routes/
 │    ├── userRoutes.ts
 │    └── taskRoutes.ts
 ├── services/
 │    ├── userService.ts
 │    └── taskService.ts
 ├── types/
 │    ├── user.types.ts
 │    ├── task.types.ts
 │    └── express.d.ts
 ├── utils/
 │    └── validation.ts
 ├── validators/
 │    ├── user.validation.ts
 │    └── task.validation.ts
 ├── server.ts
 └── .env
```

## Prerequisites
Ensure you have installed:
* **Node.js** ≥ 18.x
* **MongoDB Atlas** or local MongoDB
* **npm** or **pnpm**

## Installation & Setup
### 1️ Initialize a New Project
```bash
npm init -y
```

### 2️ Install Dependencies
```bash
npm install express mongoose dotenv cors jsonwebtoken bcryptjs zod
```

### 3️ Install Development Dependencies
```bash
npm install --save-dev typescript ts-node tsx @types/node @types/express @types/mongoose @types/bcryptjs @types/jsonwebtoken
```

### 4️ Initialize TypeScript Configuration
```bash
npx tsc --init
```

### 5️ Enable Hot Reloading with TSX
```bash
npm install --save-dev tsx
```

## Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
```
## Scripts
Add the following scripts to your **package.json**:

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```
| Command         | Description                                             |
|  | - |
| `npm run dev`   | Start the server in development mode with hot reloading |
| `npm run build` | Compile TypeScript to JavaScript in the `/dist` folder  |
| `npm start`     | Run the compiled server in production mode              |


## API Endpoints
### User Routes (`/api/users`)
| Method | Endpoint    | Description                  |
|  | -- | - |
| POST   | `/register` | Register a new user          |
| POST   | `/login`    | Login user and return JWT    |
| GET    | `/profile`  | Get user profile (protected) |

### Task Routes (`/api/tasks`)
| Method | Endpoint | Description              |
|  | -- |  |
| GET    | `/`      | Get all tasks for a user |
| POST   | `/`      | Create a new task        |
| PUT    | `/:id`   | Update an existing task  |
| DELETE | `/:id`   | Delete a task            |


### Usage:
1. Open **Postman**
2. Click **Import → File**
3. Select the collection file
4. Set environment variable `{{token}}` after login

## Authentication
All protected routes require a Bearer token:
```
Authorization: Bearer <your_jwt_token>
```

## Build & Run
### Development Mode:
```bash
npm run dev
```

### Production Mode:
```bash
npm run build
npm start
```
## Example API Workflow (Postman)
1. Register a new user → `/api/users/register`
2. Login → Copy JWT token
3. Create a new task → `/api/tasks` (add `Authorization` header)
4. Fetch tasks → `/api/tasks`
5. Update/Delete tasks by ID



