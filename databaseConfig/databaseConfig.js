import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config(); 

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    multipleStatements:true,
    connectionLimit:10
});

pool.getConnection((error, connection)=> {
     if(error) {
         if(error.code === 'PROTOCOL_CONNECTION_LOST') {
             console.error(`Database connection closed with errors ${error.code}`)
         }
         if(error.code === 'ER_CON_COUNT_ERROR'){
             console.error(`Database has too many connections`);
         }
         if(error.code === 'ECONNREFUSED'){
             console.error(`Database connection was refused`)
         }
     }
      if(connection)  connection.release();
      console.log(`connection ${process.env.host}`)
      
      return;
})


export default pool;


