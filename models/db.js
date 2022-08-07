const mysql = require("mysql2");

exports.createConn = function createConn() {
	return mysql.createConnection({
		host: "127.0.0.1",
		user: "app",
		database: "myprogress",
		password: "S$PD5TsU@ke8JEhT~J9M"
	});
}

exports.plainEndConn = function plainEndConn(conn) {
	conn.end(function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Подключение закрыто");
        }
    });
}

/*exports.DBError = class DBError extends Error {
  constructor(message) {
    super(message);
    this.name = "DBError";
  }
}*/