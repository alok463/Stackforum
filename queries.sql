//query to retrieve all the comments from the database


SELECT username, post_id, user_id, comment_body, comment_created_at from user_comments
INNER JOIN user_posts  ON user_posts.id = user_comments.post_id
 INNER JOIN users ON users.id = user_comments.user_id where post_id=3;