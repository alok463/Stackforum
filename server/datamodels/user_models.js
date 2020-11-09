import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../databaseConfig/databaseConfig.js';
import responseHandler from '../utils/responseHandler.js';
import dotenv from 'dotenv';


dotenv.config();


//constructor

const User = function(user) {
    this.username = user.username;
    this.password = user.password;
};

User.register = async(newUsers, result) => {

    const salt = await bcrypt.genSalt(10);
    newUsers.password = await bcrypt.hash(newUsers.password, salt);
    const query = `INSERT INTO users(username, password) VALUES(?,?);`;
    await pool.query(query,  [newUsers.username, newUsers.password], (err, res) =>{
        if(err) {
            console.log(`error`, err);
            result(responseHandler(false, err.code, err.message, null), null);
            return;
        } //no errors

        const payload = {
             user: {
                 id: res.insertId
             }
        };

        //sign the payload

        jwt.sign(payload, process.env.JWT_SECRET,  {expiresIn:'5d'}, (err, token) => {
              if(err) { //error in signing the payload
                  console.log(`error`, err);
                  result(responseHandler(false, err.code, err.message, null), null);
                  return;
              }
              result(null, responseHandler(true, 200, 'user registered successfully', {'token':token}));

        });
    });

};


User.login =  (newUsers, result) => {
      const query = `SELECT * FROM users WHERE username = ?;` ;
       pool.query(query, newUsers.username, async(err, results)=> {
             if(err  ||  !results[0]) {
                    console.log(`error code`, err);
                    const code = !results[0] ? 404 : err.code;
                    result(responseHandler(false,  code , !results[0] ? 'User doesnot exists' : err.message , null ));
                    return;
             }

             //no errors
             const user = results[0];
             const isMatch = await bcrypt.compare(newUsers.password, user.password);
              if(!isMatch) {
                result(responseHandler(false, err.code, 'Users password donot match', null), null);
                return;
              }

              const payload = {
                   user: {
                       id : user.id
                   }
              };
                     //sign the payload again and check the token for errors
              jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3d'}, (err, token) =>{

                     if(err) {
                         console.log(`error`, err);
                         result(responseHandler(false, err.code, err.message, null), null);
                         return;
                     }

                     result(null, responseHandler(true, 200, 'Users logged in', {'token': token}))


              })



         

      })
}


//Loading the User from the database

User.loadTheUser = (user_id, result) => {
       const query = `SELECT id, username, created_at from users where id=?;`;
       pool.query(query, user_id, (err, results) => {
              if(err) {
                  console.log(`err`, err);
                  result(responseHandler(false, err.code, err.message, null), null);
                  return;

              }

              result(null, responseHandler(true, 200, 'user loading success', results[0]))


       })
}



User.fetchAllUsers = ({action, id}, result) => {
    action = action.toLowerCase();
    const query_head = `SELECT users.id, username, users.created_at,
    COUNT(DISTINCT questions.id) `;

    const query_middle = `FROM users
    LEFT JOIN questions ON questions.user_id = users.id
    LEFT JOIN question_tag ON question_tag.question_id = questions.id
    LEFT JOIN tags ON question_tag.tag_id = tags.id`;

    const query_one = `as Questions, COUNT(DISTINCT tagname) as Tags
    ${query_middle} GROUP BY users.id ORDER BY Questions DESC;`;
    
    const query_two = `as Questions, COUNT(DISTINCT tagname) as Tags,
    COUNT(answers.id) as Answers, COUNT(DISTINCT comments.id) as Comments
    ${query_middle}  LEFT JOIN answers ON answers.user_id = users.id
    LEFT JOIN comments ON comments.user_id = users.id
    WHERE users.id = ? GROUP BY users.id;`;

    pool.query(action === 'one' ? query_head + query_two : query_head + query_one,
    action === 'one' ? id : null,
    (err, results) => {
        if (err || results.length === 0) {
            console.log('error: ', err);
            result(
               responseHandler(false, err ? err.code : 404, err ? err.message : 'There are no users', null),
                null
            );
            return;
        }
        result(
            null,
           responseHandler(true, 200, 'Success', action === 'one' ? results[0] : results)
        );
    
    


});
}




export default User;