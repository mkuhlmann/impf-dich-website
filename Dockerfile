FROM oven/bun:1.0.7 AS build
WORKDIR /app
COPY package*.json ./
COPY bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM nginx:alpine AS runtime
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html