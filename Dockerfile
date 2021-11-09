FROM node:16

# Create app directory
WORKDIR /var/www/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY app.js ./
COPY models ./

RUN npm install -g yarn forever --force && \
  yarn install --production --force
# If you are building your code for production
# RUN npm ci --only=production

USER node
EXPOSE 3001

CMD [ "node", "app.js" ]