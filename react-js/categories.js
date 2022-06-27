var categories = {
	"Хобби": [
		"Научные","Творческие","Активные","Остальное"
	],
	"Изменение жизни": [
		"Отказ от вредного","Полезные привычки","Движение к цели","Карьера","Остальное"
	]
};

class CategoriesBar extends React.Component {
	constructor(props) {
		super(props);
		var active = [];
	    for (var i = 0; i < Object.keys(categories).length; i++) {
	      active.push(false);
	    }
	    this.state = {isActive: active, isReset: true};
		this.output = this.output.bind(this);
		this.reset = this.reset.bind(this);
	}

	output = num => {
	    var active = [];
	    for (var i = 0; i < Object.keys(categories).length; i++) {
	      active.push(false);
	    }
	    active[num] = !this.state.isActive[num];
	    this.setState({ isActive : active, isReset: false});
	}

	reset() {
		var active = [];
	    for (var i = 0; i < Object.keys(categories).length; i++) {
	      active.push(false);
	    }
	    this.setState({isActive : active, isReset: true});
	}

	render() {
		var rows = [];
	    for (var i = 0; i < Object.keys(categories).length; i++) {
	      rows.push(<Category isActive={this.state.isActive[i]} name={Object.keys(categories)[i]} links={categories[Object.keys(categories)[i]]} func={this.output}/>);
	    }
	    var classLink = "dropdown-item";
		if (this.state.isReset) {
			classLink += " active";
		}
		return (
			<div className="dropdown">
			  {rows}
			  <button className={classLink} onClick={this.reset}>Без категорий</button>
			</div>
		);
	}
}

class Category extends React.Component {
	constructor(props) {
		super(props);
		var active = [];
	    for (var i = 0; i < categories[this.props.name].length; i++) {
	      active.push(false);
	    }
	    active[0] = true;
	    this.state = {isActive: active};
		this.handleClick = this.handleClick.bind(this);
		this.output = this.output.bind(this);
	}

	getNum() {
	    for (var i = 0; i < Object.keys(categories).length; i++) {
	      if (this.props.name == Object.keys(categories)[i]) {
	        return i;
	      }
	    }
	}

	handleClick() {
	    var num = this.getNum();
	    this.props.func(num);
  	}

  	output = num => {
	    var active = [];
	    for (var i = 0; i < categories[this.props.name].length; i++) {
	      active.push(false);
	    }
	    active[num] = true;
	    this.setState({ isActive : active});
	}

	render() {
		var display = 'none';
		if (this.props.isActive) {
			display = 'block';
		}
		var rows = [];
	    for (var i = 0; i < this.props.links.length; i++) {
	      rows.push(<Link isActive={this.state.isActive[i]} name={this.props.links[i]} num={i} func={this.output}/>);
	    }
		return (
			<div>
				<button onClick={this.handleClick} className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.props.isActive}>
				  {this.props.name}
				</button>
				<div style={{display: display}} className="px-2">
				  {rows}
				</div>
			</div>
		);
	}
}

class Link extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.func(this.props.num);
	}

	render() {
		var classLink = "dropdown-item";
		if (this.props.isActive) {
			classLink += " active";
		}
		return ( <button className={classLink} onClick={this.handleClick}>{this.props.name}</button> );
	}
}

ReactDOM.render(
  <CategoriesBar />,
  document.getElementById('categories')
);