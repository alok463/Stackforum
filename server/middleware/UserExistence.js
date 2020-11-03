import pool from '../../databaseConfig/databaseConfig.js';
import responseHandler from '../utils/responseHandler.js';

export default (req,res, next) => {
       const  {username, password} = req.body;
       const query = `SELECT * from users WHERE username = ?;`;
       pool.query(query, username, (err,results)=> {
              if(err) {
                  console.log(`error`, err);
                  return res
                  .status(err.statusCode)
                  .json(responseHandler(false, err.code, err.message, null));
              }

              if(results[0]) {
                return res
                .status(err.statusCode)
                .json(responseHandler(false, 400, 'User exists already', null));
              }

              next();
       });
       
};