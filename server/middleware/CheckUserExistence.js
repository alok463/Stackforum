import responseHandler from '../helpers/helper.js';
import pool from '../../databaseConfig/databaseConfig.js'



export default (req, res, next) => {
     const {username, password} = req.body;
     pool.query(`SELECT * FROM users WHERE username = ?;`,  username, (err, results) => {
          if(err) {
              return res 
               .json({
                   message:'Error occured',
                   error: err
               });
          }

          if(results[0]) {
              return res.status(400)
                   .json({
                       message:'user exists '
                   })
          }
          next();
     });
}

