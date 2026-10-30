FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
ARG VITE_API_URL=
ARG VITE_STORE_NAME="Zuri Market"
ENV VITE_API_URL=$VITE_API_URL VITE_STORE_NAME=$VITE_STORE_NAME
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine
# The base image can lag behind Alpine security fixes; patch at build time.
USER root
RUN apk upgrade --no-cache
USER 101
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080