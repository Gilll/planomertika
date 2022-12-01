FROM node:16.13.1-alpine
WORKDIR /usr/app/front
EXPOSE 3000
COPY ./ ./
RUN npm install
RUN npm i serve -g
RUN npm run build
CMD ["serve", "-s", "build"]
