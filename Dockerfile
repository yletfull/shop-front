FROM gitlab.ubic.tech:4567/docker/nginx:1.19-alpine

ENV NGINX_API_URI=back:8080
ENV NGINX_PORT=80
ENV NGINX_CLIENT_MAX_BODY_SIZE=1m

COPY dist /var/www/app
COPY nginx.conf /etc/nginx/templates/default.conf.template
