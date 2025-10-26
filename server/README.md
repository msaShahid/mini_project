# 🚀 TypeScript Express Server

## 📦 Installation & Setup

### 1️Initialize a New Project
npm init -y

### 2️ Install Dependencies
npm install express mongoose dotenv cors jsonwebtoken bcryptjs

### 3️ Install Development Dependencies
npm install --save-dev typescript ts-node tsx @types/node @types/express @types/mongoose @types/bcryptjs

### 4️ Initialize TypeScript Configuration
npx tsc --init

### 5️ Enable Hot Reloading with TSX
npm install --save-dev tsx

## ⚙️ Configuration
Create a `.env` file in the root directory:

env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key


## 🚀 Scripts
Add the following scripts to your **package.json**:

json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}

| Command         | Description                                             |
| --------------- | ------------------------------------------------------- |
| `npm run dev`   | Start the server in development mode with hot reloading |
| `npm run build` | Compile TypeScript to JavaScript in the `/dist` folder  |
| `npm start`     | Run the compiled server in production mode              |

# Run in development mode
npm run dev

# Or build and run in production mode
npm run build
npm start



