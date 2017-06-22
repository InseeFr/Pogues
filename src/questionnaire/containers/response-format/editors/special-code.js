import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { UI_BEHAVIOUR as uiBehaviourMap } from 'constants/constants-mapping';
import { UI_BEHAVIOUR } from 'constants/pogues-constants';

// const { FIRST_INTENTION, SECOND_INTENTION } = UI_BEHAVIOUR;

function SpecialCode({ hasSpecialCode, label, code, behaviour, message, update, locale }) {
  const behaviourChoices = _.map(UI_BEHAVIOUR, bhvr => (
    <option key={bhvr} value={bhvr}>
      {locale[uiBehaviourMap[bhvr]]}
    </option>
  ));

  return (
    <div>
      <div className="form-group">
        <label className="col-sm-5 control-label">
          {locale.addSpecialCode}
        </label>
        <div className="col-sm-7">
          <div className="checkbox">
            <input
              type="checkbox"
              style={{ marginLeft: 0 }}
              checked={hasSpecialCode}
              onChange={e => update({ hasSpecialCode: e.target.checked })}
            />
          </div>
        </div>
      </div>
      {hasSpecialCode &&
        <div>
          <div className="form-group">
            <label className="col-sm-5 control-label">
              {locale.codeLabel}
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                value={label}
                onChange={e => update({ specialLabel: e.target.value })}
                placeholder={locale.label}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-5 control-label">
              {locale.code}
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                value={code}
                onChange={e => update({ specialCode: e.target.value })}
                placeholder={locale.codePh}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-5 control-label">
              {locale.uiBehaviour}
            </label>
            <div className="col-sm-5">
              <select
                className="form-control"
                value={behaviour}
                onChange={e => update({ specialUiBehaviour: e.target.value })}
              >
                {behaviourChoices}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-5 control-label">
              {locale.followUpMsg}
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                value={message}
                onChange={e => update({ specialFollowUpMessage: e.target.value })}
                placeholder={locale.followUpMsg}
              />
            </div>
          </div>
        </div>}
    </div>
  );
}

SpecialCode.propTypes = {
  hasSpecialCode: PropTypes.bool.isRequired,
  code: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  behaviour: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
  update: PropTypes.func,
};

SpecialCode.defaultProps = {
  update: undefined,
};

export default SpecialCode;
