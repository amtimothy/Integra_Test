# Stage 1
FROM node:16.19.1 as build-step
RUN mkdir -p /app_frontend
WORKDIR /app_frontend
COPY package.json /app_frontend
RUN npm install
COPY . /app_frontend/
RUN npm run build --prod

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app_frontend/dist/integra_app_frontend /usr/share/nginx/html