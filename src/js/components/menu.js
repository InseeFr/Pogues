var React = require('react');
var locale = require('../stores/dictionary-store').getDictionary();

var Menu = React.createClass({

    getInitialState: function() {
        return {
            filter: ''
        }
    },
    _setFilter: function(event) {
        this.setState({
            filter: event.target.value
        })
    },
    _filter: function() {
        this.props.handleFilter(this.state.filter);
    },

	render: function() {
        // FIXME: add bootstrap javascript dependency for toggling behavior
        // TODO: handle connected user properly
		return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                        <a className="navbar-brand" href=".">Pogues</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><em className="navbar-text">{this.props.title}</em></li>
                        </ul>
                        <div className="navbar-form navbar-left" role="search">
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder={locale.search}
                                value={this.state.filter} onChange={this._setFilter}/>
                            </div>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Me, myself and I <span className="caret"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="#">Disconnect</a></li>
                          </ul>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
		);
	}
});

module.exports = Menu;
