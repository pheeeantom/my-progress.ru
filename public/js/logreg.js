var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormBar = function (_React$Component) {
	_inherits(FormBar, _React$Component);

	function FormBar(props) {
		_classCallCheck(this, FormBar);

		var _this = _possibleConstructorReturn(this, (FormBar.__proto__ || Object.getPrototypeOf(FormBar)).call(this, props));

		_initialiseProps.call(_this);

		var active = [true, false];
		_this.state = { isActive: active };
		_this.check = _this.check.bind(_this);
		return _this;
	}

	_createClass(FormBar, [{
		key: "render",
		value: function render() {
			var classLink = "btn shadow-none";
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "text-center" },
					React.createElement("input", { type: "checkbox", className: "btn-check", id: "btn-check-login", onClick: this.check.bind(this, 0) }),
					React.createElement(
						"label",
						{ className: this.state.isActive[0] ? classLink + " checked" : classLink, htmlFor: "btn-check-login" },
						"\u0412\u043E\u0439\u0442\u0438"
					),
					React.createElement(
						"pre",
						{ className: "d-inline" },
						" | "
					),
					React.createElement("input", { type: "checkbox", className: "btn-check", id: "btn-check-registration", onClick: this.check.bind(this, 1) }),
					React.createElement(
						"label",
						{ className: this.state.isActive[1] ? classLink + " checked" : classLink, htmlFor: "btn-check-registration" },
						"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F"
					)
				),
				React.createElement(Login, { isActive: this.state.isActive[0] }),
				React.createElement(Registration, { isActive: this.state.isActive[1] })
			);
		}
	}]);

	return FormBar;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
	var _this12 = this;

	this.check = function (num) {
		if (num == 0) {
			active = [true, false];
		} else if (num == 1) {
			active = [false, true];
		}
		_this12.setState({ isActive: active });
	};
};

var Login = function (_React$Component2) {
	_inherits(Login, _React$Component2);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this2 = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this2.state = { first: true, disabled: true };
		_this2.showTips = _this2.showTips.bind(_this2);
		_this2.manipulteSubmit = _this2.manipulteSubmit.bind(_this2);
		_this2.email = React.createRef();
		_this2.password = React.createRef();
		return _this2;
	}

	_createClass(Login, [{
		key: "showTips",
		value: function showTips() {
			if (this.state.first) {
				this.setState({ first: false });
				this.email.current.showTip();
				this.password.current.showTip();
			}
		}
	}, {
		key: "manipulteSubmit",
		value: function manipulteSubmit() {
			if (this.email.current.state.isPassed && this.password.current.state.isPassed) {
				this.setState({ disabled: false });
			} else {
				this.setState({ disabled: true });
			}
		}
	}, {
		key: "render",
		value: function render() {
			var visible = void 0;
			if (!this.props.isActive) {
				visible = "d-none";
			} else {
				visible = null;
			}
			return React.createElement(
				"form",
				{ className: visible + " log pb-4", action: "login", method: "post", autoComplete: "off" },
				React.createElement(Email, { ref: this.email, showTips: this.showTips, manipulteSubmit: this.manipulteSubmit, emailId: "email-log" }),
				React.createElement(Password, { ref: this.password, showTips: this.showTips, manipulteSubmit: this.manipulteSubmit, passId: "pass-log" }),
				React.createElement(
					"div",
					{ className: "text-center" },
					React.createElement(
						"button",
						{ type: "submit", className: "btn", disabled: this.state.disabled },
						"\u0412\u043E\u0439\u0442\u0438"
					)
				)
			);
		}
	}]);

	return Login;
}(React.Component);

