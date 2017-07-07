import React from 'react';
import { Field, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import Select from 'layout/forms/controls/select';
import Input from 'layout/forms/controls/input';
import Textarea from 'layout/forms/controls/rich-textarea';
import Checkbox from 'layout/forms/controls/checkbox';

function renderListControls({ fields, controls, currentText, currentType, currentPosition }) {
    /*const declarations = fields.map((name, index, fields) => {
        return <li key={index}>
            <Field name={`${name}.text`} type="hidden" component="input" value={currentText} />
            <Field name={`${name}.type`} type="hidden" component="input" value={currentType} />
            <Field name={`${name}.position`} type="hidden" component="input" value={currentPosition} />
        </li>
    })*/
    const controlsBlock = controls.length > 0 ?
        controls.map(control => {
            return <li>
                <button className="btn btn-link">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    {control.text}
                </button>
            </li>
        }) : <li>
            {Dictionary.noControlYet}
        </li>

    return <ul>
        {controlsBlock}
        <li>
            <button className="btn btn-link" onClick={(event) => { event.stopPropagation(); fields.push(); }}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                {Dictionary.addControl}
            </button>
        </li>
    </ul>
}
class Controls extends React.Component {
    static defaultProps = {
        name: 'controls',
        controls: [],
    };
    static propTypes = {
        controls: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            controls: this.props.controls
        }
        
    }

    render() {
        const levels = [
            {
                value: 'INFO',
                label: Dictionary.INFO,
            },
            {
                value: 'WARN',
                label: Dictionary.WARN,
            },
            {
                value: 'ERROR',
                label: Dictionary.ERROR,
            },
        ]

        return (
            <div className="declarations-box">
                <FieldArray {...this.state} name="controls" component={renderListControls}></FieldArray>
                <div>
                    <Field name="text" id="control_text" component={Input} label={Dictionary.control_label} required />
                    <Field name="condition" id="control_condition" component={Textarea} label={Dictionary.expression} required />
                    <Field name="message" id="control_message" component={Textarea} label={Dictionary.control_message} required />
                    <Field name="type" id="control_type" component={Select} label={Dictionary.type} required options={levels} />
                    <Field name="type" id="control_type" component={Select} label={Dictionary.type} required options={levels} />
                    <Field name="during_collect" id="control_during_collect" component={Checkbox} label={Dictionary.control_during_collect} />
                    <Field name="post_collect" id="control_post_collect" component={Checkbox} label={Dictionary.control_post_collect} />
                </div>
                <div className="declaration-actions">
                    <ul className="form-footer">
                        <li>
                            <button disabled className="btn btn-link">
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                {Dictionary.remove}
                            </button>
                        </li>
                        <li>
                            <button disabled className="btn btn-link">
                                <span className="glyphicon glyphicon-file" aria-hidden="true"></span>
                                {Dictionary.duplicate}
                            </button>
                        </li>
                        <li><button disabled className="btn-yellow">{Dictionary.validate}</button></li>
                        <li><button disabled className="cancel">{Dictionary.cancel}</button></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Controls;
