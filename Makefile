NGINX_IMAGE=nginx:1.13-alpine
NODEJS_IMAGE=node:8.1.2

.PHONY: preview
preview:
	docker run -it \
		--rm \
		--volume $(shell pwd)/html:/usr/share/nginx/html \
		--publish 8000:80 \
		$(NGINX_IMAGE)
