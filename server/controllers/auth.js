import responseHandler from '../helpers/helper.js';
import User from '../models/users_model.js';
import {validationResult} from 'express-validator';



const loadUser = (req,res) => {
     
    try {
         
    
     User.loadUser(req.user.id, (err, data) => {
          if(err) {
              console.log(err);
              return res.status(err.code).json(err);

          }
          return res.status(data.code).json(data);
     })
    }

      catch (error) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
     }
}


const auth_login = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try{
        // Login the user
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

export  {
   auth_login,
   loadUser
};