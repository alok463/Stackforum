Query One to retrieve single user

SELECT users.id, username, users.created_at,
    COUNT(DISTINCT questions.id)
    as Questions, COUNT(DISTINCT tagname) as Tags
    FROM users
    LEFT JOIN questions ON questions.user_id = users.id
    LEFT JOIN question_tag ON question_tag.question_id = questions.id
    LEFT JOIN tags ON question_tag.tag_id = tags.id
    GROUP BY users.id ORDER BY Questions DESC;




    Query two to reteive user actions

    SELECT users.id, username, users.created_at,
    COUNT(DISTINCT questions.id)
    as Questions, COUNT(DISTINCT tagname) as Tags,
    COUNT(answers.id) as Answers, COUNT(DISTINCT comments.id) as Comments
    FROM users
    LEFT JOIN questions ON questions.user_id = users.id
    LEFT JOIN question_tag ON question_tag.question_id = questions.id
    LEFT JOIN tags ON question_tag.tag_id = tags.id
    LEFT JOIN answers ON answers.user_id = users.id
    LEFT JOIN comments ON comments.user_id = users.id
    WHERE users.id = 2 GROUP BY users.id;








   SELECT users.id, username, users.created_at,
    COUNT(DISTINCT questions.id) 
    as Questions, COUNT(DISTINCT tagname) as Tags,
    COUNT(answers.id) as Answers, COUNT(DISTINCT comments.id) as Comments
    FROM users
    LEFT JOIN questions ON questions.user_id = users.id
    LEFT JOIN question_tag ON question_tag.question_id = questions.id
    LEFT JOIN tags ON question_tag.tag_id = tags.id