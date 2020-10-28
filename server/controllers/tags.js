import Tags from '../models/tags_model.js';
import responseHandler from '../helpers/helper.js';


const getTags = (req, res) => {
    try {
        Tags.retrieve((err, data) => {
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
    getTags
}
