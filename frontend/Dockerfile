FROM node:22-bookworm-slim

WORKDIR /app

# Ensure Rollup uses JS fallback, not native binary
ENV ROLLUP_SKIP_NODE_NATIVE=1

# Install dependencies based on package*.json
COPY package*.json ./
RUN npm install

# Copy source
COPY . /app

EXPOSE 5173

CMD ["npm","run","dev","--","--host"]
