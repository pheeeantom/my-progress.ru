const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();
const User = require("./models/user");
const DB = require("./models/db");

const urlencodedParser = express.urlencoded({extended: false});

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

app.get("/", function(request, response) {
    response.render("index", {
        categories: true,
        page: "index"
    });
});

app.get("/logreg", function(request, response) {
	response.render("logreg", {
        categories: false,
        page: "logreg"
    });
});

app.post("/login", urlencodedParser, function(request, response, next) {
	console.log(request.body);
	response.redirect('/profile');
});

app.post("/registrate", urlencodedParser, function(request, response, next) {
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
		user.createUser(connection, response);
	}
	else {
		response.sendStatus(422);
	}
});

app.use("/profile", function(request, response) {
	response.render("profile", {
        categories: false,
        page: "profile"
    });
});

app.use(express.static('public'));

app.use(function(request, response, next) {
	response.sendStatus(404);
});

app.listen(8080);