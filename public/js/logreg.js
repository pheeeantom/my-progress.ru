$(".btn-check").on('click', function() {
    $("label").removeClass("checked");
	$("label[for=" + $(this).attr("id") + "]").addClass("checked");
	if ($(this).attr("id").includes("log")) {
	    $("form.log").removeClass("d-none");
	    $("form.reg").addClass("d-none");
	}
	else {
	    $("form.reg").removeClass("d-none");
	    $("form.log").addClass("d-none");
	}
});
$("#submit-log").on('click', function() {
	var num = 0;
	if (!$("#email-log").val().match(/^[a-z0-9_.-]+@[a-z0-9-]+\.[a-z]{2,}$/)) {
		$("#emailError-log").removeClass("d-none");
	}
	else {
		$("#emailError-log").addClass("d-none");
		num++;
	}
	if (!$("#password-log").val().match(/^[a-z0-9A-Z%*()?@#$~]{6,}$/)) {
		$("#passwordError-log").removeClass("d-none");
	}
	else {
		$("#passwordError-log").addClass("d-none");
		num++;
	}
	if (num < 2) {
		return false;
	}
});
$("#submit-reg").on('click', function() {
	var num = 0;
	if (!$("#nickname").val().match(/^.{2,}$/)) {
		$("#nicknameError-reg").removeClass("d-none");
	}
	else {
		$("#nicknameError-reg").addClass("d-none");
		num++;
	}
	if (!$("#email-reg").val().match(/^[a-z0-9_.-]+@[a-z0-9-]+\.[a-z]{2,}$/)) {
		$("#emailError-reg").removeClass("d-none");
	}
	else {
		$("#emailError-reg").addClass("d-none");
		num++;
	}
	if (!$("#password-reg").val().match(/^[a-z0-9A-Z%*()?@#$~]{6,}$/)) {
		$("#passwordError-reg").removeClass("d-none");
	}
	else {
		$("#passwordError-reg").addClass("d-none");
		num++;
	}
	if ($("#password-reg").val() != $("#password-second").val()) {
		$("#passwordSecondError-reg").removeClass("d-none");
	}
	else {
		$("#passwordSecondError-reg").addClass("d-none");
		num++;
	}
	if (num < 4) {
		return false;
	}
});
$("#pass-log-open, #pass-log-close, #pass-reg-open, #pass-reg-close, #pass-reg-sec-open, #pass-reg-sec-close").on('click', function() {
	if ($(this).attr("id").includes("close")) {
		$("#" + $(this).attr("id").replace(/close/, "open")).removeClass("d-none");
		$(this).addClass("d-none");
		if ($(this).attr("id").includes("pass-log")) {
			$("#password-log").attr("type", "text");
		}
		else if ($(this).attr("id").includes("pass-reg-close")) {
			$("#password-reg").attr("type", "text");
		}
		else if ($(this).attr("id").includes("pass-reg-sec")) {
			$("#password-second").attr("type", "text");
		}
	}
	else {
		$("#" + $(this).attr("id").replace(/open/, "close")).removeClass("d-none");
		$(this).addClass("d-none");
		if ($(this).attr("id").includes("pass-log")) {
			$("#password-log").attr("type", "password");
		}
		else if ($(this).attr("id").includes("pass-reg-open")) {
			$("#password-reg").attr("type", "password");
		}
		else if ($(this).attr("id").includes("pass-reg-sec")) {
			$("#password-second").attr("type", "password");
		}
	}
});