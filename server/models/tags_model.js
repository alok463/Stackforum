import responseHandler from '../helpers/helper.js';
import pool from '../../databaseConfig/databaseConfig.js';


const Tags = () => { //empty constructor as there are no inserts made through this model, however we retrieve all the tags

}



Tags.retrieve = (result) => {

    const query = `SELECT tags.id,`
     
}