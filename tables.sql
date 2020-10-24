CREATE TABLE users(
 id INT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(255) UNIQUE NOT NULL,
 gravatar VARCHAR(255),
 created_at TIMESTAMP DEFAULT NOW());

CREATE TABLE user_posts(
id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(255),
 post_body LONGTEXT,
 post_created_at TIMESTAMP DEFAULT NOW(),
users_id INT NOT NULL,
FOREIGN KEY(users_id) REFERENCES users(id))

CREATE TABLE user_answers(
     id INT AUTO_INCREMENT PRIMARY KEY,
     body LONGTEXT,
     answer_created_at TIMESTAMP DEFAULT NOW(),
     user_post_id INT NOT NULL,
     FOREIGN KEY(user_post_id) REFERENCES user_posts(id),
     user_id INT NOT NULL,
     FOREIGN KEY(user_id) REFERENCES users(id));



    
Create TABLE user_comments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_body LONGTEXT,
comment_created_at TIMESTAMP DEFAULT NOW(),
 post_id INT NOT NULL,
 FOREIGN KEY(post_id) REFERENCES user_posts(id),
user_id INT NOT NULL,
 FOREIGN KEY(user_id) REFERENCES users(id));


 CREATE TABLE tags(
id INT AUTO_INCREMENT PRIMARY KEY,
 tagname VARCHAR(255) UNIQUE,
 created_at TIMESTAMP DEFAULT NOW());

 CREATE TABLE post_tag(
 post_id INT NOT NULL,
FOREIGN KEY(post_id) REFERENCES user_posts(id),
 tag_id INT NOT NULL,
FOREIGN KEY (tag_id) REFERENCES tags(id),
 created_at TIMESTAMP DEFAULT NOW(),
PRIMARY KEY(post_id, tag_id));


