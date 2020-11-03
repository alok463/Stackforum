import pool from '../../databaseConfig/databaseConfig.js';
import responseHandler from '../utils/responseHandler.js';
import dotenv from 'dotenv';

dotenv.config()

const Comments = function(comment) {
     this.body = comment.body;
     this.question_id = comment.question_id;
     this.user_id = comment.user_id;

}

Comments.addComment = (newComment, result) => {
    const query = `INSERT INTO comments(body,question_id, user_id) VALUES(?,?,?);`;

    pool.query(
        query,
        [newComment.body, newComment.question_id, newComment.user_id ],
        (err,res) => {
            if (err) {
                console.log('error: ', err);
                result(
              responseHandler(false, err.code, err.message, null),
                    null
                );
                return;
            }
            result(
                null,
         responseHandler(true, 200, 'Comment Added', res.insertId)
            );
        });
};

Comments.deleteComment = (id, result) => {
    const query = ` DELETE FROM comments WHERE id = ?;`;

    pool.query(query,
        id,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(
                responseHandler(false, err.code, err.message, null),
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

Comments.getAllComments = (postId, result) => {
    let query = `SELECT comments.id, comments.body, username, comments.question_id, comments.user_id
    , comments.created_at as time from comments INNER JOIN users on users.id = comments.user_id
     INNER JOIN questions on questions.id = comments.question_id
    where comments.question_id = ?
    ORDER BY time desc;
    `;

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






export default Comments;