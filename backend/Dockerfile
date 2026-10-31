FROM node:22-alpine
ENV NODE_ENV=production
ENV PORT=5000
WORKDIR /app
COPY package*.json ./
# npm, npx, corepack and Yarn are only needed to install dependencies, not to run
# the app, and they bring their own vulnerable packages. Alpine packages are patched.
RUN npm ci --omit=dev --ignore-scripts \
 && npm cache clean --force \
 && rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/npx \
           /usr/local/bin/corepack /usr/local/bin/yarn /usr/local/bin/yarnpkg /opt/yarn-* \
 && apk upgrade --no-cache
COPY server.js ./
COPY data ./data
USER node
EXPOSE 5000
CMD ["node", "server.js"]