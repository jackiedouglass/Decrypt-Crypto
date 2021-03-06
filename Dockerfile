FROM node:10.1
WORKDIR /app
COPY . /app
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]