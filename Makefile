NODE_IMAGE = vite-node-app:1.0
NODE_CONTAINER = frontend

up:
	clear && \
	docker compose up -d

down:
	clear && \
	docker compose down

bash:
	docker exec -it ${NODE_CONTAINER} /bin/sh

build-image:
	docker build -f .docker/node/Dockerfile -t ${NODE_IMAGE} .

update:
	docker exec -it ${NODE_CONTAINER} /bin/sh -c "npm i"

network:
	docker network create vite

install:
	make network && \
	make build-image && \
	docker run -it -v ./app:/app ${NODE_IMAGE} /bin/sh -c "npx create-vite . && npm i" && \
	sudo chmod -R 777 . && \
	mv ./app/* . && \
	mv ./app/.eslintrc.cjs . && \
	mv ./app/.gitignore . && \
	rm -rf ./app && \
	docker container prune -f && \
	docker compose up -d