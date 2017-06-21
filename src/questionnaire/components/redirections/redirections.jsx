import React from 'react';
import { Field, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import Input from 'layout/forms/controls/input';
import Textarea from 'layout/forms/controls/rich-textarea';

function renderListRedirections({ fields, redirections, currentText, currentType, currentPosition }) {
    /*const declarations = fields.map((name, index, fields) => {
        return <li key={index}>
            <Field name={`${name}.text`} type="hidden" component="input" value={currentText} />
            <Field name={`${name}.type`} type="hidden" component="input" value={currentType} />
            <Field name={`${name}.position`} type="hidden" component="input" value={currentPosition} />
        </li>
    })*/    
    const redirectionsBlock = redirections.length > 0 ?
        redirections.map(redirection => {
            return <li>
                <button className="btn btn-link">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    {redirection.text}
                </button>
            </li>
        }) : <li>
            {Dictionary.noGoToYet}
        </li>

    return <ul>
        {redirectionsBlock}
        <li>
            <button className="btn btn-link" onClick={(event) => { event.stopPropagation(); fields.push(); }}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                {Dictionary.defineGoTo}
            </button>
        </li>
    </ul>
}
class Redirections extends React.Component {
    static defaultProps = {
        name: 'redirections',
        redirections: [],
    };
    static propTypes = {
        redirections: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            redirections: this.props.redirections
        }
        
    }

    render() {
        return (
            <div className="declarations-box">
                <FieldArray {...this.state} name="redirections" component={renderListRedirections}></FieldArray>
                <div>
                    <Field name="text" id="redirection_text" component={Input} label={Dictionary.goTo_label} required />
                    <Field name="condition" id="redirection_condition" component={Textarea} label={Dictionary.expression} required />
                    <Field name="cible" id="redirection_cible" component={Input} label={Dictionary.type} required />
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

export default Redirections;
