import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import RichTextEditor from 'react-rte';
import { CompositeDecorator, Entity, RichUtils, EditorState } from "draft-js"
import {ENTITY_TYPE} from 'draft-js-utils';
import 'draft-js/dist/Draft.css';

const FORMAT = 'markdown';

 function Link(props) {
  const {url, title} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} title={title}>{props.children}</a>
  );
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    if (entityKey != null) {
      let entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity != null && entity.getType() === ENTITY_TYPE.LINK;
    }
    return false;
  }, callback);
}

const customLinkDecorator = {
  strategy: findLinkEntities,
  component: Link,
};

const decorators = new CompositeDecorator([customLinkDecorator]);

export function markdownToHtml(markdown){
  return {__html:RichTextEditor.EditorValue.createFromString(markdown, FORMAT, decorators).toString('html')};
}

function getValue(props) {
  return props.input.value
    ? RichTextEditor.EditorValue.createFromString(props.input.value, FORMAT, decorators)
    : RichTextEditor.EditorValue.createEmpty(decorators);
}

/**
 * Component that will display a TextArea in a react-form Field component. 
 * We can add a help block thankt to the help attribute, and an actions toolbar
 * thanks to a button attribute.
 */
/**
 * petit bug de synchro dans le model
 * Gérer le déploiement de la lib
 * Faire la PR
 * Gérer le rendu dans la liste
 * Bug Url ne focntionne pas le première fois
 * Tester les autres usecase utilisant le textarea
 * Erreur lors du submit de la popup
 * Check Performance
 */
class RichTextArea extends Component {
  static propTypes = {  
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    buttons: PropTypes.bool,
    help: PropTypes.bool,
    reference: PropTypes.func,
  };

  static defaultProps = {
    required: false,
    buttons: false,
    options: [],
    help: false,
  };

  state = {
    value: getValue(this.props),
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.buttons && nextProps.input.value !== this.props.input.value) {
      this.setState({
        value: getValue(nextProps),
      });
    }
  }

  onChange = value => {
    if (this.props.buttons) {
      this.setState({ value });
    }
  };

  onBlur(e) {
    if (this.props.buttons) {
      this.props.input.onChange(this.state.value.toString(FORMAT));
    }
  }
  
  formatURL(url){
    if(url.indexOf('http://') === 0){
      return {url};
    }
    else return {url: '.', title: url}
  }

  toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS'],
    INLINE_STYLE_BUTTONS: [{ label: 'Bold', style: 'BOLD' }, { label: 'Italic', style: 'ITALIC' }],
    LINK_BUTTONS: {
      ADD:    {label: 'Link or Tooltip', iconName: 'link', placeholder: 'http://example.com /This is a tooltip'},
      REMOVE: {label: 'Remove Link or Tooltip', iconName: 'remove-link'},
    }
  };
  rootStyle = {
    display: 'flex',
    flexDirection: 'column-reverse',
  };

  render() {
    const { input, label, required, buttons, help, reference } = this.props;

    const helpBlock = help
      ? <span className="help-block">
          <span className="glyphicon glyphicon-question-sign" aria-hidden="true" /> {Dictionary.HELP}{' '}
        </span>
      : '';

    return (
      <div className="ctrl-input">
        <label htmlFor={`select-${input.name}`}>
          {label}
          {required ? <span>*</span> : ''} {helpBlock}
        </label>
        {buttons &&
          <div onBlur={e => this.onBlur(e)}>
            <RichTextEditor
              value={this.state.value}
              onChange={value => this.onChange(value)}
              toolbarConfig={this.toolbarConfig}
              handleReturn={() => true}
              rootStyle={this.rootStyle}
              formatURL={(url) => this.formatURL(url)}
              ref={reference}
            />
          </div>}
        {!buttons &&
          <div>
            <textarea {...input} id={`select-${input.name}`} ref={reference} />
          </div>}
      </div>
    );
  }
}

export default RichTextArea;
