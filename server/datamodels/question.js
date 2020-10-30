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

Question.add = (newQuestion, result) => {

    //here we are using the LAST_INSERT_ID() METHOD retreive from the questions and
    // then passing the same to the answers table


     const query = `INSERT INTO Questions(question, body, user_id) VALUES(?,?,?);
                    SET @v1 := (SELECT LAST_INSERT_ID());
                    INSERT IGNORE INTO tags(tagname) VALUES(?);
                    SET @v2 := (SELECT id from tags WHERE tagname = ?);
                    INSERT INTO question_tag(question_id, tag_id) VALUES(@v1, @v2);`;


  
    //                 SET @v1 := (SELECT LAST_INSERT_ID());
    //                 INSERT IGNORE INTO tags(tagname) VALUES (?);
    //                 SET @v2 := (SELECT id FROM tags WHERE tagname = ?);
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