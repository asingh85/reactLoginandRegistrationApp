const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into user(userName,firstName,lastName,gender,country,email, password) 
                values(?,?,?,?,?,?,?)`,
      [data.userName, data.firstName, data.lastName, data.gender, data.country, data.email, data.password],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  loginUser: (email, callBack) => {
    pool.query(
      "select * from user where email = '"+email+"' OR userName = '"+email+"'",
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results)
        console.log(error)
        return callBack(null, results[0]);
      }
    );
  },
};
