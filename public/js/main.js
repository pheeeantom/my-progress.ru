var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var links = ["Подписки", "Новые", "Популярные"];

var NavBar = function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar(props) {
    _classCallCheck(this, NavBar);

    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

    _initialiseProps.call(_this);

    var active = [true];
    active.fill(false, 1, links.length);
    _this.state = { isActive: active };
    _this.output = _this.output.bind(_this);
    return _this;
  }

  _createClass(NavBar, [{
    key: "render",
    value: function render() {
      var rows = [];
      for (var i = 0; i < links.length; i++) {
        rows.push(React.createElement(Nav, { key: i.toString(), isActive: this.state.isActive[i], name: links[i], func: this.output }));
      }
      return React.createElement(
        "span",
        null,
        rows,
        React.createElement(LogReg, null)
      );
    }
  }]);

  return NavBar;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.output = function (num) {
    var active = [];
    active.fill(false, 0, links.length);
    active[num] = true;
    _this4.setState({ isActive: active });
  };
};

var Nav = function (_React$Component2) {
  _inherits(Nav, _React$Component2);

  function Nav(props) {
    _classCallCheck(this, Nav);

    // Эта привязка обязательна для работы `this` в колбэке.
    var _this2 = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

    _this2.handleClick = _this2.handleClick.bind(_this2);
    return _this2;
  }

  _createClass(Nav, [{
    key: "handleClick",
    value: function handleClick() {
      var num;
      for (var i = 0; i < links.length; i++) {
        if (this.props.name == links[i]) {
          num = i;
        }
      }
      this.props.func(num);
    }
  }, {
    key: "render",
    value: function render() {
      var ariaCurrent = this.props.isActive ? "page" : null;
      var className = 'nav-link';
      if (this.props.isActive) {
        className += ' active';
      }
      return React.createElement(
        "li",
        { className: "nav-item d-block d-sm-inline-block" },
        React.createElement(
          "button",
          { className: className, "aria-current": ariaCurrent, onClick: this.handleClick },
          this.props.name
        )
      );
    }
  }]);

  return Nav;
}(React.Component);

var LogReg = function (_React$Component3) {
  _inherits(LogReg, _React$Component3);

  function LogReg() {
    _classCallCheck(this, LogReg);

    return _possibleConstructorReturn(this, (LogReg.__proto__ || Object.getPrototypeOf(LogReg)).apply(this, arguments));
  }

  _createClass(LogReg, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "li",
        { className: "nav-item d-block d-sm-inline-block px-3" },
        React.createElement(
          "a",
          { href: "#", className: "nav-link", id: "logreg" },
          "\u0412\u0445\u043E\u0434/\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"
        )
      );
    }
  }]);

  return LogReg;
}(React.Component);

ReactDOM.render(React.createElement(NavBar, null), document.getElementById('nav'));