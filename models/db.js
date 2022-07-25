const mysql = require("mysql2");

exports.createConn = function createConn() {
	return mysql.createConnection({
		host: "localhost",
		user: "app",
		database: "myprogress",
		password: "S$PD5TsU@ke8JEhT~J9M"
	});
}

/*exports.DBError = class DBError extends Error {
  constructor(message) {
    super(message);
    this.name = "DBError";
  }
}*/