# FROM node:lts-bullseye as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm i

# COPY . .
# RUN npm run build --configuration=production
# # You, 3 hours ago feat: 4 react app docker and inject env
# ### Stage 2

# FROM nginx:alpine
# ADD ./config/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /var/www/app/
# EXPOSE 80
# CMD ["nginx","-g", "daemon off;"]

FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --configuration=production


#stage 2
FROM nginx:1.17.1-alpine

COPY --from=build /app/dist/helpdesk /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80