import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import RichTextEditor from 'gillespie59-react-rte/lib/RichTextEditor';
import { CompositeDecorator } from 'draft-js';

//import 'draft-js/dist/Draft.css';

const MARKDOWN = 'markdown';
const RAW = 'raw';

function Link(props) {
  const { url, title } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} title={title}>
      {props.children}
    </a>
  );
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    if (entityKey != null) {
      const entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity != null && entity.getType() === 'LINK';
    }
    return false;
  }, callback);
}

const customLinkDecorator = {
  strategy: findLinkEntities,
  component: Link,
};

const decorators = new CompositeDecorator([customLinkDecorator]);


export function markdownToHtml(markdown) {
  return { __html: RichTextEditor.EditorValue.createFromString(markdown, MARKDOWN, decorators).toString('html') };
}

export function markdownToEditorValue(markdown) {
  return RichTextEditor.EditorValue.createFromString(markdown, MARKDOWN, decorators);
}

export function editorValueToMarkdown(value) {
  return value.toString(MARKDOWN);
}

export function editorValueToRaw(value) {
  return value.toString(RAW);
}

export function markdownToRaw(value) {
  return JSON.parse(markdownToEditorValue(value).toString(RAW));
}

function formatURL(url) {
  if (url.indexOf('http://') === 0) {
    return { url };
  }
  return { url: '.', title: url };
}

function getValue(props) {
  return props.input.value
    ? RichTextEditor.EditorValue.createFromString(props.input.value, MARKDOWN, decorators)
    : RichTextEditor.EditorValue.createEmpty(decorators);
}

/**
 * Component that will display a TextArea in a react-form Field component. 
 * We can add a help block thankt to the help attribute, and an actions toolbar
 * thanks to a button attribute.
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

  constructor(props) {
    super(props);
    const initValue = getValue(props);
    this.state = {
      value: initValue,
      editorState: initValue.getEditorState().getCurrentContent(),
      currentValue: initValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.buttons && nextProps.input.value !== this.state.currentValue) {
      this.setState({
        value: getValue(nextProps),
        currentValue: nextProps.input.value,
      });
    }
  }

  onChange = value => {
    if (this.props.buttons) {
      const markdownValue = editorValueToMarkdown(value);
      this.setState({ value, currentValue: markdownValue }, () => {
        this.props.input.onChange(markdownValue);
      });
    }
  };

  toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS'],
    INLINE_STYLE_BUTTONS: [{ label: 'Bold', style: 'BOLD' }, { label: 'Italic', style: 'ITALIC' }],
    LINK_BUTTONS: {
      ADD: { label: 'Link or Tooltip', iconName: 'link', placeholder: 'Insert an URL or a tooltip' },
      REMOVE: { label: 'Remove Link or Tooltip', iconName: 'remove-link' },
    },
  };
  rootStyle = {
    display: 'flex',
    flexDirection: 'column-reverse',
  };

  render() {
    const { input, label, required, buttons, help, reference } = this.props;

    const helpBlock =
      help &&
      <span className="help-block">
        <span className="glyphicon glyphicon-question-sign" aria-hidden="true" /> {Dictionary.HELP}{' '}
      </span>;

    return (
      <div className="ctrl-input">
        <label htmlFor={`select-${input.name}`}>
          {label}
          {required ? <span>*</span> : ''} {helpBlock}
        </label>
        {buttons &&
          <div>
            <RichTextEditor
              value={this.state.value}
              onChange={value => this.onChange(value)}
              toolbarConfig={this.toolbarConfig}
              handleReturn={() => true}
              rootStyle={this.rootStyle}
              formatURL={formatURL}
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
