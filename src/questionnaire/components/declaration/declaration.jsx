import React from 'react';
import { Field, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import Select from 'layout/forms/controls/select';
import Input from 'layout/forms/controls/input';
import Textarea from 'layout/forms/controls/rich-textarea';

function renderListDeclarations({ fields, declarations, currentText, currentType, currentPosition }) {
    /*const declarations = fields.map((name, index, fields) => {
        return <li key={index}>
            <Field name={`${name}.text`} type="hidden" component="input" value={currentText} />
            <Field name={`${name}.type`} type="hidden" component="input" value={currentType} />
            <Field name={`${name}.position`} type="hidden" component="input" value={currentPosition} />
        </li>
    })*/
    const declarationsBlock = declarations.length > 0 ?
        declarations.map(declaration => {
            return <li>
                <button className="btn btn-link">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    {declaration.text}
                </button>
            </li>
        }) : <li>
            {Dictionary.noDeclarationYet}
        </li>

    return <ul>
        {declarationsBlock}
        <li>
            <button className="btn btn-link" onClick={(event) => { event.stopPropagation(); fields.push(); }}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                {Dictionary.addDeclaration}
            </button>
        </li>
    </ul>
}
class Declaration extends React.Component {
    static defaultProps = {
        name: 'declarations',
        declarations: [],
    };
    static propTypes = {
        declarations: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            currentText: '',
            currentType: '',
            currentPosition: '',
            declarations: this.props.declarations
        }
        
    }

    render() {
        const mockTypes = [
            {
                value: 'INSTRUCTION',
                label: Dictionary.INSTRUCTION,
            },
            {
                value: 'COMMENT',
                label: Dictionary.COMMENT,
            },
            {
                value: 'HELP',
                label: Dictionary.HELP,
            },
            {
                value: 'WARNING',
                label: Dictionary.WARNING,
            },
        ];

        const mockPosition = [
            {
                value: 'AFTER_QUESTION_TEXT',
                label: Dictionary.dclPosAfterQuestion,
            },
            {
                value: 'AFTER_RESPONSE',
                label: Dictionary.dclPosAfterAnswer,
            },
            {
                value: 'BEFORE_QUESTION_TEXT',
                label: Dictionary.dclPosBeforeText,
            },
            {
                value: 'DETACHABLE',
                label: Dictionary.dclPosDetachable,
            },
        ]


        return (
            <div className="declarations-box">
                <FieldArray {...this.state} name="declarations" component={renderListDeclarations}></FieldArray>
                <div>
                    <Field name="text" id="declaration_text" component={Textarea} label={Dictionary.declaration_label} required />
                    <Field name="type" id="declaration_type" component={Select} label={Dictionary.declaration_type} options={mockTypes} required />
                    <Field name="position" id="declaration_position" component={Select} label={Dictionary.declaration_position} options={mockPosition} required />
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

export default Declaration;
