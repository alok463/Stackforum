import pool from '../../databaseConfig/databaseConfig.js';
import responseHandler from '../utils/responseHandler.js';
import dotenv from 'dotenv';

dotenv.config();


const Tags = function() {
     //empty constructor
}

Tags.getAllTags = (result) => {
    const query =  `SELECT 
                        tags.id,questions.id,tagname,COUNT(DISTINCT questions.id) 
                        as Questions,tags.created_at 
                        FROM tags 
                        LEFT JOIN question_tag ON question_tag.tag_id = tags.id 
                        LEFT JOIN questions ON questions.id = question_tag.question_id 
                        GROUP BY tags.id ORDER BY Questions DESC;`

    pool.query(query,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                  responseHandler(false, err ? err.code : 404, err ? err.message : 'There are no tags', null),
                    null
                );
                return;
            }
            result(
                null,
              responseHandler(true, 200, 'Success', results)
            );
        });
}





export default Tags;