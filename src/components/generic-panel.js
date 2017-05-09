import React, { PropTypes } from 'react';

export default function genericPanel(
  { add, localeAdd, localeTitle, children }
) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading clearfix">
        <h3 className="panel-title pull-left">{localeTitle}</h3>
        {add &&
          <button onClick={add} className="btn btn-sm btn-primary pull-right">
            {localeAdd}
          </button>}
      </div>
      <div className="panel-body">
        <div className="form">{children}</div>
      </div>
    </div>
  );
}

genericPanel.PropTypes = {
  add: PropTypes.func.isRequired,
  localeAdd: PropTypes.string.isRequired,
  localeTitle: PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired
};
