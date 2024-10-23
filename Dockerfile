ARG NODE_VERSION=18.18.2
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

# Stage 1: Install dependencies
FROM base as deps
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM deps as build
COPY . .
RUN pnpm run build

# Stage 3: Prepare the final image
FROM base as final

ENV NODE_ENV production
ENV ORIGIN https://image-compressor-mheh.onrender.com

# Install pnpm for the final stage
RUN npm install -g pnpm

# Copy necessary files and directories from previous stages
COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/server ./server

# Change to a non-root user
USER node

EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "serve"]