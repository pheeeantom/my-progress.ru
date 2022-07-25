class FormBar extends React.Component {
	constructor(props) {
		super(props);
		let active = [true, false];
		this.state = {isActive: active};
		this.check = this.check.bind(this);
	}
	check = num => {
	    if (num == 0) {
	    	active = [true, false];
	    }
	    else if (num == 1) {
	    	active = [false, true];
	    }
	    this.setState({ isActive : active});
	}
	render() {
		let classLink = "btn shadow-none";
		return (
			<div>
				<div className="text-center">
			        <input type="checkbox" className="btn-check" id="btn-check-login" onClick={this.check.bind(this, 0)}/>
			        <label className={this.state.isActive[0] ? classLink + " checked" : classLink} htmlFor="btn-check-login">Войти</label>
			        <pre className="d-inline"> | </pre>
			        <input type="checkbox" className="btn-check" id="btn-check-registration" onClick={this.check.bind(this, 1)}/>
			        <label className={this.state.isActive[1] ? classLink + " checked" : classLink} htmlFor="btn-check-registration">Зарегистрироваться</label>
			    </div>
			    <Login isActive={this.state.isActive[0]}/>
			    <Registration isActive={this.state.isActive[1]}/>
			</div>
		);
	}
}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {first: true, disabled: true};
		this.showTips = this.showTips.bind(this);
		this.manipulteSubmit = this.manipulteSubmit.bind(this);
		this.email = React.createRef();
		this.password = React.createRef();
	}
	showTips() {
		if (this.state.first) {
			this.setState({first: false});
			this.email.current.showTip();
			this.password.current.showTip();
		}
	}
	manipulteSubmit() {
		if (this.email.current.state.isPassed && this.password.current.state.isPassed) {
			this.setState({disabled: false});
		}
		else {
			this.setState({disabled: true});
		}
	}
	render() {
		let visible;
		if (!this.props.isActive) {
			visible = "d-none";
		}
		else {
			visible = null;
		}
		return(
			<form className={visible + " log pb-4"} action="login" method="post" autoComplete="off">
				<Email ref={this.email} showTips={this.showTips} manipulteSubmit={this.manipulteSubmit} emailId="email-log" />
				<Password ref={this.password} showTips={this.showTips} manipulteSubmit={this.manipulteSubmit} passId="pass-log" />
				<div className="text-center">
                	<button type="submit" className="btn" disabled={this.state.disabled}>Войти</button>
                </div>
			</form>
		);
	}
}

class Registration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {first: true, disabled: true};
		this.showTips = this.showTips.bind(this);
		this.manipulteSubmit = this.manipulteSubmit.bind(this);
		this.checkPassIdentity = this.checkPassIdentity.bind(this);
		this.nickname = React.createRef();
		this.email = React.createRef();
		this.password = React.createRef();
		this.password2 = React.createRef();
	}
	showTips() {
		if (this.state.first) {
			this.setState({first: false});
			this.nickname.current.showTip();
			this.email.current.showTip();
			this.password.current.showTip();
			//this.password2.current.showTip();
		}
	}
	manipulteSubmit() {
		if (this.nickname.current.state.isPassed && this.email.current.state.isPassed
			&& this.password.current.state.isPassed && this.password2.current.state.isPassed) {
			this.setState({disabled: false});
		}
		else {
			this.setState({disabled: true});
		}
	}
	checkPassIdentity() {
		this.password2.current.checkPassIdentity();
	}
	render() {
		let visible;
		if (!this.props.isActive) {
			visible = "d-none";
		}
		else {
			visible = null;
		}
		return(
			<form className={visible + " reg pb-4"} action="registrate" method="post">
				<Nickname ref={this.nickname} showTips={this.showTips} manipulteSubmit={this.manipulteSubmit} />
				<Email ref={this.email} showTips={this.showTips} manipulteSubmit={this.manipulteSubmit} emailId="email-reg" />
				<Password ref={this.password} showTips={this.showTips} manipulteSubmit={this.manipulteSubmit} passId="pass-first" checkPassIdentity={this.checkPassIdentity} />
				<Password2 ref={this.password2} showTips={this.showTips} manipulteSubmit={this.manipulteSubmit} passId="pass-second" passIdBind="pass-first" />
				<div className="text-center">
                	<button type="submit" className="btn" disabled={this.state.disabled}>Зарегистрироваться</button>
                </div>
			</form>
		);
	}
}

class Email extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isPassed: true};
		this.handleInput = this.handleInput.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.showTip = this.showTip.bind(this);
	}
	showTip() {
		this.setState({isPassed: false});
	}
	handleInput(event) {
		this.props.showTips();
		if (event.target.value.match(/^[a-z0-9_.-]+@[a-z0-9-]+\.[a-z]{2,}$/)) {
			this.setState({isPassed: true}, () => this.props.manipulteSubmit());
		}
		else {
			this.setState({isPassed: false}, () => this.props.manipulteSubmit());
		}
	}
	handleFocus(event) {
		event.target.removeAttribute('readonly');
	}
	render() {
		let classLink = "form-text text-danger";
		return (
			<div className="form-group">
                <label htmlFor={this.props.emailId}>Email</label>
                <input onInput={this.handleInput} type="text" id={this.props.emailId} className="form-control" placeholder="Введите email" aria-describedby="emailError-log" name="email" onFocus={this.handleFocus} readOnly autoComplete="off"/>
                <small className={this.state.isPassed ? classLink + " d-none" : classLink}>Email должен быть в таком формате: ivanov@domain.domain</small>
            </div>
		);
	}
}

