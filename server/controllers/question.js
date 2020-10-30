import {validationResult} from 'express-validator';
import Question from '../datamodels/question.js';
import responseHandler from '../utils/responseHandler.js';


const addQuestion = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400)
        .json(responseHandler(false, 400, errors.array()[0].msg, null))
    } try {

        const {question, body, user_id, tagname} = req.body
        const Quest = new Question({
             question: question,
             body:  body,
             user_id : user_id,
             tagname : tagname

        })

        Question.add(Quest, (err,data)=> {
               if(err) {
                   console.log(err);
                   return res.status(err.code).json(err);
               }
               return res.status(data.code).json(data);
        })
        
    } catch (error) {
          console.log(error);
          return res.status(500)
          .json(responseHandler(false, 500, 'Server error', null))
    }
}





export  {
    addQuestion
}