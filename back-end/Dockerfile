FROM node

WORKDIR /src/usr/

COPY . .

EXPOSE 5000
RUN rm -rf node_modules
RUN rm -f package-lock.json
RUN npm i -y
RUN npm run build

CMD ["npm", "start"]