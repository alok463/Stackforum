import responseHandler from '../helpers/helper.js';
import pool from '../../databaseConfig/databaseConfig.js';

const Comment = function(comment) {
     this.comment_body = comment.comment_body;
     this.post_id = comment.post_id;
     this.user_id = comment.user_id;
}

Comment.create = (newComment, result) => {
    const query = `INSERT INTO user_comments(comment_body, post_id, user_id) VALUES(?,?,?)`;
    pool.query(query, [newComment.comment_body, newComment.post_id, newComment.user_id], (err, res)=>{
          if(err) {
              console.log(`error`, err);
              result(responseHandler(false, err.code, err.message, null), null);
              return;
          }
          // no errors then return results with data
          result(null, responseHandler(true, 200, 'Comment Removed', null))
    })
}

//Comment retrieve