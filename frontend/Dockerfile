FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install i18next i18next-http-backend
RUN apk update && apk add xdg-utils
CMD ["npm", "run", "dev"]