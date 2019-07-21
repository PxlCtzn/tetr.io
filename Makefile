# Specify APP NAME
APP_NAME=tetr.io

build: ## Build the container and tag it
	docker build -t $(whoami)/$(APP_NAME) .

build-nc: ## Build the container without caching and tag it 
	docker build --no-cache -t $(whoami)/$(APP_NAME) .

daemon: ## Build the container without caching and tag it 
	docker run -d --name $(APP_NAME) $(whoami)/$(APP_NAME)

tty:
	docker run -it --name $(APP_NAME) $(whoami)/$(APP_NAME)

stop: ## Stop and remove a running container
	docker stop $(APP_NAME); docker rm $(APP_NAME)