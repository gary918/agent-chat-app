# Use the official Node.js 20 image.
FROM node:20-slim

# Set the working directory.
WORKDIR /app

# Install pnpm.
RUN npm install -g pnpm

# Copy the package.json, pnpm-lock.yaml, and pnpm-workspace.yaml files.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy the rest of the source code.
COPY . .

# Install dependencies.
RUN pnpm install

# Build the application.
RUN pnpm build --filter=web

# Expose the port the app runs on.
EXPOSE 3000

# Set the command to start the app.
CMD ["pnpm", "dev", "--filter=web", "--", "-p", "$PORT"]
