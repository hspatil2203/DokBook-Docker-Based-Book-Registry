# Use the official Nginx image as the base
FROM nginx:latest

# Copy your HTML, CSS, and JS files into the container
COPY . /usr/share/nginx/html

# Expose port 80 to allow access to the container
EXPOSE 80
