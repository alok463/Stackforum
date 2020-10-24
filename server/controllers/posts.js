import {validationResult} from 'express-validator';
import responseHandler from '../helpers/helper.js';
import Posts from '../models/posts_model';






const addNewPosts = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400)
        .json(responseHandler(false, 400, errors.array()[0].msg,null));
    } try {
        const post = new Posts({
            title : req.body.title,
            post_body: req.body.post_body,
            users_id : req.users.id,
            tagname: req.body.tagname
        });
        Posts.create(post, (err, data)=> {
            if(err){
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        })
        
    } catch (error) {
        return res.status(400)
        .json(responseHandler(false, 500, 'Server error', null))
        
    }
};

const deletePost = (req,res)=> {
    try {
        Posts.delete(req.params.id, (err, data) => {
            if(err){
                console.log(err);
                return res.status(err.code).json(err)
            }
            return res.status(data.code).json(data)
        })
        
    } catch (error) {
        
    }
}