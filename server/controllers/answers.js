import {validationResult} from  'express-validator';
import responseHandler from '../utils/responseHandler.js';
import Answer from '../datamodels/answers.js';

const addAnswers = (req,res) => {
     
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400)
        .json(responseHandler(false, 400, errors.array()[0].msg, null));
    } try {
        const { body, user_id } = req.body;
        console.log(user_id)
        const answers = new Answer({
            body: req.body.body,
            user_id: user_id,
            questions_id : req.params.id
        });
         
        


       Answer.addAnswer(answers, (err, data) => {
              if(err) {
                  console.log(err);
                  return res.status(err.code).json(err);
              }
              return res.status(data.code).json(data);
       });
        
    } catch (error) {
         console.log(err);
         return res.status(500).json(responseHandler(false, 500, 'Server Error', null));
    }

}

//get all the answers By ID

const  getAllAnswers = (req,res) => {
    try {
        Answer.AllAnswers((err, data)=> {
              if(err) {
                  console.log(err);
                  return res.status(err.code).json(err);
              }
         
              return res.status(200).json(data)
        })
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
}





const getAnswersById = (req,res) => {
    try {
        Answer.getAllAnswersById(req.params.id, (err, data)=> {
              if(err) {
                  console.log(err);
                  return res.status(err.code).json(err);
              }
         
              return res.status(200).json(data)
        })
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
}



const deleteAnswers  = async (req,res) => {
    try {
        Answer.remove(req.params.id, (err, data)=> {
             if(err) {
                 console.log(err);
                  return res.status(err.code).json(data)
             }
            
             return res.status(data.code).json(data)
        })
     
        
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseHandler(false, 500, 'Server error', null))

        
    }
}




export  {
    addAnswers,
    deleteAnswers,
    getAnswersById,
    getAllAnswers
}