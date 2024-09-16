# Nginx Dockerfile
FROM nginx:alpine

# Copy Nginx configuration (optional, if you need to customize)
COPY nginx.conf /etc/nginx/conf.d/

RUN apk update && apk add --no-cache openssl

RUN openssl req -x509 -nodes -sha256 -days 365 -newkey rsa:4096 \
	-out /etc/ssl/certs/nginx.crt \
	-keyout /etc/ssl/private/nginx.key \
	-subj "/C=FI/ST=Helsinki/L=Helsinki/O=ft_transcendence/OU=ft_transcendence/CN=ft_transcendence/"


# Expose port 80 to the host
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
