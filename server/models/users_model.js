import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import responseHandler from '../helpers/helper.js';
import pool from '../../databaseConfig/databaseConfig.js';

// 
const User = function(user) {
     this.username = user.username,
     this.password = user.password
}

// User.register = async (newUser, result) => {
//     const salt = await bcrypt.genSalt(10);
//     newUser.password = await bcrypt.hash(newUser.password, salt);

//     // const query = `INSERT INTO users(username,password) VALUES(?,?);`;
//     const query = `INSERT INTO users(username, password) VALUES(?, ?);`;

//     await pool.query(query,
//         [ newUser.username, newUser.password ],
//         (err, res) => {
//             if (err) {
//                 console.log('error: ', err);
//                 result(
//                   responseHandler(false, err.code, err.message, null),
//                     null
//                 );
//                 return;
//             }

//             const payload = {
//                 user: {
//                     id: res.insertId
//                 }
//             };

//             jwt.sign(
//                 payload,
//                  process.env.JWT_SECRET,
//                 { expiresIn: 3600 },
//                 (err, token) => {
//                     if (err) {
//                         console.log('error: ', err);
//                         result(
//                          responseHandler(false, err.code, err.message, null),
//                             null
//                         );
//                         return;
//                     }
//                     result(
//                         null,
//                       responseHandler(true, 200, 'User registered', {'token': token})
//                     );
//                 });
//         });
// }

User.register = async (newUser, result) => {
     const salt = await bcrypt.genSalt(10);
     newUser.password = await bcrypt.hash(newUser.password, salt);
         const query = `INSERT INTO users(username, password) VALUES(?, ?);`;
     await pool.query(query,
         [newUser.username, newUser.password],
         (err, res) => {
             if(err) {
                 console.log(`Error`, err)
                 result(responseHandler(false, err.statusCode, err.message, null), null);
                 return;
             }
            const payload = {
                user: {
                    id: res.insertId
                }
            };

            jwt.sign(payload,
                process.env.JWT_SECRET,
                {expiresIn: 360000},
                (err, token) => {
                    if(err) {
                         console.log(`error occured`, err)
                         result(responseHandler(false, err.statusCode, err.message, null), null);            
                         return;
                        }
                        result(null,responseHandler(true, 200, 'User registration success', {'token': token}));
                    })

         })
     
     
}

//User data retrieval
User.loadUser = (user_id , result) =>  {
     const query = `SELECT id, username, created_at FROM  users WHERE id = ?; `;
     pool.query(query,
        user_id,
        (err, results) => {
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
              responseHandler(true, 200, 'Success', results[0])
            );
        });


}



User.retrieve = ({action ,id}, result) => {
    action = action.toLowerCase();
    const query_head = `SELECT users.id,username,users.created_at,COUNT(DISTINCT posts.id)`;
    const query_middle = ` FROM users
    LEFT JOIN user_posts ON user_posts.users_id
    LEFT JOIN post_tag ON post_tag.post_id = user_posts.id
    LEFT JOIN tags ON post_tag.tag_id = tags.id`;
    const queryOne = `as posts_count, COUNT(DISTINCT tagname) as tags_count
    ${query_middle} GROUP BY users.id ORDER by posts_count DESC;`;

    const queryTwo = `as post_count,COUNT(DISTINCT tagname) 
    as tag_count, COUNT(DISTINCT user_answers.id) 
    as answer_count, COUNT(DISTINCT user_comments.id) 
    as comment_count  ${query_middle}
    LEFT JOIN user_answers ON user_answers.user_id = users.id 
    LEFT JOIN user_comments ON user_comments.user_id = users.id 
    WHERE users.id = 4 GROUP BY users.id;`;

    pool.query(action === 'one' ? query_head + queryTwo : query_head + queryOne,
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










User.login = async(newUser, result) => {
    const query = `SELECT * FROM users WHERE username = ?;`;

 pool.query(query,
        newUser.username,
        async (err, results) => {
            if (err || !results[0]) {
                console.log('error: ', err);
                const code = !results[0] ? 404 : err.code;
                result(
                    responseHandler(false, code, !results[0] ? 'User does not exists' : err.message, null),
                    null
                );
                return;
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(newUser.password, user.password);

            if(!isMatch){
                result(
                    responseHandler(false, 400, 'Incorrect password', null),
                    null
                );
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                 process.env.JWT_SECRET ,
                { expiresIn: 3600 },
                (err, token) => {
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
                       responseHandler(true, 200, 'User logged in', {'token': token})
                    );
                });
    });
};

export default User;











