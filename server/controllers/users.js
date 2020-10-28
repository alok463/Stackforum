import responseHandler from '../helpers/helper.js';
import User from '../models/users_model.js';
import {validationResult} from 'express-validator'


const getUsers = (req,res) => {
     try {
         const { id } = req.params;
         User.retrieve({
             'action': id ? 'one': 'all',
             'id': id  ? id : null
         }, (err, data) => {
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


const auth_register = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false,  400, errors.array()[0].msg, null));
    }
    try{

     

        // Register user in the database
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
};


export  {
   auth_register,
   getUsers
}