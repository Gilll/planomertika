FROM node:16.13.1-alpine
WORKDIR /usr/app/front
EXPOSE 80
COPY ./ ./
RUN npm install
RUN npm i serve -g
RUN npm run build
CMD ["serve", "-l", "80", "-s", "build"]
