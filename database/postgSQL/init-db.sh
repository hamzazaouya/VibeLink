#!/bin/sh
set -e

# Wait for PostgreSQL to start
until pg_isready -U dbuser; do
    echo "Waiting for PostgreSQL to start..."
    sleep 2
done

# Create user and database
echo "Creating user and database..."
psql -U dbuser <<-EOSQL
    CREATE USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';
    CREATE DATABASE ${POSTGRES_DB} WITH OWNER ${POSTGRES_USER};
EOSQL

# docker exec -it bc6 psql -U admin -d profile

