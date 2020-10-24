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

//Comments retrieve

Comment.RetrieveAllComments = (postId, result) => {
     let query = `
     SELECT username, post_id, user_id, comment_body, comment_created_at from user_comments
     INNER JOIN user_posts  ON user_posts.id = user_comments.post_id
      INNER JOIN users ON users.id = user_comments.user_id where post_id=?; `;

      pool.query(query,
        postId,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                   responseHandler(false, err ? err.code : 404, err ? err.message : 'There are no comments', null),
                    null
                );
                return;
            }
            result(
                null,
            responseHandler(true, 200, 'Success', results)
            );
        });
}


//Delete all the comments


Comment.remove = (id, result) => {
    const query = ` DELETE FROM comments WHERE id = ?;`;

    pool.query(query,
        id,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(
                 responseHandler(false, err.statusCode, err.message, null),
                    null
                );
                return;
            }
            result(
                null,
               responseHandler(true, 200, 'Comment Removed', null)
            );
        });
}




export default Comment;