var Registration = function (_React$Component3) {
	_inherits(Registration, _React$Component3);

	function Registration(props) {
		_classCallCheck(this, Registration);

		var _this3 = _possibleConstructorReturn(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).call(this, props));

		_this3.state = { first: true, disabled: true };
		_this3.showTips = _this3.showTips.bind(_this3);
		_this3.manipulteSubmit = _this3.manipulteSubmit.bind(_this3);
		_this3.checkPassIdentity = _this3.checkPassIdentity.bind(_this3);
		_this3.nickname = React.createRef();
		_this3.email = React.createRef();
		_this3.password = React.createRef();
		_this3.password2 = React.createRef();
		return _this3;
	}

	_createClass(Registration, [{
		key: "showTips",
		value: function showTips() {
			if (this.state.first) {
				this.setState({ first: false });
				this.nickname.current.showTip();
				this.email.current.showTip();
				this.password.current.showTip();
				//this.password2.current.showTip();
			}
		}
	}, {
		key: "manipulteSubmit",
		value: function manipulteSubmit() {
			if (this.nickname.current.state.isPassed && this.email.current.state.isPassed && this.password.current.state.isPassed && this.password2.current.state.isPassed) {
				this.setState({ disabled: false });
			} else {
				this.setState({ disabled: true });
			}
		}
	}, {
		key: "checkPassIdentity",
		value: function checkPassIdentity() {
			this.password2.current.checkPassIdentity();
		}
	}, {
		key: "render",
		value: function render() {
			var visible = void 0;
			if (!this.props.isActive) {
				visible = "d-none";
			} else {
				visible = null;
			}
			return React.createElement(
				"form",
				{ className: visible + " reg pb-4", action: "registrate", method: "post" },
				React.createElement(Nickname, { ref: this.nickname, showTips: this.showTips, manipulteSubmit: this.manipulteSubmit }),
				React.createElement(Email, { ref: this.email, showTips: this.showTips, manipulteSubmit: this.manipulteSubmit, emailId: "email-reg" }),
				React.createElement(Password, { ref: this.password, showTips: this.showTips, manipulteSubmit: this.manipulteSubmit, passId: "pass-first", checkPassIdentity: this.checkPassIdentity }),
				React.createElement(Password2, { ref: this.password2, showTips: this.showTips, manipulteSubmit: this.manipulteSubmit, passId: "pass-second", passIdBind: "pass-first" }),
				React.createElement(
					"div",
					{ className: "text-center" },
					React.createElement(
						"button",
						{ type: "submit", className: "btn", disabled: this.state.disabled },
						"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F"
					)
				)
			);
		}
	}]);

	return Registration;
}(React.Component);

