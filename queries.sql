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
 GROUP BY tags.id ORDER BY Post_Count DESC;

 //Retreive Users QUERY ONE

 SELECT users.id
   , username, users.created_at, COUNT(DISTINCT user_posts.id)
as posts_count, COUNT(DISTINCT tagname) as tags_count
 FROM users
 LEFT JOIN user_posts ON user_posts.users_id
 LEFT JOIN post_tag ON post_tag.post_id = user_posts.id
 LEFT JOIN tags ON post_tag.tag_id = tags.id
 GROUP BY users.id ORDER BY posts_count DESC;



//QUERY 2

SELECT users.id, username, users.created_at, COUNT(DISTINCT user_posts.id)
as post_count,COUNT(DISTINCT tagname) 
                as tag_count, COUNT(DISTINCT user_answers.id) 
                as answer_count, COUNT(DISTINCT user_comments.id) 
                as comment_count 
               FROM users
 LEFT JOIN user_posts ON user_posts.users_id
 LEFT JOIN post_tag ON post_tag.post_id = user_posts.id
 LEFT JOIN tags ON post_tag.tag_id = tags.id
              
              
               LEFT JOIN user_answers ON user_answers.user_id = users.id 
                LEFT JOIN user_comments ON user_comments.user_id = users.id 
                WHERE users.id = 4 GROUP BY users.id;`



