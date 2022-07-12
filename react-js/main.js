var links = [
  "Подписки",
  "Новые",
  "Популярные"
];

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    var active = [true];
    //active.fill
    for (var i = 1; i < links.length; i++) {
      active.push(false);
    }
    this.state = {isActive: active};
    this.output = this.output.bind(this);
  }

  output = num => {
    var active = [];
    //active.fill
    for (var i = 0; i < links.length; i++) {
      active.push(false);
    }
    active[num] = true;
    this.setState({ isActive : active});
  }

  render() {
    var rows = [];
    for (var i = 0; i < links.length; i++) {
      rows.push(<Nav key={i.toString()} isActive={this.state.isActive[i]} name={links[i]} func={this.output}/>);
    }
    return (
      <span>
        {rows}
        <LogReg/>
      </span>
    );
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props);

    // Эта привязка обязательна для работы `this` в колбэке.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var num;
    for (var i = 0; i < links.length; i++) {
      if (this.props.name == links[i]) {
        num = i;
      }
    }
    this.props.func(num);
  }

  render() {
    var ariaCurrent = this.props.isActive ? "page" : null;
    var className = 'nav-link';
    if (this.props.isActive) {
      className += ' active';
    }
    return (
      <li className="nav-item d-block d-sm-inline-block"><button className={className} aria-current={ariaCurrent} onClick={this.handleClick}>{this.props.name}</button></li>
    );
  }
}

class LogReg extends React.Component {
  render() {
    return (
      <li className="nav-item d-block d-sm-inline-block px-3"><a href="#" className="nav-link" id="logreg">Вход/Регистрация</a></li>
    );
  }
}

ReactDOM.render(
  <NavBar />,
  document.getElementById('nav')
);