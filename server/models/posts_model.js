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






export default Posts;