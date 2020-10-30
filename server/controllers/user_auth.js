import {validationResult} from 'express-validator';
import User from '../datamodels/user_models.js';
import responseHandler from '../utils/responseHandler.js';


const loadTheUser = (req,res) => {
     try {
         User.loadTheUser(req.user.id, (err, data) => {
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
}

const login = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try{
             //pass the username and password in the req.body

        User.login(new User(req.body), (err, data) => {
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


const register = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try{
          //here we would the pass req.body inside the new User instance
        await User.register(new User(req.body), (err, data) => {
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
       
}








//exporting the functions and they will be invoked in the routes
export {
    loadTheUser,
    login,
    register
}