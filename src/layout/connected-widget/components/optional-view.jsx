import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import ListRadioButtons from 'layout/forms/controls/list-radio-buttons';
import Input from 'layout/forms/controls/input';
import Dictionary from 'utils/dictionary/dictionary';

class OptionalView extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    view: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    checkbox: PropTypes.bool,
  };
  static defaultProps = {
    checkbox: false,
  };
  constructor(props) {
    const { active } = props;
    super(props);
    this.state = {
      showOptionalView: active,
    };

    this.toggleOptionalView = this.toggleOptionalView.bind(this);
  }
  toggleOptionalView() {
    this.setState({
      showOptionalView: !this.state.showOptionalView,
    });
  }
  render() {
    const { name, label, view, checkbox } = this.props;
    const style = {
      display: this.state.showOptionalView ? 'block' : 'none',
    };
    let selectorView;

    const options = [
      {
        value: '0',
        label: Dictionary.no,
      },
      {
        value: '1',
        label: Dictionary.yes,
      },
    ];

    if (checkbox) {
      selectorView = (
        <Field type="checkbox" name={name} component={Input} label={label} onChange={() => this.toggleOptionalView()} />
      );
    } else {
      selectorView = (
        <Field
          name={name}
          component={ListRadioButtons}
          label={label}
          radios={options}
          required
          onChange={() => this.toggleOptionalView()}
        />
      );
    }

    return (
      <div className="optional-view">
        {selectorView}
        <div style={style}>
          {view}
        </div>
      </div>
    );
  }
}

export default OptionalView;
