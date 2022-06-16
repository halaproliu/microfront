FROM node:latest as builder
WORKDIR /root-config
COPY package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
LABEL maintainer "luffybryant@gmail.com"
COPY ./dist/ /dist
COPY nginx.conf /etc/nginx
COPY --from=builder /app/dist  /usr/share/nginx/html
EXPOSE 80