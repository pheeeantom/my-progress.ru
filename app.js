const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();

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

app.post("/ok", urlencodedParser, function(request, response, next) {
	console.log(request.body);
	next();
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

app.listen(3000);