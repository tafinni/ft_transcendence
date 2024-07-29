# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the static files
COPY ./ /app/

# Expose the port the server runs on
EXPOSE 8000

# Command to run the HTTP server
CMD ["python", "-m", "http.server", "3000"]