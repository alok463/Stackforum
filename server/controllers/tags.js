import Tags from '../datamodels/tags.js';
import responseHandler from '../utils/responseHandler.js';


const fetchAllTags = (req,res) => {
     try {
       Tags.getAllTags((err,data)=> {
            if(err) {
                console.log(err);
                return res.status(err.code).json(err)
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


export  {
    fetchAllTags
}