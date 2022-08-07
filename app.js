const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();
const User = require("./models/user");
const DB = require("./models/db");
const config = require("./config/auth.config");
var jwt = require("jsonwebtoken");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var debug = require('debug')('express-mysql-session');
//var methodOverride = require('method-override')

var session = require('express-session');
var mysql2 = require('mysql2/promise');
var MySQLStore = require('express-mysql-session')(session);

var captcha = require("nodejs-captcha");

const hour = 3600000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(config.secret));
var sessionStore = new MySQLStore({
	//expiration: 604800,
	connectionLimit : 10,
	host: "127.0.0.1",
	user: "app",
	database: "myprogress",
	password: "S$PD5TsU@ke8JEhT~J9M",
	// Whether or not to automatically check for and clear expired sessions:
	clearExpired: false,
	// How frequently expired sessions will be cleared; milliseconds:
	checkExpirationInterval: hour,
    createDatabaseTable: false,
    schema: {
        tableName: 'users_sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});
app.use(session({
  name: 'passport',
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 7 * 24 * hour, secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
//app.use(passport.session());
/*app.use((req, res, next) => {
    req.session.init = "init";
    next();
});*/
//app.use(methodOverride('X-HTTP-Method-Override'));


/*var connSession = mysql2.createPool({
	connectionLimit : 10,
	host: "127.0.0.1",
	user: "app",
	database: "myprogress",
	password: "S$PD5TsU@ke8JEhT~J9M"
});*/

//const urlencodedParser = express.urlencoded({extended: false});

app.engine('hbs', expressHbs.engine(
	{
		defaultLayout: "layout",
		extname: 'hbs',
		helpers: {
	        style(page) {
			    return new hbs.SafeString('<link href="/css/' + page + '.css" rel="stylesheet">');
	        },
	        script(page) {
	        	if ('logreg')
	        		return new hbs.SafeString('<script src="/js/' + page + '.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9/core.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9/sha256.js"></script>');
	        	else
			    	return new hbs.SafeString('<script src="/js/' + page + '.js"></script>');
	        },
	        categoriesScript(categories) {
	        	return categories ? new hbs.SafeString('<script src="/js/categories.js"></script>') : null;
	        },
	        categoriesStyle(categories) {
	        	return categories ? new hbs.SafeString('<link href="/css/categories.css" rel="stylesheet">') : null;
	        }
	    }
	}
));
app.set('view engine', 'hbs');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function verify(email, password, cb) {
	console.log("hi");
	let connection = DB.createConn();
	connection.query("SELECT * FROM users WHERE email='" + email + "';", function(err, results, fields) {
		if (err) { DB.plainEndConn(connection); console.log(1); return cb(err); }
		if (!results.length) { DB.plainEndConn(connection); console.log(2); return cb(null, false, { message: 'Неверный емейл либо пароль.' }); }
		if (require('crypto').createHash('sha256').update(password + results[0].salt).digest("hex") !== results[0].password_hash) {
			DB.plainEndConn(connection); console.log(3); return cb(null, false, { message: 'Неверный емейл либо пароль.' });
		}
		DB.plainEndConn(connection); console.log(4);
		return cb(null, results[0]);
	});
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user.id);
  });
});

passport.deserializeUser(function(id, cb) {
  process.nextTick(function() {
    let connection = DB.createConn();
	connection.query("SELECT * FROM users WHERE id='" + id + "';", function(err, results, fields) {
		DB.plainEndConn(connection); cb(err,results[0]);
	});
  });
});

app.get("/", function(request, response) {
    response.render("index", {
        categories: true,
        page: "index"
    });
});

/*app.get("/get-email-token", function(request, response) {
	response.send(jwt.sign({email: request.query.email}, config.secret));
});*/


app.get("/confirm", function(request, response) {
	let connection = DB.createConn();
	jwt.verify(request.query.token, config.secret, function(err, decoded) {
		if (err) {
			response.sendStatus(422);
		}
		else {
			connection.query("UPDATE users SET is_confirmed=1 WHERE email='" + decoded.email + "';",
	            function(err, results, fields) {
	                if (err) {
	                    console.log(err);
	                    connection.end(function(err) {
	                        if (err) {
	                            console.log(err);
	                            response.sendStatus(503);
	                        }
	                        else {
	                            console.log("Подключение закрыто");
	                            response.sendStatus(503);
	                        }
	                    });
	                }
	                else {
	                    connection.end(function(err) {
	                        if (err) {
	                            console.log(err);
	                            response.sendStatus(503);
	                        }
	                        else {
	                            console.log("Подключение закрыто");
	                            response.redirect('/profile');
	                        }
	                    });
	                }
	            }
	        );
		}
	});
});

app.get("/logreg", function(request, response) {
	if (!request.user) {
		response.render("logreg", {
        	categories: false,
        	page: "logreg"
    	});
	}
	else {
		response.send(request.user);
	}
});

/*var session1 = function (req, res) {
	if (!req.session) { return; }
	var temp = req.session.passport; // {user: 1}
    req.session.regenerate(function(err){
        //req.session.passport is now undefined
        req.session.passport = temp;
        req.session.save(function(err){
            res.send(200);
        });
    });
};*/

app.post("/login", function(req, res, next) {
	//console.log(req.body);
	console.log(req.cookies.captcha)
	let connection = DB.createConn();
	connection.query("SELECT * from captchas WHERE uuid='" + req.cookies.captcha + "';",
	    function(err, results, fields) {
	    	if (err) {
                DB.plainEndConn(connection);
                res.sendStatus(503);
            }
            else {
            	connection.end(function(err) {
                    if (err) {
                        console.log(err); res.sendStatus(503);
                    }
                    else {
                        if (results[0].captcha === req.body.captcha.toLowerCase()) { next(); }
                        else { res.redirect('/logreg?captcha=true'); }
                    }
                });
            }
        });
}, passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/logreg?invalid=true'
}));/*, session1*//*, function (req, res) {
  // after a successful login, regenerate session (prevent session fixation)
  var {passport} = req.session;
  req.session.regenerate((err) => {
   if (!err) {
    // Copy data to new session (passport, shopping basket etc.)
    Object.assign(req.session, {passport});
   }
   res.status(HttpStatus.NO_CONTENT).end();
  });
 });*/
