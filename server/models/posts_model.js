import responseHandler from '../helpers/helper.js';
import pool from '../../databaseConfig/databaseConfig.js';


//Post creation
const Posts = (post) => {
     this.title = post.title;
     this.post_body = post.post_body;
     this.users_id = post.users_id;
     this.tagname = post.tagname;
}

Posts.create = (newPost, result) => {
     const query = `INSERT INTO user_posts(title, post_body, users_id) VALUES (?,?,?); 
     SET @KEY1 :=  (SELECT LAST_INSERT_ID());
     INSERT IGNORE INTO tags(tagname) VALUES(?);
     SET @KEY2: = (SELECT id from tags WHERE tagname = ?);
     INSERT INTO post_tag(post_id, tag_id) VALUES(@KEY1, @KEY2);`;

     pool.query(query, [newPost.title, newPost.post_body, newPost.users_id, newPost.tagname, newPost.tagname], (err, res)=> {
          if(err){
              console.log(`error`,  err)
              result(responseHandler(false, err.code, err.message, null), null);
              return;
          }
          result(null, responseHandler(true,200, 'Post Created', res.insertId));

     });
};

//Removing a post
Posts.delete = (id, result) => {
     const query = `DELETE FROM post_tag where  post_id = ?;
      DELETE FROM user_comments where post_id = ?;
      DELETE FROM user_answers where user_post_id = ?;
      DELETE FROM user_posts where id = ?; 
     `;

    pool.query(query, [id, id, id, id], (err, res) =>{
         if(err) {
             console.log(`error`, err);
             result(responseHandler(false, err.code, err.message, null), null);
             return;
         }

         result(null, responseHandler(true,200, 'User Post deleted', null));

    });

}

//Retrieve a single posts

Posts.retreiveOne = (postId, result) => {
    const query = ` SELECT 
    user_posts.id, user_posts.users_id,tag_id,COUNT(DISTINCT user_answers.id) 
    as answer_count,COUNT(DISTINCT user_comments.id) 
    as comment_count,
    COUNT(DISTINCT tag_id) as TagCount,
    username,title,user_posts.post_body
    as post_body,tagname,user_posts.post_created_at 
    FROM user_posts 
    JOIN post_tag ON user_posts.id = post_id 
    JOIN tags ON tag_id = tags.id 
    JOIN users ON user_posts.users_id = users.id 
    LEFT JOIN user_answers ON user_answers.user_post_id = user_posts.id 
    LEFT JOIN user_comments ON user_posts.id = user_comments.post_id 
    WHERE user_posts.id = ?;`;


    pool.query(query,
        postId,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                  responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There isn\'t any post by this id', null),
                    null
                );
                return;
            }
            result(
                null,
              responseHandler(true, 200, 'Success', results[0])
            );
        });


}



Posts.retrieveAll = ({action, tagName}, result) => {
   let query = '';
   let base = `select user_posts.id,
   username, COUNT(DISTINCT user_answers.id) as answersCount,
   COUNT(DISTINCT user_comments.id) as userComments,
   tag_id, title, user_posts.post_body,
   tagname, user_posts.post_created_at from user_posts
   JOIN post_tag ON post_id = user_posts.id
   JOIN tags ON tag_id = tags.id
   JOIN users ON users_id = users.id
   LEFT JOIN user_answers ON user_answers.user_post_id = user_posts.id
   LEFT JOIN user_comments ON user_posts.id = user_comments.post_id`

   if(action === 'basic') {
       query =  'GROUP BY user_posts.id ORDER BY user_posts. post_created_at DESC;' ;  
   } else if(action === 'top') {
       query =  '  GROUP BY user_posts.id ORDER BY answersCount DESC,userComments DESC;';
   } else if(action === 'tag') {
       query = 'WHERE tags.tagname = ? GROUP BY user_posts.id ORDER BY post_created_at DESC;';
   } else {
        result(responseHandler(false, 400, 'Incorrect Action', null), null);
        return;
   };
   
   pool.query(base + query , tagName ? tagName :null , (err,results) => {
    if (err || results.length === 0) {
        console.log('error: ', err);
        result(
        responseHandler(false, err ? err.code : 404, err ? err.message : 'There are no posts', null),
            null
        );
        return;
    }
    result(
        null,
         responseHandler(true, 200, 'Success', results)
    );



   })

   



}







export default Posts;