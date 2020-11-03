import responseHandler from '../utils/responseHandler.js';
import pool from '../../databaseConfig/databaseConfig.js'

const Answer = function(answers) {
     this.body = answers.body;
     this.user_id = answers.user_id;
     this.questions_id = answers.questions_id;
}

Answer.addAnswer = (newAnswers, result) => {
     const query = `INSERT INTO answers(body, user_id, questions_id) VALUES(?, ?, ?);`;
     pool.query(query, [newAnswers.body, newAnswers.user_id, newAnswers.questions_id], (err,res) => {
             if(err) {
                 console.log(`err`, err);
                 result(responseHandler(false, err.code, err.message, null), null);
                 return;
             }
             result(null, responseHandler(true, 200, 'answers created successfully', res))
     });

};

Answer.remove = (id, result) => {
     const query = `DELETE FROM answers where id =? ;`;
     pool.query(query, id, (err, res)=> {
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
         responseHandler(true, 200, 'Answer Removed', null)
        );
     })
}

// Answer.getAllAnswers = (questionId, results) => {

Answer.AllAnswers = (result) => { 
     const query = `SELECT answers.id as AnswerID,
     questions_id as QuestionID, username, question,
     answers.body as answers, answers.created_at, answers.user_id
     FROM answers  JOIN 
     questions ON answers.questions_id = questions.id
      JOIN users ON answers.user_id = users.id 
      ORDER BY answers.created_at DESC;`;

      pool.query(query, (err, results) => {
        if(err || results.length == 0) {
            console.log(err) ;
            result(responseHandler(false, err ? err.code : 404 ,  err ? err.message :'There are no answers' ,null), null);
            return;
        }
        result(null,responseHandler(true, 200, 'Success', results));
    })

}



    
Answer.getAllAnswersById = (questions_id, result) => {
    const query = `SELECT answers.id as AnswersID,
     questions_id as QuestionID, username,question,
    answers.body as answers, answers.created_at, answers.user_id 
    FROM answers  JOIN 
    questions ON answers.questions_id = questions.id
     JOIN users ON answers.user_id = users.id 
    WHERE questions_id = ?;`;

    pool.query(query, questions_id, (err, results) => {
        if(err || results.length == 0) {
            console.log(err) ;
            result(responseHandler(false, err ? err.code : 404 ,  err ? err.message :'There are no answers' ,null), null);
            return;
        }
        result(null,responseHandler(true, 200, 'Success', results));
    })
}


     
// }


export default Answer;