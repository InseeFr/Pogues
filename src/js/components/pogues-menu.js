var React = require('react');

var search = {'en': 'Search', 'fr': 'Chercher'};

var PoguesMenu = React.createClass({

	render: function() {

		return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img alt="Pogues" src="img/favicon.ico"/>
                        </a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#"><span className="fa fa-database fa-3"></span></a></li>
                        <li><a href="#"><span className="fa fa-bolt fa-3"></span></a></li>
                    </ul>
                    <form className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder={search[this.props.language]}/>
                        </div>
                        <button type="submit" className="btn btn-default"><span className="fa fa-search fa-3"></span></button>
                    </form>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="fa fa-question fa-3"></span></a></li>
                    </ul>
                </div>
            </nav>
		);
	}
});

module.exports = PoguesMenu;
