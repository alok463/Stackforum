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
    newUsers.password = await bcrypt(newUsers.password, salt);
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

        jwt.sign(payload, process.env.JWT_SECRET,  {expiresIn:'360000'}, (err, token) => {
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
              jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '360000'}, (err, token) =>{

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


export default User;