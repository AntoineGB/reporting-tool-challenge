# Providing convenient commands for managing my Dockerized backend.

# ease of maintenance.
IMAGE_NAME := reporting-tool-api
CONTAINER_NAME := reporting-tool-api-container

# Use .PHONY to ensure these commands run even if files with the same name exist.
.PHONY: build run stop logs shell help

# Default command executed when 'make' is run without arguments.
default: help

# Builds the Docker image from the Dockerfile in the current directory.
build:
	@echo "Building Docker image: $(IMAGE_NAME)..."
	@docker build -t $(IMAGE_NAME) .

# Runs the Docker container in detached mode, mapping port 8000.
# It also mounts the current directory into the container for live-reloading.
run:
	@echo "Starting container '$(CONTAINER_NAME)' on port 8000..."
	@docker run --name $(CONTAINER_NAME) -p 8000:8000 -v $(CURDIR):/app -d $(IMAGE_NAME)

# Stops and removes the running container. The '|| true' prevents errors
# if the container doesn't exist.
stop:
	@echo "Stopping and removing container: $(CONTAINER_NAME)..."
	@docker stop $(CONTAINER_NAME) || true
	@docker rm $(CONTAINER_NAME) || true

# Tails the logs of the running container.
logs:
	@echo "Following logs for $(CONTAINER_NAME)... (Press Ctrl+C to stop)"
	@docker logs -f $(CONTAINER_NAME)

# Opens an interactive shell inside the running container for debugging.
shell:
	@echo "Opening shell in $(CONTAINER_NAME)..."
	@docker exec -it $(CONTAINER_NAME) /bin/bash

# Displays a helpful list of available commands.
help:
	@echo "Available commands:"
	@echo "  make build   - Builds the Docker image."
	@echo "  make run     - Starts the application container with live-reloading."
	@echo "  make stop    - Stops and removes the application container."
	@echo "  make logs    - Tails the logs of the running container."
	@echo "  make shell   - Opens an interactive shell in the container."
