# Set the base image to Ubuntu
FROM ubuntu:16.04

# File Author / Maintainer
MAINTAINER Neo He

# Install Nginx

# Add application repository URL to the default sources
# RUN echo "deb http://archive.ubuntu.com/ubuntu/ raring main universe" >> /etc/apt/sources.list

# Update the repository
RUN apt-get update

# Install necessary tools
RUN apt-get install -y nano wget dialog net-tools

# Download and Install Nginx
RUN apt-get install -y nginx  

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
ADD nginx.conf /etc/nginx/
ADD nginx-mime.types /etc/nginx/
# Append "daemon off;" to the configuration file
# Added in config file
# RUN echo "daemon off;" >> /etc/nginx/nginx.conf

#Copy node_dice client to server
RUN mkdir /usr/www
#ADD dist /usr/www/
# Expose ports
EXPOSE 80

# Set the default command to execute when creating a new container
CMD service nginx start