FROM node:22-alpine
ENV NODE_ENV=production
ENV PORT=5000
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY . .
USER node
EXPOSE 5000
CMD ["node", "server.js"]