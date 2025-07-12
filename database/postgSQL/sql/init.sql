-- sql/init.sql

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE gender_enum AS ENUM ('male', 'female');
CREATE TYPE signup_method_enum AS ENUM ('email', 'discord', 'google');


CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    user_name VARCHAR(20) UNIQUE,
    first_name VARCHAR (20),
    last_name VARCHAR (20),
    age INT CHECK (age >= 0),
    phone VARCHAR(15) UNIQUE,
    gender gender_enum,
    bio VARCHAR(1000),
    email VARCHAR(50) UNIQUE,
    password_hash CHAR(60),
    signup_method signup_method_enum,
    discord_id VARCHAR(30) UNIQUE,
    google_id  VARCHAR(30) UNIQUE,
    location GEOGRAPHY(Point, 4326),
    rating FLOAT DEFAULT 0.0,
    is_online BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_registred BOOLEAN DEFAULT FALSE,
    last_connection TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_age ON users (age);
CREATE INDEX idx_gender ON users (gender);
CREATE INDEX idx_location ON users USING GIST (location);

CREATE TABLE picture (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    picture_path VARCHAR(100) UNIQUE,
    is_profile_picture BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE interests (
    id UUID PRIMARY KEY,
    interest VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE user_interest (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    interest_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

CREATE TABLE matches (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    match_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (match_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    notified_id UUID NOT NULL,
    notification VARCHAR(30),
    is_seen BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (notified_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE rating (
    id UUID PRIMARY KEY,
    user_rater_id UUID NOT NULL,
    user_rating_id UUID NOT NULL,
    rating INT,
    feedback VARCHAR(100),
    FOREIGN KEY (user_rater_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_rating_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO interests (id, interest) VALUES
('0f9c500a-19b0-4767-a951-152df5672b26', 'quran'),
('b1cfdd40-2bd7-4221-ade9-7e29e5782381', 'workout'),
('ea7177f6-19ef-4acc-a599-b29016de14b4', 'soccer'),
('837f8584-f2b1-4cb0-a26b-0f8232a319a1', 'basketball'),
('bfa335d2-f3a3-46ad-9ec9-2b408c3d9903', 'swimming'),
('72903c76-ed27-4403-835b-efdbbc51c02e', 'chess'),
('60d2ef54-95fb-4546-bca5-94726aae53a2', 'photography'),
('7c8c5baa-1daf-4ee9-ad98-92791ba333ba', 'coffee'),
('f086fe59-52a1-4715-86ac-933cb19c75be', 'coding'),
('d6b5cc7f-3816-4b77-9d07-e3ab7eb072ad', 'motorcycling'),
('308ed379-d5b7-4286-bd14-c3a0d0853d6d', 'camping'),
('6e4c3706-613f-47b6-81ce-eaab2d4a0ac7', 'blogging'),
('0f07dd8a-1af9-4087-ab57-7d6ed09ead29', 'bitcoin'),
('314b4e51-917d-4c00-b894-71b44d35aae2', 'dj'),
('6cdc123e-237c-43b2-ab86-97bbbfedf4c7', 'gaming'),
('66e3598f-6574-4bb3-ae30-f9010bfd3c0d', 'drawing'),
('a2b8dc58-a4ea-4512-9745-bd58d00c51b5', 'music'),
('f644512d-48f6-459f-ab6e-3c43212735de', 'netflex'),
('199b567b-b4ce-439c-8c52-dd0fa5b8e5a5', 'cooking'),
('f9e025fc-a979-4cd5-9b93-c42d042ab8ec', 'podcasting'),
('6080386d-ce03-4fb7-861e-ef58941b02e0', 'fishing'),
('89fed2ec-4a20-4108-9716-e26617ab4039', 'investing');


-- Insert static data into the users table
INSERT INTO users (
    id, user_name, first_name, last_name, age, phone, gender, bio, email, password_hash, signup_method, discord_id, google_id, location, rating, is_online, is_verified, is_registred, last_connection, created_at
) VALUES
    ('e9e107e7-d027-4843-9cdf-0d384a734a78', 'johndoe', 'John', 'Doe', 32, '1234567890', 'male', 'Just a simple bio.', 'johndoe@example.com', '$2y$12$abcdefghijklmnopqrstuvwx', 'google', NULL, 'google-123456', 'POINT(-7.930904 32.224707)', 5, TRUE, TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('6aff9ce4-f129-46e8-9fa0-82ed41d3b298', 'janedoe', 'Jane', 'Doe', 25, '0987654321', 'female', 'Avid traveler and reader.', 'janedoe@example.com', '$2y$12$mnopqrstuvwxyzabcdef', 'discord', 'discord-987654', NULL, 'POINT(-7.925096 32.223727)', 4.3, FALSE, TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('f60d2802-e798-4dbc-9387-a2b736373361', 'alexasmith', 'Alexa', 'Smith', 28, '5551234567', 'female', 'Tech enthusiast and gamer.', 'alexsmith@example.com', '$2y$12$ghijklmnopqrstuvwxyza', 'email', NULL, NULL, 'POINT(-7.920423 32.222876)', 4.5, FALSE, TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('82b39072-2f81-4e04-a130-d1e3bf0666a0', 'emilybrown', 'Emily', 'Brown', 34, '2223334444', 'female', 'Nature lover and photographer.', 'emilybrown@example.com', '$2y$12$abcdefghijklmopqrstuvwxy', 'google', NULL, 'google-654321', 'POINT(-7.914680 32.221872)', 2.2, TRUE, TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('85412c7c-8322-47e2-8efc-b73f61fc28fa', 'morajohnson', 'mara', 'Johnson', 32, '4445556666', 'female', 'Fitness enthusiast and blogger.', 'michaeljohnson@example.com', '$2y$12$abcdefghijklmnopqrstuabc', 'discord', 'discord-456789', NULL, 'POINT(-7.909546 32.220976)', 4.1, FALSE, TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO picture (id, user_id, picture_path, is_profile_picture) VALUES
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78' ,'/uploads/user1/profile.jpg', true),
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78' ,'/uploads/user1/image1.jpg', false),
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78' ,'/uploads/user1/image2.jpg', false),

    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298','/uploads/user2/profile.jpg', true),
    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298','/uploads/user2/image1.jpg', false),
    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298','/uploads/user2/image2.jpg', false),

    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361','/uploads/user3/profile.jpg', true),
    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361','/uploads/user3/image1.jpg', false),
    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361','/uploads/user3/image2.jpg', false),

    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0','/uploads/user4/profile.jpg', true),
    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0','/uploads/user4/image1.jpg', false),
    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0','/uploads/user4/image2.jpg', false),

    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa','/uploads/user5/profile.jpg', true),
    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa','/uploads/user5/image1.jpg', false),
    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa','/uploads/user5/image2.jpg', false);

INSERT INTO user_interest(id, user_id, interest_id) VALUES
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78', '0f9c500a-19b0-4767-a951-152df5672b26'),
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78', 'b1cfdd40-2bd7-4221-ade9-7e29e5782381'),
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78', 'ea7177f6-19ef-4acc-a599-b29016de14b4'),
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78', '837f8584-f2b1-4cb0-a26b-0f8232a319a1'),
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78', 'bfa335d2-f3a3-46ad-9ec9-2b408c3d9903'),
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78', '72903c76-ed27-4403-835b-efdbbc51c02e'),
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78', '60d2ef54-95fb-4546-bca5-94726aae53a2'),
    
    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298', '0f9c500a-19b0-4767-a951-152df5672b26'),
    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298', 'b1cfdd40-2bd7-4221-ade9-7e29e5782381'),
    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298', '66e3598f-6574-4bb3-ae30-f9010bfd3c0d'),
    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298', 'd6b5cc7f-3816-4b77-9d07-e3ab7eb072ad'),
    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298', '314b4e51-917d-4c00-b894-71b44d35aae2'),
    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298', '7c8c5baa-1daf-4ee9-ad98-92791ba333ba'),
    (uuid_generate_v4(), '6aff9ce4-f129-46e8-9fa0-82ed41d3b298', 'f086fe59-52a1-4715-86ac-933cb19c75be'),

    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361', '0f9c500a-19b0-4767-a951-152df5672b26'),
    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361', 'b1cfdd40-2bd7-4221-ade9-7e29e5782381'),
    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361', 'ea7177f6-19ef-4acc-a599-b29016de14b4'),
    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361', '837f8584-f2b1-4cb0-a26b-0f8232a319a1'),
    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361', 'bfa335d2-f3a3-46ad-9ec9-2b408c3d9903'),
    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361', '72903c76-ed27-4403-835b-efdbbc51c02e'),
    (uuid_generate_v4(), 'f60d2802-e798-4dbc-9387-a2b736373361', 'f086fe59-52a1-4715-86ac-933cb19c75be'),

    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0', '6080386d-ce03-4fb7-861e-ef58941b02e0'),
    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0', '314b4e51-917d-4c00-b894-71b44d35aae2'),
    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0', '6e4c3706-613f-47b6-81ce-eaab2d4a0ac7'),
    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0', '66e3598f-6574-4bb3-ae30-f9010bfd3c0d'),
    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0', 'd6b5cc7f-3816-4b77-9d07-e3ab7eb072ad'),
    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0', '7c8c5baa-1daf-4ee9-ad98-92791ba333ba'),
    (uuid_generate_v4(), '82b39072-2f81-4e04-a130-d1e3bf0666a0', 'f086fe59-52a1-4715-86ac-933cb19c75be'),

    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa', '0f9c500a-19b0-4767-a951-152df5672b26'),
    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa', 'b1cfdd40-2bd7-4221-ade9-7e29e5782381'),
    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa', 'ea7177f6-19ef-4acc-a599-b29016de14b4'),
    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa', '837f8584-f2b1-4cb0-a26b-0f8232a319a1'),
    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa', 'bfa335d2-f3a3-46ad-9ec9-2b408c3d9903'),
    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa', '72903c76-ed27-4403-835b-efdbbc51c02e'),
    (uuid_generate_v4(), '85412c7c-8322-47e2-8efc-b73f61fc28fa', 'f086fe59-52a1-4715-86ac-933cb19c75be');

INSERT INTO matches (id, user_id, match_id) VALUES
    (uuid_generate_v4(), 'e9e107e7-d027-4843-9cdf-0d384a734a78', 'f60d2802-e798-4dbc-9387-a2b736373361');