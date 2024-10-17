-- Creación de la tabla roles
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

-- Creación de la tabla users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Creación de la tabla tasks
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
