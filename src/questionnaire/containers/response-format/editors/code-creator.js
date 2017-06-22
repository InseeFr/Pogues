import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GENERAL } from 'constants/pogues-constants';

class CodeCreator extends Component {
  static propTypes = {
    hndlEnterKey: PropTypes.func.isRequired,
    locale: PropTypes.object.isRequired,
  };
  render() {
    const { locale, hndlEnterKey } = this.props;
    return (
      <div className="form-group code">
        <label htmlFor="label" className="col-sm-3 control-label">
          {locale.newCode}
        </label>
        <div className="col-sm-6">
          <input
            id="label"
            className="form-control"
            placeholder={locale.typeNewCode}
            onKeyDown={e => {
              if (e.keyCode !== GENERAL.ENTER_KEY_CODE) return;
              hndlEnterKey(e.target.value);
              e.target.value = '';
            }}
          />
        </div>
      </div>
    );
  }
}

export default CodeCreator;
