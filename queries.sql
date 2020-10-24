//query to retrieve all the comments from the database


SELECT username, post_id, user_id, comment_body, comment_created_at from user_comments
INNER JOIN user_posts  ON user_posts.id = user_comments.post_id
 INNER JOIN users ON users.id = user_comments.user_id where post_id=3;


 //query to delete all comments
 DELETE from user_comments where id=1;


 //Get all the tags of the posts

 SELECT tags.id, user_posts.id, tagname, COUNT(DISTINCT user_posts.id) as Post_Count , tags.created_at FROM tags 
 LEFT JOIN post_tag ON post_tag.tag_id = tags.id
 LEFT JOIN user_posts ON  user_posts.id = post_tag.post_id
 GROUP BY tags.id ORDER BY Post_Count DESC;`