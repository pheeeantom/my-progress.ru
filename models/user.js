const config = require("../config/auth.config");
const email = require("./email");
const DB = require("./db");

exports.User = class User {
    constructor(nick, email, pass){
        this.nick = nick;
        this.email = email;
        this.pass = pass;
    }
    genSalt() {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 20; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    genHash(salt) {
        return require('crypto').createHash('sha256').update(this.pass + salt).digest("hex");
    }
    async createUser(conn, req, res) {
        let salt = this.genSalt();
        conn.query("INSERT INTO users(nickname, email, password_hash, salt) VALUES ('" + this.nick + "', '"
            + this.email + "', '" + this.genHash(salt) + "', '" + salt + "');",
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    if (err.code === 'ER_DUP_ENTRY') {
                        if (err.sqlMessage.includes('nickname')) {
                            conn.end((err) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(503);
                                }
                                else {
                                    console.log("Подключение закрыто");
                                    res.redirect("/logreg?nicknameBusy=" + this.nick + "&num=1");
                                }
                            });
                        }
                        else if (err.sqlMessage.includes('email')) {
                            conn.end((err) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(503);
                                }
                                else {
                                    console.log("Подключение закрыто");
                                    res.redirect("/logreg?emailBusy=" + this.email + "&num=1");
                                }
                            });
                        }
                    }
                    else {
                        conn.end(function(err) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(503);
                            }
                            else {
                                console.log("Подключение закрыто");
                                res.sendStatus(503);
                            }
                        });
                    }
                }
                else {
                    conn.end(function(err) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(503);
                        }
                        else {
                            let conn2 = DB.createConn();
                            conn2.query("SELECT * from users WHERE id='" + results.insertId + "';",
                                function(err, results, fields) {
                                    if (err) { console.log(err); DB.plainEndConn(conn2); res.sendStatus(500); }
                                    else {
                                        req.login(results[0], function(err) {
                                            if (err) { console.log(err); DB.plainEndConn(conn2); res.sendStatus(500); }
                                            else { DB.plainEndConn(conn2); email.sendConfirmation(req.body.email); res.redirect('/profile'); }
                                        });
                                    }
                                }
                            );
                        }
                    });
                }
        });
        return conn;
    }
}