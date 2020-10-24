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











