import responseHandler from '../helpers/helper.js';
import pool from '../../databaseConfig/databaseConfig.js';


const Tags = () => { //empty constructor as there are no inserts made through this model, however we retrieve all the tags

}



Tags.retrieve = (result) => {

    const query = `SELECT tags.id, user_posts.id, tagname, COUNT(DISTINCT user_posts.id) as Post_Count , tags.created_at FROM tags 
    LEFT JOIN post_tag ON post_tag.tag_id = tags.id
    LEFT JOIN user_posts ON  user_posts.id = post_tag.post_id
    GROUP BY tags.id ORDER BY Post_Count DESC;`;

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