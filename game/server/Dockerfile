FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g nodemon
#CMD ["npm", "run", "dev"]
CMD ["nodemon", "src/index.js"]
