import {validationResult} from  'express-validator';
import responseHandler from '../utils/responseHandler.js';
import Comments from '../datamodels/comments.js';


const   getAllComments = (req,res) => {
    try {
        Comments.getAllComments(req.params.id, (err, data) => {
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

const addComments = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false, 400, errors.array()[0].msg, null));
    }

    try {
        const comment = new Comments({
            body: req.body.body,
            user_id: req.user.id,
            post_id: req.params.id
        });
        // Save Comment in the database
        Comments.addComment(comment, (err, data) => {
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

const removeComments =  (req, res) => {
    try {
        Comments.deleteComment(req.params.id, (err, data) => {
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







export  {
    getAllComments,
    addComments,
    removeComments
}