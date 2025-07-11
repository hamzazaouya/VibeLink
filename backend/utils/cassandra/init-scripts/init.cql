-- Create the swap keyspace
CREATE KEYSPACE IF NOT EXISTS swap 
WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1 };

-- Use the swap keyspace
USE swap;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    reacting_user_id UUID,
    suggested_user_id UUID,
    reaction BOOLEAN,
    created_at TIMESTAMP
);
