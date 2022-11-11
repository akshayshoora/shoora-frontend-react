FROM node:14.17.0 AS node
RUN mkdir /home/app
COPY . /home/app/
WORKDIR /home/app/
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_END_USER_APP_BASE_URL
ARG REACT_APP_CLIENT_ID

RUN npm install 
RUN npm run build


FROM nginx:latest
RUN apt-get update && apt-get install gettext-base -y
COPY --from=node /home/app/build /var/www/html
WORKDIR /var/www/html
COPY --from=node /home/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
 
