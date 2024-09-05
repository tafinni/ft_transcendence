FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install i18next i18next-http-backend
CMD ["npm", "run", "dev"]