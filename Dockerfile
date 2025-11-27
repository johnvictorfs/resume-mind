### Dependencies
FROM oven/bun:1 AS deps
WORKDIR /app

# Root manifests
COPY package.json bun.lock ./

# Copy all packages so Bun can resolve workspace deps
# (including packages/web and any other packages/*)
COPY packages ./packages

# Install all deps (for all packages)
RUN bun install --frozen-lockfile

### Builder
FROM oven/bun:1 AS builder
WORKDIR /app

# Reuse installed deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/bun.lock ./bun.lock
COPY --from=deps /app/packages ./packages

# If you have other files at root (tsconfig.json, etc.) copy them too:
COPY . .

WORKDIR /app/packages/web

# Build Next app
RUN bun run build

### Runner
FROM node:22-alpine AS runner

# We'll run Next from inside packages/web
WORKDIR /app/packages/web

ENV NODE_ENV=production
ENV PORT=3000

# Copy all packages (web + shared packages/*)
COPY --from=builder /app/packages /app/packages

# Root node_modules (installed by Bun but Node-compatible)
COPY --from=deps /app/node_modules /app/node_modules

EXPOSE 3000

# Important: Next binary lives in /app/node_modules, one level up
CMD ["node", "/app/node_modules/next/dist/bin/next", "start", "-p", "3000"]
