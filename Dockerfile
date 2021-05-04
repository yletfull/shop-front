FROM gitlab.ubic.tech:4567/docker/nginx:1.19-alpine
COPY dist /var/www/app
COPY nginx.conf /etc/nginx/templates/default.conf.template
