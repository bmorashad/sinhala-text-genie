FROM node:16 as builder

WORKDIR /app

COPY . .
RUN yarn install
RUN yarn run build

RUN rm -rf node_modules

FROM nginx:stable-perl

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]