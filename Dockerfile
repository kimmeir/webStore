FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build --prod
FROM nginx:alpine
COPY --from=build /app/dist/andrew-store/browser /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/nginx.conf
EXPOSE 4500:80
CMD ["nginx", "-g", "daemon off;"]