class Nickname extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isPassed: true};
		this.handleInput = this.handleInput.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.showTip = this.showTip.bind(this);
	}
	showTip() {
		this.setState({isPassed: false});
	}
	handleInput(event) {
		this.props.showTips();
		if (event.target.value.match(/^.{2,}$/)) {
			//setState - асинхронная функция поэтому чтобы использовать результат ее выполнения нужно
			//запускать функцию после нее в аргументах
			this.setState({isPassed: true}, () => this.props.manipulteSubmit());
		}
		else {
			this.setState({isPassed: false}, () => this.props.manipulteSubmit());
		}
	}
	handleFocus(event) {
		event.target.removeAttribute('readonly');
	}
	render() {
		let classLink = "form-text text-danger";
		return (
			<div className="form-group">
				<label htmlFor="nickname">Ник</label>
				<input onInput={this.handleInput} type="text" id="nickname" className="form-control" placeholder="Введите ник" aria-describedby="nicknameError-reg" name="nickname" onFocus={this.handleFocus} readOnly autoComplete="off"/>
				<small className={this.state.isPassed ? classLink + " d-none" : classLink}>Ник должен состоять минимум из двух символов</small>
			</div>
		);
	}
}

class Password extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isPassed: true, passVisible: false};
		this.handleInput = this.handleInput.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.showTip = this.showTip.bind(this);
	}
	showTip() {
		this.setState({isPassed: false});
	}
	handleInput(event) {
		this.props.showTips();
		if (this.props.passId.includes("first"))
			this.props.checkPassIdentity();
		if (event.target.value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}$/)) {
			this.setState({isPassed: true}, () => this.props.manipulteSubmit());
		}
		else {
			this.setState({isPassed: false}, () => this.props.manipulteSubmit());
		}
	}
	handleFocus(event) {
		event.target.removeAttribute('readonly');
	}
	handleClick(event) {
		if (event.target.className.includes("open")) {
			this.setState({passVisible: false});
			event.target.parentNode.getElementsByClassName("password")[0].type = "password";
		}
		else {
			this.setState({passVisible: true});
			event.target.parentNode.getElementsByClassName("password")[0].type = "text";
		}
	}
	render() {
		let classLink = "form-text text-danger";
		let visible;
		if (this.state.passVisible) {
			visible = [null, "d-none"];
		}
		else {
			visible = ["d-none", null];
		}
		return (
			<div className={this.props.passId.includes("log") ? "form-group pb-4" : "form-group"}>
				<label htmlFor={this.props.passId}>Пароль</label>
				<div style={{display: "flex"}}>
				    <input id={this.props.passId} onInput={this.handleInput} type="password" className="form-control password" placeholder="Пароль" aria-describedby="passwordError-log" name="password" onFocus={this.handleFocus} readOnly autoComplete="off"/><img onClick={this.handleClick} className={"open " + visible[0]} src="/img/eye.svg"/><img onClick={this.handleClick} src="/img/eye-close.svg" className={"close " + visible[1]}/>
				</div>
				<small className={this.state.isPassed ? classLink + " d-none" : classLink}>Пароль должен состоять из минимум 8 символов, должен содержать латинские большие и маленькие буквы, цифры и специальные символы: !, @, #, $, %, ^, &, *</small>
			</div>
		);
	}
}

class Password2 extends Password {
	constructor(props) {
		super(props);
		this.checkPassIdentity = this.checkPassIdentity.bind(this);
	}
	handleInput(event) {
		this.props.showTips();
		if (event.target.value === document.getElementById(this.props.passIdBind).value) {
			this.setState({isPassed: true}, () => this.props.manipulteSubmit());
		}
		else {
			this.setState({isPassed: false}, () => this.props.manipulteSubmit());
		}
	}
	checkPassIdentity() {
		if (document.getElementById(this.props.passId).value === document.getElementById(this.props.passIdBind).value) {
			this.setState({isPassed: true});
		}
		else {
			this.setState({isPassed: false});
		}
		//this.props.manipulteSubmit();
	}
	render() {
		let classLink = "form-text text-danger";
		let visible;
		if (this.state.passVisible) {
			visible = [null, "d-none"];
		}
		else {
			visible = ["d-none", null];
		}
		return (
			<div className="form-group pb-4">
				<label htmlFor={this.props.passId}>Подтвердить пароль</label>
				<div style={{display: "flex"}}>
				    <input id={this.props.passId} onInput={this.handleInput} type="password" className="form-control password" placeholder="Пароль" aria-describedby="passwordError-log" name="password" onFocus={this.handleFocus} readOnly autoComplete="off"/><img onClick={this.handleClick} className={"open " + visible[0]} src="/img/eye.svg"/><img onClick={this.handleClick} src="/img/eye-close.svg" className={"close " + visible[1]}/>
				</div>
				<small className={this.state.isPassed ? classLink + " d-none" : classLink}>Пароли должны совпадать!</small>
			</div>
		);
	}
}

ReactDOM.render(
  <FormBar />,
  document.getElementById('logreg-form')
);

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