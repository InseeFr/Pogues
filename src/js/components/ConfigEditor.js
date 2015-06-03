var React = require('react/addons');
var PoguesActions = require('../actions/pogues-actions');
var ConfigStore = require('../stores/config-store');
var locale = require('../stores/dictionary-store').getDictionary();
var assign = require('object-assign')

function getStateFromStore() {
  var config = assign({}, ConfigStore.getConfig())
  config.logLevel = config.log.level
  config.logActiveNamespaces = config.log.activeNamespaces
  delete config.log
  return config
}

var ConfigEditor = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
  },

  getInitialState: function() {
    return getStateFromStore();
  },

  componentWillMount: function() {
    this.setState({

    });
  },

  _clickToPicker: function (event) {
    PoguesActions.switchToPicker();
    event.preventDefault();
  },
  _switchDev: function() {
    this.setState({
      'dev': !this.state.dev
    });
  },
  _switchRemote: function() {
    this.setState({
      'remote': !this.state.remote
    });
  },

  render: function() {
    // TODO update store
    return (
        <div className="container bs-docs-container">
          <div className="col-md-12">
            <h1 className="page-header">{locale.edit_config}</h1>
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label">{locale.dev}</label>
                <div className="col-sm-8">
                    <label className="radio-inline">
                      <input type="radio" name="dev" checked={this.state.dev} onChange={this._switchDev}/>{locale.trueWord}
                    </label>
                    <label className="radio-inline">
                      <input type="radio" name="dev" checked={!this.state.dev} onChange={this._switchDev}/>{locale.falseWord}
                    </label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">{locale.remote}</label>
                <div className="col-sm-8">
                    <label className="radio-inline">
                      <input type="radio" name="Remote" checked={this.state.Remote} onChange={this._switchRemote}/>{locale.trueWord}
                    </label>
                    <label className="radio-inline">
                      <input type="radio" name="Remote" checked={!this.state.Remote} onChange={this._switchRemote}/>{locale.falseWord}
                    </label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">{locale.baseURL}</label>
                <div className="col-sm-8">
                  <input type="text" placeholder={locale.baseURL}
                         valueLink={this.linkState('baseURL')}
                         className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">{locale.poguesPath}</label>
                <div className="col-sm-8">
                  <input type="text" placeholder={locale.poguesPath}
                          valueLink={this.linkState('poguesPath')}
                         className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">{locale.stromaePath}</label>
                <div className="col-sm-8">
                  <input type="text" placeholder={locale.stromaePath}
                          valueLink={this.linkState('stromaePath')}
                         className="form-control"/>
                </div>
              </div>
            </div>
          <button className="btn btn-primary" onClick={this._clickToPicker}>
            {locale.save}
          </button>
        </div>
      </div>
      );
  }
})

module.exports = ConfigEditor;