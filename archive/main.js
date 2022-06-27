$("header .nav-link").on('click', function() {
	$("header .nav-link.active").removeClass("active");
	$(this).addClass("active");
});
$(".categories .nav-link").on('click', function() {
	$(".categories .nav-link.active").removeClass("active");
	$(this).addClass("active");
});