var Email = function (_React$Component4) {
	_inherits(Email, _React$Component4);

	function Email(props) {
		_classCallCheck(this, Email);

		var _this4 = _possibleConstructorReturn(this, (Email.__proto__ || Object.getPrototypeOf(Email)).call(this, props));

		_this4.state = { isPassed: true };
		_this4.handleInput = _this4.handleInput.bind(_this4);
		_this4.handleFocus = _this4.handleFocus.bind(_this4);
		_this4.showTip = _this4.showTip.bind(_this4);
		return _this4;
	}

	_createClass(Email, [{
		key: "showTip",
		value: function showTip() {
			this.setState({ isPassed: false });
		}
	}, {
		key: "handleInput",
		value: function handleInput(event) {
			var _this5 = this;

			this.props.showTips();
			if (event.target.value.match(/^[a-z0-9_.-]+@[a-z0-9-]+\.[a-z]{2,}$/)) {
				this.setState({ isPassed: true }, function () {
					return _this5.props.manipulteSubmit();
				});
			} else {
				this.setState({ isPassed: false }, function () {
					return _this5.props.manipulteSubmit();
				});
			}
		}
	}, {
		key: "handleFocus",
		value: function handleFocus(event) {
			event.target.removeAttribute('readonly');
		}
	}, {
		key: "render",
		value: function render() {
			var classLink = "form-text text-danger";
			return React.createElement(
				"div",
				{ className: "form-group" },
				React.createElement(
					"label",
					{ htmlFor: this.props.emailId },
					"Email"
				),
				React.createElement("input", { onInput: this.handleInput, type: "text", id: this.props.emailId, className: "form-control", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email", "aria-describedby": "emailError-log", name: "email", onFocus: this.handleFocus, readOnly: true, autoComplete: "off" }),
				React.createElement(
					"small",
					{ className: this.state.isPassed ? classLink + " d-none" : classLink },
					"Email \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0432 \u0442\u0430\u043A\u043E\u043C \u0444\u043E\u0440\u043C\u0430\u0442\u0435: ivanov@domain.domain"
				)
			);
		}
	}]);

	return Email;
}(React.Component);

var Nickname = function (_React$Component5) {
	_inherits(Nickname, _React$Component5);

	function Nickname(props) {
		_classCallCheck(this, Nickname);

		var _this6 = _possibleConstructorReturn(this, (Nickname.__proto__ || Object.getPrototypeOf(Nickname)).call(this, props));

		_this6.state = { isPassed: true };
		_this6.handleInput = _this6.handleInput.bind(_this6);
		_this6.handleFocus = _this6.handleFocus.bind(_this6);
		_this6.showTip = _this6.showTip.bind(_this6);
		return _this6;
	}

	_createClass(Nickname, [{
		key: "showTip",
		value: function showTip() {
			this.setState({ isPassed: false });
		}
	}, {
		key: "handleInput",
		value: function handleInput(event) {
			var _this7 = this;

			this.props.showTips();
			if (event.target.value.match(/^.{2,}$/)) {
				//setState - асинхронная функция поэтому чтобы использовать результат ее выполнения нужно
				//запускать функцию после нее в аргументах
				this.setState({ isPassed: true }, function () {
					return _this7.props.manipulteSubmit();
				});
			} else {
				this.setState({ isPassed: false }, function () {
					return _this7.props.manipulteSubmit();
				});
			}
		}
	}, {
		key: "handleFocus",
		value: function handleFocus(event) {
			event.target.removeAttribute('readonly');
		}
	}, {
		key: "render",
		value: function render() {
			var classLink = "form-text text-danger";
			return React.createElement(
				"div",
				{ className: "form-group" },
				React.createElement(
					"label",
					{ htmlFor: "nickname" },
					"\u041D\u0438\u043A"
				),
				React.createElement("input", { onInput: this.handleInput, type: "text", id: "nickname", className: "form-control", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0438\u043A", "aria-describedby": "nicknameError-reg", name: "nickname", onFocus: this.handleFocus, readOnly: true, autoComplete: "off" }),
				React.createElement(
					"small",
					{ className: this.state.isPassed ? classLink + " d-none" : classLink },
					"\u041D\u0438\u043A \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0441\u0442\u043E\u044F\u0442\u044C \u043C\u0438\u043D\u0438\u043C\u0443\u043C \u0438\u0437 \u0434\u0432\u0443\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
				)
			);
		}
	}]);

	return Nickname;
}(React.Component);

var Password = function (_React$Component6) {
	_inherits(Password, _React$Component6);

	function Password(props) {
		_classCallCheck(this, Password);

		var _this8 = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this, props));

		_this8.state = { isPassed: true, passVisible: false };
		_this8.handleInput = _this8.handleInput.bind(_this8);
		_this8.handleFocus = _this8.handleFocus.bind(_this8);
		_this8.handleClick = _this8.handleClick.bind(_this8);
		_this8.showTip = _this8.showTip.bind(_this8);
		return _this8;
	}

	_createClass(Password, [{
		key: "showTip",
		value: function showTip() {
			this.setState({ isPassed: false });
		}
	}, {
		key: "handleInput",
		value: function handleInput(event) {
			var _this9 = this;

			this.props.showTips();
			if (this.props.passId.includes("first")) this.props.checkPassIdentity();
			if (event.target.value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$/)) {
				this.setState({ isPassed: true }, function () {
					return _this9.props.manipulteSubmit();
				});
			} else {
				this.setState({ isPassed: false }, function () {
					return _this9.props.manipulteSubmit();
				});
			}
		}
	}, {
		key: "handleFocus",
		value: function handleFocus(event) {
			event.target.removeAttribute('readonly');
		}
	}, {
		key: "handleClick",
		value: function handleClick(event) {
			if (event.target.className.includes("open")) {
				this.setState({ passVisible: false });
				event.target.parentNode.getElementsByClassName("password")[0].type = "password";
			} else {
				this.setState({ passVisible: true });
				event.target.parentNode.getElementsByClassName("password")[0].type = "text";
			}
		}
	}, {
		key: "render",
		value: function render() {
			var classLink = "form-text text-danger";
			var visible = void 0;
			if (this.state.passVisible) {
				visible = [null, "d-none"];
			} else {
				visible = ["d-none", null];
			}
			return React.createElement(
				"div",
				{ className: this.props.passId.includes("log") ? "form-group pb-4" : "form-group" },
				React.createElement(
					"label",
					{ htmlFor: this.props.passId },
					"\u041F\u0430\u0440\u043E\u043B\u044C"
				),
				React.createElement(
					"div",
					{ style: { display: "flex" } },
					React.createElement("input", { id: this.props.passId, onInput: this.handleInput, type: "password", className: "form-control password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", "aria-describedby": "passwordError-log", name: "password", onFocus: this.handleFocus, readOnly: true, autoComplete: "off" }),
					React.createElement("img", { onClick: this.handleClick, className: "open " + visible[0], src: "/img/eye.svg" }),
					React.createElement("img", { onClick: this.handleClick, src: "/img/eye-close.svg", className: "close " + visible[1] })
				),
				React.createElement(
					"small",
					{ className: this.state.isPassed ? classLink + " d-none" : classLink },
					"\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0441\u0442\u043E\u044F\u0442\u044C \u0438\u0437 \u043C\u0438\u043D\u0438\u043C\u0443\u043C 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043B\u0430\u0442\u0438\u043D\u0441\u043A\u0438\u0435 \u0431\u043E\u043B\u044C\u0448\u0438\u0435 \u0438 \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0435 \u0431\u0443\u043A\u0432\u044B, \u0446\u0438\u0444\u0440\u044B \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u044B: !, @, #, $, %, ^, &, *"
				)
			);
		}
	}]);

	return Password;
}(React.Component);

var Password2 = function (_Password) {
	_inherits(Password2, _Password);

	function Password2(props) {
		_classCallCheck(this, Password2);

		var _this10 = _possibleConstructorReturn(this, (Password2.__proto__ || Object.getPrototypeOf(Password2)).call(this, props));

		_this10.checkPassIdentity = _this10.checkPassIdentity.bind(_this10);
		return _this10;
	}

	_createClass(Password2, [{
		key: "handleInput",
		value: function handleInput(event) {
			var _this11 = this;

			this.props.showTips();
			if (event.target.value === document.getElementById(this.props.passIdBind).value) {
				this.setState({ isPassed: true }, function () {
					return _this11.props.manipulteSubmit();
				});
			} else {
				this.setState({ isPassed: false }, function () {
					return _this11.props.manipulteSubmit();
				});
			}
		}
	}, {
		key: "checkPassIdentity",
		value: function checkPassIdentity() {
			if (document.getElementById(this.props.passId).value === document.getElementById(this.props.passIdBind).value) {
				this.setState({ isPassed: true });
			} else {
				this.setState({ isPassed: false });
			}
			//this.props.manipulteSubmit();
		}
	}, {
		key: "render",
		value: function render() {
			var classLink = "form-text text-danger";
			var visible = void 0;
			if (this.state.passVisible) {
				visible = [null, "d-none"];
			} else {
				visible = ["d-none", null];
			}
			return React.createElement(
				"div",
				{ className: "form-group pb-4" },
				React.createElement(
					"label",
					{ htmlFor: this.props.passId },
					"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C"
				),
				React.createElement(
					"div",
					{ style: { display: "flex" } },
					React.createElement("input", { id: this.props.passId, onInput: this.handleInput, type: "password", className: "form-control password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", "aria-describedby": "passwordError-log", name: "password", onFocus: this.handleFocus, readOnly: true, autoComplete: "off" }),
					React.createElement("img", { onClick: this.handleClick, className: "open " + visible[0], src: "/img/eye.svg" }),
					React.createElement("img", { onClick: this.handleClick, src: "/img/eye-close.svg", className: "close " + visible[1] })
				),
				React.createElement(
					"small",
					{ className: this.state.isPassed ? classLink + " d-none" : classLink },
					"\u041F\u0430\u0440\u043E\u043B\u0438 \u0434\u043E\u043B\u0436\u043D\u044B \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0442\u044C!"
				)
			);
		}
	}]);

	return Password2;
}(Password);

ReactDOM.render(React.createElement(FormBar, null), document.getElementById('logreg-form'));

/*<div class="text-center">
        <input type="checkbox" class="btn-check" id="btn-check-login">
                <label class="btn shadow-none checked" for="btn-check-login">Войти</label>
                |
                <input type="checkbox" class="btn-check" id="btn-check-registration">
                <label class="btn shadow-none" for="btn-check-registration">Зарегистрироваться</label>
    </div>
  <form class="log pb-4" action="ok" method="post" autocomplete="off">
              <div class="form-group">
                <label for="email-log">Email</label>
                <input type="text" id="email-log" class="form-control" placeholder="Введите email" aria-describedby="emailError-log" name="email" onfocus="this.removeAttribute('readonly');" readonly autocomplete="off">
                <small id="emailError-log" class="form-text text-danger d-none">Email должен быть в таком формате: ivanov@domain.domain</small>
              </div>
              <div class="form-group pb-4">
                <label for="password-log">Пароль</label>
                <div style="display:flex">
                    <input type="password" class="form-control" id="password-log" placeholder="Пароль" aria-describedby="passwordError-log" name="password" onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"><img id="pass-log-open" class="d-none" src="/img/eye.svg"><img id="pass-log-close" src="/img/eye-close.svg">
                </div>
                <small id="passwordError-log" class="form-text text-danger d-none">Пароль должен состоять из минимум 8 символов, может содержать латинские большие и маленькие буквы, цифры и специальные символы: %, *, (, ),?, @, #, $, ~"</small>
              </div>
              <div class="text-center">
                <button type="submit" class="btn" id="submit-log">Подтвердить</button>
                </div>
            </form>
            <form class="d-none reg pb-4" action="ok" method="post">
              <div class="form-group">
                <label for="nickname">Ник</label>
                <input type="text" id="nickname" class="form-control" placeholder="Введите ник" aria-described-by="nicknameError-reg" name="nickname" onfocus="this.removeAttribute('readonly');" readonly autocomplete="off">
                <small id="nicknameError-reg" class="form-text text-danger d-none">Ник должен состоять минимум из двух символов</small>
              </div>
              <div class="form-group">
                <label for="email-reg">Email</label>
                <input type="text" id="email-reg" class="form-control" placeholder="Введите email" aria-described-by="emailError-reg" name="email" onfocus="this.removeAttribute('readonly');" readonly autocomplete="off">
                <small id="emailError-reg" class="form-text text-danger d-none">Email должен быть в таком формате: ivanov@domain.domain</small>
              </div>
              <div class="form-group">
                <label for="password-reg">Пароль</label>
                <div style="display:flex">
                    <input type="password" class="form-control" id="password-reg" placeholder="Пароль" aria-described-by="passwordError-reg" name="password" onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"><img id="pass-reg-open" class="d-none" src="/img/eye.svg"><img id="pass-reg-close" src="/img/eye-close.svg">
                </div>
                <small id="passwordError-reg" class="form-text text-danger d-none">Пароль должен состоять из минимум 8 символов, может содержать латинские большие и маленькие буквы, цифры и специальные символы: %, *, (, ),?, @, #, $, ~</small>
              </div>
              <div class="form-group pb-4">
                <label for="password-second">Подтвердить пароль</label>
                <div style="display:flex">
                    <input type="password" class="form-control" id="password-second" placeholder="Подтверждение пароля" aria-described-by="passwordSecondError-reg" onfocus="this.removeAttribute('readonly');" readonly autocomplete="off"><img id="pass-reg-sec-open" class="d-none" src="/img/eye.svg"><img id="pass-reg-sec-close" src="/img/eye-close.svg">
                </div>
                <small id="passwordSecondError-reg" class="form-text text-danger d-none">Пароли должны совпадать!</small>
              </div>
              <div class="text-center">
                <button type="submit" class="btn" id="submit-reg">Подтвердить</button>
                </div>
            </form>*/