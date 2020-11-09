import pool from '../../databaseConfig/databaseConfig.js';
import responseHandler from '../utils/responseHandler.js';
import dotenv from 'dotenv';


dotenv.config()
//constuctor

const Question = function(questions) {
     this.question = questions.question;
     this.body = questions.body;
     this.user_id = questions.user_id;
     this.tagname = questions.tagname;
}


Question.fetchAllQuestions = ({action,tagname}, result) => {
  let query = '';
  let main = `SELECT questions.id, questions.user_id, username,
   COUNT(DISTINCT answers.id) as Answers,
   COUNT(DISTINCT comments.id) as Comments,
   tag_id, question,tagname, questions.body, questions.created_at
   FROM questions
   INNER JOIN question_tag ON question_tag.question_id = questions.id
   INNER JOIN tags ON question_tag.tag_id = tags.id
   INNER JOIN users ON questions.user_id = users.id
   LEFT JOIN answers ON answers.questions_id = questions.id
   LEFT JOIN comments ON questions.id = comments.question_id `;

   if (action === 'basic') {
    query = 'GROUP BY questions.id ORDER BY questions.created_at DESC;';
} else if (action === 'top') {
    query = 'GROUP BY questions.id ORDER BY Answers DESC, Comments DESC;';
} else if (action === 'tag') {
    query = 'WHERE tags.tagname = ? GROUP BY questions.id ORDER BY questions.created_at DESC;';
} else {
    result(
       responseHandler(false, 400, 'Incorrect Action', null),
        null
    );
    return;
}
pool.query(main  + query,
   tagname ? tagname : null,
    (err, results) => {
        if (err || results.length === 0) {
            console.log('error: ', err);
            result(
             responseHandler(false, err ? err.code : 404, err ? err.message : 'There are no questions', null),
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


Question.delete = (id, result) => {
     const query = `DELETE FROM question_tag WHERE question_id = ?;
            DELETE FROM answers WHERE questions_id = ?;
            DELETE FROM comments WHERE question_id = ?;
            DELETE FROM questions WHERE id = ?;
     `;

     pool.query(query,  [id, id, id, id], (err, res) =>{
              if(err) {
                  console.log(`error`, err);
                  result(
                responseHandler(false, err.code, err.message, null),
                    null
                );
                return; 
              }

              result(
                null,
              responseHandler(true, 200, 'Question deleted', null)
            );

     });

}




Question.add = (newQuestion, result) => {

    //here we are using the LAST_INSERT_ID() METHOD retreive from the questions and
    // then passing the same to the answers table


     const query = `INSERT INTO Questions(question, body, user_id) VALUES(?,?,?);
                    SET @v1 := (SELECT LAST_INSERT_ID());
                    INSERT IGNORE INTO tags(tagname) VALUES(?);
                    SET @v2 := (SELECT id from tags WHEREtagname = ?);
                    INSERT INTO question_tag(question_id, tag_id) VALUES(@v1, @v2);`;


  
    //                 SET @v1 := (SELECT LAST_INSERT_ID());
    //                 INSERT IGNORE INTO tags(tagname) VALUES (?);
    //                 SET @v2 := (SELECT id FROM tags WHEREtagname = ?);
    //                 INSERT INTO question_tag(question_id,tag_id) VALUES(@v1,@v2);`;
     
     
     pool.query(query, [newQuestion.question, newQuestion.body, newQuestion.user_id, newQuestion.tagname, newQuestion.tagname],

        (err, res) => {
              if(err) {
                  console.log(`error`, err);
                  
                  result(responseHandler(false, err.code, err.message, null),
                  null)
                 return
             
                  
              }
              //if created without any errors then

              result(null, responseHandler(true, 200, 'post created successfully', res.insertId));
            
            });
        };



export default Question;        