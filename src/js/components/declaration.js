import React from 'react';
import DeclarationModel from '../models/declaration';
import {getDictionary} from '../stores/dictionary-store';
var locale = getDictionary()
import Logger from '../logger/logger';
import ModelConstants from '../models/model-constants'
const { DeclarationModel: { DECLARATION_TYPES: declarationTypes }} = ModelConstants
var logger = new Logger('Declaration', 'Components');

var Declaration = React.createClass({
  propTypes: {
    declaration: React.PropTypes.instanceOf(DeclarationModel)
  },

  componentWillMount: function() {
    var declaration = this.props.declaration;
    this.setState({
      text: declaration.text,
      type: declaration.type,
      disjoinable: declaration.disjoinable
    });
  },

  _handleTextChange: function(event) {
    var text = event.target.value;
    this._save('text', text)
    this.setState({
      text: text
    });
  },
  _handleTypeChange: function(event) {
    var type = event.target.value;
    this._save('type', type);
    this.setState({
      type: type
    });
  },
  _handleDisjoignableChange: function(event) {
    var disjoinable = event.target.value;
    this._save('disjoignable', disjoinable);
    this.setState({
      disjoignable: disjoignable
    });
  },
  _save: function(declarationProp, value) {
    logger.info(`Saving ${declarationProp} with value ${value}`);
    // FIXME not ok with react philosphy
    this.props.declaration[declarationProp] = value;
  },

  _delete: function() {
    // FIXME not ok with react philosphy
    this.props.delete();
  },

  render: function() {
    var typeChoices =  declarationTypes.map(function (key) {
          return <option key={key} value={key}>{locale[key]}</option>;
        });
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-12">
            <div className="input-group">
              <input value={this.state.text} onChange={this._handleTextChange}
                type="text" className="form-control" placeholder={locale.instruction}/>
              <span className="input-group-btn">
                <button onClick={this._delete} className="btn btn-default" type="button">&times;</button>
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-6">
            <select onChange={this._handleTypeChange}
               value={this.state.type} className="form-control input-block-level">
              {typeChoices}
            </select>
          </div>
          <div className="col-sm-6">
            <div className="input-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" value={this.state.disjoinable}/>
                    {locale.disjoignable}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
  )}

});

export default Declaration;
