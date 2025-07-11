# Use the official Cassandra image
FROM cassandra:latest

# Copy initialization scripts into the container
COPY init-scripts /docker-entrypoint-initdb.d/

# Expose the default CQL port
EXPOSE 9042

# Run Cassandra in the foreground
CMD ["cassandra", "-f"]
