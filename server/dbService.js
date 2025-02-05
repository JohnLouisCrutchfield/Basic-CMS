const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

});

/* let sql = "select * from chapters;";
pool.execute(sql, function (err,result) {

if (err) throw err;

console.log(result); 

 module.exports = pool;
});
*/
 
class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM chapters;";

                pool.execute(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
             
            return response;
              }  catch(error){
                   console.log(error);
                }
            }

            async insertNewName(name){
                try{
                    const date_added = new Date();
                    const insertID = await new Promise((resolve, reject) => {
                        const insert_name = "INSERT INTO chapters (name, date_added) VALUES(?,?);";
                        pool.execute(insert_name, [name, date_added], (err,result) => {
                            if(err) reject(new Error(err.message));
                            resolve(result.insertID);
                })
            });
                  return {
                    id: insertID,
                    name: name,
                    date_added: date_added


                  };
        }
                 catch (error) {
                    console.log(error);
                
                }
            }

            async deleteRowById(id)   {
                try{
                    id = parseInt(id, 10);
                    const response = await new Promise ((resolve,  reject) => {
                        const query = "DELETE FROM chapters WHERE id = ?";

                        pool.execute(query, [id] , (err, result) => {
                            if (err) reject(new Error(err.message));
                            resolve(result.affectedRows);
                        })
                    });
                
                return response === 1  ? true : false;

            } catch (error){
                console.log(error)
                return false;
            }
            
        }

  
}

module.exports = DbService;
