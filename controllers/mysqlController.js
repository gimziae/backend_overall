// @ts-check

const connection = require('./mysqlConnect');
const db = {
  getUsers: (cb) => {
    // 쿼리문을 사용하여 불러오기
    connection.query('select * from user', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
};

module.exports = db;
