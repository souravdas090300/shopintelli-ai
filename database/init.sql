-- Create database if not exists
CREATE DATABASE IF NOT EXISTS shopintelli CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE shopintelli;

-- Create user if not exists and grant privileges
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON shopintelli.* TO 'user'@'%';
FLUSH PRIVILEGES;
