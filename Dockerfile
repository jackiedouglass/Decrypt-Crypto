FROM node:10.1
WORKDIR /app
COPY . /app
RUN yarn

EXPOSE 3000
CMD ["yarn", "start"]