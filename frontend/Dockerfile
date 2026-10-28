FROM node:25-bookworm-slim

WORKDIR /app

# Ensure Rollup uses JS fallback, not native binary
ENV ROLLUP_SKIP_NODE_NATIVE=1

# Install dependencies based on package*.json
COPY package*.json ./

# Copy source
COPY . /app

EXPOSE 3000

# Install and run
CMD ["sh", "-c", "npm install && npm run dev"]
