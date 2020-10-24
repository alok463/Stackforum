import responseHandler from '../helpers/helper.js';
import pool from '../../databaseConfig/databaseConfig.js';


const Answers = function(answers) {
     this.body = answers.body;
     this.user_id = answers.user_id;
     this.post_id = answers.post_id;
}

Answers.create = (newAnswers, result) => {
     const query = `INSERT into user_answers(body,user_post_id, user_id) VALUES(?, ?, ?);`;

     pool.query(query, [newAnswers.body, newAnswers.user_post_id, newAnswers.user_id], (err,res)=>{
       
        if(err) {
            console.log(`error`, err);
            result(responseHandler(false, err.code, err.message, null), null);
            return;
        }
        result(null, responseHandler(true, 200, 'Answer added', res.insertId));


     });

};

Answers.delete = (id, result) => {
     const query = `DELETE FROM user_answers WHERE id = ?;`;
     pool.query(query, id, (err,res)=>{
          if(err) {
              console.log(`error`, err);
              result(responseHandler(false, err.code, err.message, null), null);
              return;
          }
          result(null, responseHandler(true,200, 'Answer removed', null));
     });
};


Answers.retrieveAll = (postId, result) => {
    let query = `select user_answers.id, user_post_id, username,  user_answers.body, user_answers.answer_created_at  from user_answers
    JOIN user_posts ON user_posts.id = user_answers.user_post_id
    JOIN users ON users.id = user_answers.user_id WHERE user_post_id = ?;`;
   
    pool.query(query, postId, (err, results)=>{
        if(err || results.length === 0){
             console.log(`error`, err);
             result(responseHandler(false, err ? err.code:404, err ? err.message: 'There are no answers for this questions', null ), null);
             return;
        }
     result(null, responseHandler(true, 200, 'Success', results));

    });

}



export default Answers;