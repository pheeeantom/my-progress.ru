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
	            if (page === "logreg") {
			    	return new hbs.SafeString('<link href="/css/logreg.css" rel="stylesheet">');
			    }
			    else {
			    	return new hbs.SafeString('');
			    }
	        },
	        script(page) {
	            if (page === "logreg") {
			    	return new hbs.SafeString('<script src="/js/logreg.js"></script>');
			    }
			    else {
			    	return new hbs.SafeString('');
			    }
	        }
	    }
	}
));
app.set('view engine', 'hbs');

app.get("/", function(request, response) {
    response.render("index", {
        categoriesVisible: true,
        page: "index"
    });
});

app.get("/logreg", function(request, response) {
	response.render("logreg", {
        categoriesVisible: false,
        page: "logreg"
    });
});

app.post("/ok", urlencodedParser, function(request, response, next) {
	console.log(request.body);
	next();
});

app.use("/profile", function(request, response) {
	response.render("profile", {
        categoriesVisible: false,
        page: "profile"
    });
});

app.use(express.static('public'));

app.use(function(request, response, next) {
	response.sendStatus(404);
});

app.listen(3000);