# ===============================
# Stage 1: Install dependencies
# ===============================

ARG NODE_VERSION=24

FROM node:${NODE_VERSION} AS dependencies

# Set working directory
WORKDIR /client

# Copy package related files to leverage Docker's caching mechanism
COPY ./client/package*.json .

# Install project dependencies w/ frozen lockfile
RUN npm ci --no-audit --no-fund;

# ===
# Stage 2: Build client application
# ===

FROM node:${NODE_VERSION} AS runner

# Set working directory
WORKDIR /client

# Copy application dependencies from dependencies stage
COPY --from=dependencies /client/node_modules ./node_modules

# Copy application source code
COPY ./client .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port 3000 to allow HTTP traffic
EXPOSE ${PORT}

# Run application
CMD ["npm", "run", "dev"]



