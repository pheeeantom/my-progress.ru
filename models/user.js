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
    async createUser(conn, res) {
        let salt = this.genSalt();
        conn.query("INSERT INTO users(nickname, email, password_hash, salt) VALUES ('" + this.nick + "', '"
            + this.email + "', '" + this.genHash(salt) + "', '" + salt + "');",
            function(err, results, fields) {
                if (err) {
                    console.log(err);
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
                else {
                    conn.end(function(err) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(503);
                        }
                        else {
                            console.log("Подключение закрыто");
                            res.redirect('/profile');
                        }
                    });
                }
        });
        return conn;
    }
}