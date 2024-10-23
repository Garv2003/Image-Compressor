ARG NODE_VERSION=18.18.2 
FROM node:${NODE_VERSION}-alpine as base 
WORKDIR /usr/src/app 
FROM base as deps
RUN npm install -g pnpm
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/usr/src/app/.pnpm \
    pnpm install --frozen-lockfile

FROM deps as build 
COPY . . 
RUN ["pnpm", "run", "build"]

FROM base as final
ENV NODE_ENV production
ENV ORIGIN https://image-compressor-mheh.onrender.com

USER node
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/server ./server
EXPOSE 3000
CMD ["pnpm","run","serve"]

