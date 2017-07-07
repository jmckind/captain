NGINX_IMAGE=nginx:1.13-alpine
APP_NAME=captain

.PHONY: preview
preview:
	docker run -it \
		--rm \
		--name $(APP_NAME)-preview \
		--volume $(shell pwd)/html:/usr/share/nginx/html \
		--publish 8000:80 \
		$(NGINX_IMAGE)

.PHONY: image
image:
	docker build -t $(APP_NAME):latest .
