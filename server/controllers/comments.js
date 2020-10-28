import responseHandler from '../helpers/helper.js';
import {validationResult} from 'express-validator';
import Comments from '../models/comments_model.js';


const getComments = (req,res) => {
    try {
        Comments.RetrieveAllComments(req.params.id, (err,data) => {
              if(err) {
                  console.log(err);
                  return res.status(err.code).json(err);
              }
              return res.status(data.code).json(data)
        })
        
    } catch (error) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
        
    }
}


const addComments = (req,res) => {
       const errors = validationResult(req);
       if(!errors.isEmpty()) {
           return res.status(400)
           .json(responseHandler(false, 400, errors.array()[0].msg,null));
       }try {

           const add_comment = new Comments({
               comment_body: req.body.comment_body,
               post_id : req.params.id,
               user_id : req.user.id
           })
           Comment.create(add_comment, (err,data)=>{
                  if(err) {
                      console.log(err);
                      return res.status(err.code).json(err);
                  }
                  return res.status(data.code).json(data);
           })

           
       } catch (error) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
       }
};




const deleteComments = (req,res) => {
     try {

        Comments.remove(req.params.id, (err,data)=> {
             if(err) {
                console.log(err);
                return res.status(err.code).json(err);
             }
             return res.status(data.code).json(data);
        });
         
     } catch (error) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));  
     }
}






export  {
    getComments,
    addComments,
    deleteComments
}
