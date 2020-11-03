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
const DeleteQuestion = (req,res) => {
    try {
        Question.delete(req.params.id, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
};


const fetchSingleQuestion = (req,res) => {
     try {
         Question.fetchSingleQuestion(req.params.id, (err,data)=> {
               if(err) {
                   console.log(err);
                   return res.status(err.code).json(err);
               }
               return res.status(data.code).json(data);
         }) 


     } catch (error) {
          console.log(err);
          return res.status(500).json(responseHandler(false, 500, 'Server error', null))    
     


     }
}

const fetchAllQuestions = (req,res) => {
     const  {tagname} = req.body;
     try {
         Question.fetchAllQuestions({

            'action': tagname ? 'tag' : (req.url.includes('top') ? 'top' : 'basic'),
            'tagname': tagname
        }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(true, 500, 'Server Error', null));
    }
};






export  {
    addQuestion,
     fetchSingleQuestion,
    DeleteQuestion,
    fetchAllQuestions
}