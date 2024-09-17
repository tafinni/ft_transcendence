FROM node:20-alpine
RUN mkdir -p ./src/dist/languages
WORKDIR /app
COPY . .

#node_modules install method 1 - uses LOT of space! DO NOT USE
#RUN yarn install --frozen-lockfile --non-interactive
#RUN yarn cache clean

#better node_modules install method, requires package-lock.json !!
RUN npm ci

#supposedly better node_modules, wasn't DO NOT USE
#RUN yarn install --immutable --immutable-cache --check-cache

RUN apk add xdg-utils

#RUN yarn add vite-plugin-static-copy --dev

#CMD ["tail", "-f", "/dev/null"]
#testing only
#RUN yarn run build
CMD ["npm", "run", "dev"]

#for actual https
#CMD ["yarn", "run", "build"]
