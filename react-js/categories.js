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
		active.fill(false, 0, Object.keys(categories).length);
	    this.state = {isActive: active, isReset: true};
		this.output = this.output.bind(this);
		this.reset = this.reset.bind(this);
	}

	output = num => {
	    var active = [];
	    active.fill(false, 0, Object.keys(categories).length);
	    active[num] = !this.state.isActive[num];
	    if (active[num] == false) {
	    	var reset = true;
	    }
	    this.setState({ isActive : active, isReset: reset});
	}

	reset() {
		var active = [];
		active.fill(false, 0, Object.keys(categories).length);
	    this.setState({isActive : active, isReset: true});
	}

	render() {
		var rows = [];
	    for (var i = 0; i < Object.keys(categories).length; i++) {
	      rows.push(<Category key={i.toString()} isActive={this.state.isActive[i]} name={Object.keys(categories)[i]} links={categories[Object.keys(categories)[i]]} func={this.output}/>);
	    }
	    var classLink = "dropdown-item";
		if (this.state.isReset) {
			classLink += " active";
		}
		return (
			<div className="dropdown">
			  {rows}
			  <button className={classLink} id="without" onClick={this.reset}>Без категорий</button>
			</div>
		);
	}
}

class Category extends React.Component {
	constructor(props) {
		super(props);
		var active = [];
		active.fill(false, 0, categories[this.props.name].length);
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
	    active.fill(false, 0, categories[this.props.name].length);
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
	      rows.push(<Link key={i.toString()} isActive={this.state.isActive[i]} name={this.props.links[i]} num={i} func={this.output}/>);
	    }
	    var classLink = "dropdown-set";
	    if (this.props.isActive) {
	    	classLink += " active";
	    }
		return (
			<div className={classLink}>
				<button onClick={this.handleClick} className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.props.isActive}>
				  {this.props.name}
				</button>
				<hr style={{display: display, marginBottom: 10, marginTop: 0}}></hr>
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