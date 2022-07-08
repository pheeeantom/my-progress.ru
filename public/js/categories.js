var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 *
 *  Когда я буду брать из бд - хобби и изменение жизни нужно будет засунуть в квадратные скобки
 *  и засунуть туда переменную из бд.
 *
 *  bind() используется потому что при использовании колбэков контекст теряется и он связывает
 *  вызывающий объект с this. Без bind() получаетсяlet hi = this.output; output(); без контекста
 *  
*/

var categories = {
	"Хобби": ["Научные", "Творческие", "Активные", "Остальное"],
	"Изменение жизни": ["Отказ от вредного", "Полезные привычки", "Движение к цели", "Карьера", "Остальное"]
};

var CategoriesBar = function (_React$Component) {
	_inherits(CategoriesBar, _React$Component);

	function CategoriesBar(props) {
		_classCallCheck(this, CategoriesBar);

		var _this = _possibleConstructorReturn(this, (CategoriesBar.__proto__ || Object.getPrototypeOf(CategoriesBar)).call(this, props));

		_initialiseProps.call(_this);

		var active = [];
		//active.fill
		for (var i = 0; i < Object.keys(categories).length; i++) {
			active.push(false);
		}
		_this.state = { isActive: active, isReset: true };
		_this.output = _this.output.bind(_this);
		_this.reset = _this.reset.bind(_this);
		return _this;
	}

	_createClass(CategoriesBar, [{
		key: "reset",
		value: function reset() {
			var active = [];
			//active.fill
			for (var i = 0; i < Object.keys(categories).length; i++) {
				active.push(false);
			}
			this.setState({ isActive: active, isReset: true });
		}
	}, {
		key: "render",
		value: function render() {
			var rows = [];
			for (var i = 0; i < Object.keys(categories).length; i++) {
				rows.push(React.createElement(Category, { isActive: this.state.isActive[i], name: Object.keys(categories)[i], links: categories[Object.keys(categories)[i]], func: this.output }));
			}
			var classLink = "dropdown-item";
			if (this.state.isReset) {
				classLink += " active";
			}
			return React.createElement(
				"div",
				{ className: "dropdown" },
				rows,
				React.createElement(
					"button",
					{ className: classLink, onClick: this.reset },
					"\u0411\u0435\u0437 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439"
				)
			);
		}
	}]);

	return CategoriesBar;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
	var _this4 = this;

	this.output = function (num) {
		var active = [];
		//active.fill
		for (var i = 0; i < Object.keys(categories).length; i++) {
			active.push(false);
		}
		active[num] = !_this4.state.isActive[num];
		_this4.setState({ isActive: active, isReset: false });
	};
};

var Category = function (_React$Component2) {
	_inherits(Category, _React$Component2);

	function Category(props) {
		_classCallCheck(this, Category);

		var _this2 = _possibleConstructorReturn(this, (Category.__proto__ || Object.getPrototypeOf(Category)).call(this, props));

		_initialiseProps2.call(_this2);

		var active = [];
		//active.fill
		for (var i = 0; i < categories[_this2.props.name].length; i++) {
			active.push(false);
		}
		active[0] = true;
		_this2.state = { isActive: active };
		_this2.handleClick = _this2.handleClick.bind(_this2);
		_this2.output = _this2.output.bind(_this2);
		return _this2;
	}

	_createClass(Category, [{
		key: "getNum",
		value: function getNum() {
			for (var i = 0; i < Object.keys(categories).length; i++) {
				if (this.props.name == Object.keys(categories)[i]) {
					return i;
				}
			}
		}
	}, {
		key: "handleClick",
		value: function handleClick() {
			var num = this.getNum();
			this.props.func(num);
		}
	}, {
		key: "render",
		value: function render() {
			var display = 'none';
			if (this.props.isActive) {
				display = 'block';
			}
			var rows = [];
			for (var i = 0; i < this.props.links.length; i++) {
				rows.push(React.createElement(Link, { isActive: this.state.isActive[i], name: this.props.links[i], num: i, func: this.output }));
			}
			return React.createElement(
				"div",
				null,
				React.createElement(
					"button",
					{ onClick: this.handleClick, className: "btn dropdown-toggle", type: "button", id: "dropdownMenuButton", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": this.props.isActive },
					this.props.name
				),
				React.createElement(
					"div",
					{ style: { display: display }, className: "px-2" },
					rows
				)
			);
		}
	}]);

	return Category;
}(React.Component);

var _initialiseProps2 = function _initialiseProps2() {
	var _this5 = this;

	this.output = function (num) {
		var active = [];
		//active.fill
		for (var i = 0; i < categories[_this5.props.name].length; i++) {
			active.push(false);
		}
		active[num] = true;
		_this5.setState({ isActive: active });
	};
};

var Link = function (_React$Component3) {
	_inherits(Link, _React$Component3);

	function Link(props) {
		_classCallCheck(this, Link);

		var _this3 = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props));

		_this3.handleClick = _this3.handleClick.bind(_this3);
		return _this3;
	}

	_createClass(Link, [{
		key: "handleClick",
		value: function handleClick() {
			this.props.func(this.props.num);
		}
	}, {
		key: "render",
		value: function render() {
			var classLink = "dropdown-item";
			if (this.props.isActive) {
				classLink += " active";
			}
			return React.createElement(
				"button",
				{ className: classLink, onClick: this.handleClick },
				this.props.name
			);
		}
	}]);

	return Link;
}(React.Component);

ReactDOM.render(React.createElement(CategoriesBar, null), document.getElementById('categories'));