/*, function(req,res,next){ passport.authenticate("local", function(err, user, info){
		console.log(err);
		console.log(user);
		console.log(info);
		res.send("1");
	})(req,res,next);
});*/
/*, urlencodedParser, function(request, response, next) {
	//console.log(request.body);
	//response.redirect('/profile');
});*/

app.post("/registrate", function(req, res, next) {
	//console.log(req.body);
	console.log(req.cookies.captcha)
	let connection = DB.createConn();
	connection.query("SELECT * from captchas WHERE uuid='" + req.cookies.captcha + "';",
	    function(err, results, fields) {
	    	if (err) {
                DB.plainEndConn(connection);
                res.sendStatus(503);
            }
            else {
            	connection.end(function(err) {
                    if (err) {
                        console.log(err); res.sendStatus(503);
                    }
                    else {
                        if (results[0].captcha === req.body.captcha.toLowerCase()) { next(); }
                        else { res.redirect('/logreg?captcha=true&num=1'); }
                    }
                });
            }
        });
}, /*urlencodedParser, */function(request, response, next) {
	console.log(request.body);
	if (request.body.nickname.match(/^.{2,}$/) && request.body.email.match(/^[a-z0-9_.-]+@[a-z0-9-]+\.[a-z]{2,}$/) &&
		request.body.password[0].match(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$/) &&
		request.body.password[0] === request.body.password[1]) {
		/*try {
			const connection = DB.createConn();
			let user = new User.User(request.body.nickname, request.body.email, request.body.password[0]);
			user.createUser(connection, response);
			connection.end(function(err) {
				if (err) {
					throw new DB.DBError("Ошибка во время закрытия");
				}
				console.log("Подключение закрыто");
				response.redirect('/profile');
			});
		}
		catch (err) {
			if (err instanceof DB.DBError) {
				console.log(err);
				response.sendStatus(503);
			}
			else {
				throw err;
			}
		}*/
		let connection = DB.createConn();
		let user = new User.User(request.body.nickname, request.body.email, request.body.password[0]);
		user.createUser(connection, request, response);
	}
	else {
		response.sendStatus(422);
	}
});

app.use("/profile", function(request, response) {
	if (!request.user) { response.send("Не авторизован!"); return; }
	if (!request.user.is_confirmed) { response.send("Подтвердите почту!"); }
	response.send(request.user);
});

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { res.sendStatus(500); }
    res.redirect('/');
  });
});

app.get('/getCaptcha',// session({ name: 'captcha', secret: config.secret, resave: false, saveUninitialized: false, store: sessionStore, cookie: { secure: false } }),
	function(req, res, next) {
	let captcha2 = captcha();
	/*var temp = captcha2.value;
    req.session.regenerate(function(err){
        req.session.captcha = temp;
        req.session.save();
    });*/
    //req.session.reload(); //TODO:убрать это говно
    /*req.session.regenerate(function(err) {
	    req.session.captcha = captcha2.value;
	    req.session.save();
	});*/
    //console.log(req.session);
    //console.log(res.locals);
    //res.locals.captcha = captcha2.value;
    let connection = DB.createConn();
    let uuid;
    connection.query("insert into captchas (uuid, captcha) values(uuid(), '" + captcha2.value + "');",
	    function(err, results, fields) {
	    	if (err) {
                //console.log(err);
               /*connection.end(function(err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(503);
                    }
                    else {
                        console.log("Подключение закрыто");
                        res.sendStatus(503);
                    }
                });*/
                DB.plainEndConn(connection);
                res.sendStatus(503);
            }
            else {
            	connection.end(function(err) {
                    if (err) {
                        console.log(err); res.sendStatus(503);
                    }
                    else {
                        let conn2 = DB.createConn();
                        conn2.query("SELECT * from captchas WHERE id='" + results.insertId + "';",
                            function(err, results, fields) {
                                if (err) { console.log(err); DB.plainEndConn(conn2); res.sendStatus(500); }
                                else {
                                    DB.plainEndConn(conn2); uuid = results[0].uuid; res.cookie('captcha', uuid, { httpOnly: true }); res.json({image: captcha2.image});
                                }
                            }
                        );
                    }
                });
            }
        }
    );
});

/*app.get('/test', session({ name: 'captcha', secret: config.secret, resave: false, saveUninitialized: false, store: sessionStore, cookie: { secure: false } }),
	function(req, res, next) {
		res.send(req.session.captcha);
});*/

/*app.use("/profile", function(request, response) {
	response.render("profile", {
        categories: false,
        page: "profile"
    });
});*/

app.use(express.static('public'));

app.use(function(request, response, next) {
	response.sendStatus(404);
});

app.listen(8080);