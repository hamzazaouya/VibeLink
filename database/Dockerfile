# Use the official PostGIS image instead of plain PostgreSQL
FROM postgis/postgis:latest

# Copy the SQL script to the Docker image
COPY sql/init.sql /docker-entrypoint-initdb.d/
