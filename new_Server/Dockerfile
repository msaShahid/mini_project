# -------- Base Stage --------
FROM node:22-alpine AS base
WORKDIR /app

# Copy package files and install all dependencies (dev + prod)
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy source code
COPY . .

# -------- Build Stage --------
FROM base AS build
# Build TypeScript to JS (assumes you have tsconfig.json configured)
RUN npm run build

# -------- Production Stage --------
FROM node:22-alpine AS production
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --only=production --frozen-lockfile

# Copy built JS and uploads from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/uploads ./uploads

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["node", "dist/server.js"]
