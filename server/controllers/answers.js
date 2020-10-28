import {validationResult} from 'express-validator';
import responseHandler from  '../helpers/helper.js';
import Answers from '../models/answers_model.js';


const getAnswers = (req, res) => {
    try {
        console.log(req)
        Answers.retrieveAll(req.params.id, (err, data) => {
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

const addAnswers = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try {
        const answer = new Answers({
            body: req.body.text,
            user_post_id: req.params.id,
            user_id: req.user.id

        });
      
        Answers.create(answer, (err, data) => {
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

const deleteAnswer = async (req, res) => {
    try {
        Answers.delete(req.params.id, (err, data) => {
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
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
}



export  {
     deleteAnswer,
     addAnswers,
     getAnswers
}