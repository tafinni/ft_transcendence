FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
# CMD ["npm", "run", "dev"]
CMD ["sh", "-c", "npm run dev & node js/pong_server.js"]
