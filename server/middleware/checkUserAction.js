import responseHandler from '../utils/responseHandler.js';
import pool from '../../databaseConfig/databaseConfig.js';


export default (req,res,next) => {
     let action;

     if(req.originalUrl.includes('user/questions/answers')) {
        action = "answers"
        console.log(`actions ${action}`)
     }
     else if(req.originalUrl.includes('user/questions/comments')) {
         action = "comments";
         console.log(`Called only comments`)
     } else {
         action = "questions";
     }


     

     const query = `SELECT user_id FROM ${action} WHERE id = ?;`;


     pool.query(query, req.params.id, (err,results)=> {
            if(err) {
                console.log(`error`, err);
                return res.status(err.status).json(err);
            }
             const {user_id} = results[0]
             console.log(`Users ID `, results[0])
        

          
  
      
             if(user_id !== req.user.id){ 
                 console.log(`Error user is not authorized to delete`);
                 return res.json(responseHandler(false, 401, 'Unauthorized user cannot delete this!', null));

             }
             next()
     })
}