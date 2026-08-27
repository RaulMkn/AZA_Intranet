FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_BASE_URL=/intranet/DentalAesthetics
ARG VITE_DATABASE_AUTH
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_DATABASE_AUTH=$VITE_DATABASE_AUTH

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/. /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]