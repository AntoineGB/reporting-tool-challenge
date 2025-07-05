# The 'slim' variant is used to keep the image size smaller.
FROM python:3.9-slim

# 2. Set the working directory within the container.
# This is where the application code will reside.
WORKDIR /app

# 3. Install system dependencies that might be needed by Python packages.
# This is a good practice, though not strictly necessary for this set of packages.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 4. Copy the dependencies file first to leverage Docker's layer caching.
# The dependencies will only be re-installed if this file changes.
COPY ./requirements.txt .

# 5. Install the Python dependencies.
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy the rest of the application code into the container.
COPY . .

# 7. Expose the port the app runs on.
# FastAPI will be served by Uvicorn on port 8000.
EXPOSE 8000

# 8. Define the command to run the application.
# --host 0.0.0.0 makes the server accessible from outside the container.
# --reload enables hot-reloading for development convenience.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]