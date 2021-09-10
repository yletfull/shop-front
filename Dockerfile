FROM gitlab.ubic.tech:4567/docker/nginx:1.19-alpine

ENV NGINX_PORT=80
ENV NGINX_CLIENT_MAX_BODY_SIZE=1m
ENV NGINX_TIMEOUT=120s
ENV NGINX_BOT_HOST=ad-node:1337
ENV NGINX_CTOR_HOST=ctor:8080
ENV NGINX_CORE_HOST=php:9000
ENV NGINX_CORE_CGI_SCRIPT_FILENAME=/var/www/app/public/index.php

COPY dist /var/www/app
COPY nginx.conf /etc/nginx/templates/default.conf.template
