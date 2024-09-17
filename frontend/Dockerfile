FROM node:20-alpine
FROM node:20-alpine

RUN mkdir -p ./src/dist/languages
RUN mkdir -p ./src/dist/languages

WORKDIR /app
COPY . .
RUN yarn
RUN yarn add i18next i18next-http-backend gsap
RUN apk update && apk add xdg-utils

RUN yarn add vite-plugin-static-copy --dev


#testing only
#RUN yarn run build
CMD ["yarn", "run", "dev"]

#for actual https
#CMD ["yarn", "run", "build"]
