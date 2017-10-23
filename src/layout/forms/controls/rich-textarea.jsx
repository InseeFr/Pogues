import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';
import RichTextEditor from 'gillespie59-react-rte/lib/RichTextEditor';
import { CompositeDecorator } from 'draft-js';

/* eslint-disable jsx-a11y/no-static-element-interactions */

const MARKDOWN = 'markdown';
const RAW = 'raw';

// Matches any '${foo' patterns not closed by }
const InputRegex = /[[(]?\${\w+\b[\])]?(?!\})/;

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
  try {
    return RichTextEditor.EditorValue.createFromString(markdown, MARKDOWN, decorators);
  } catch (e) {
    return RichTextEditor.EditorValue.createEmpty(decorators);
  }
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
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
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
    label: PropTypes.string,
    required: PropTypes.bool,
    buttons: PropTypes.bool,
    help: PropTypes.bool,
    reference: PropTypes.func,
    avoidSubmitOnEnter: PropTypes.bool,
    identifier: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    availableSuggestions: PropTypes.arrayOf(PropTypes.string),
    meta: PropTypes.object.isRequired,
  };

  static defaultProps = {
    label: undefined,
    required: false,
    buttons: false,
    options: [],
    help: false,
    avoidSubmitOnEnter: true,
    identifier: undefined,
    availableSuggestions: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      currentValue: props.input.value,
      value: getValue(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.identifier === undefined) {
      return;
    }
    if (nextProps.input.value === '' || nextProps.identifier !== this.props.identifier) {
      this.setState({ value: getValue(nextProps) });
    }
  }

  onChange = withConvertion => value => {
    // Depends if we are using the real rte or just a classic textarea
    const convertedValue = withConvertion ? editorValueToMarkdown(value) : value.target.value;
    if (this.props.availableSuggestions) {
      const matches = convertedValue.match(InputRegex);
      if (matches) {
        this.setState({
          suggestions: this.props.availableSuggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(matches[0].substring(2).toLowerCase())
          ),
        });
      } else {
        this.setState({ suggestions: [] });
      }
    }
    this.setState({ value, currentValue: convertedValue }, () => {
      this.props.input.onChange(convertedValue);
    });
  };

  // Replaces first ${foo pattern by ${selectedValue}
  replaceFirstTemplateAvailable = t => () => {
    const newValue = this.props.input.value.replace(InputRegex, `\${${t}}`);
    this.props.input.onChange(newValue);
    // Reset suggestions afterwards and manually update the value since there is no watcher
    this.setState({ suggestions: [], currentValue: newValue, value: getValue({ input: { value: newValue } }) });
  };

  useTabToAutoComplete = e => {
    if (this.state.suggestions.length > 0 && e.key === 'Tab') {
      this.replaceFirstTemplateAvailable(this.state.suggestions[0])();
      e.preventDefault();
    }
  };

  handleReturn = e => {
    if (!this.props.avoidSubmitOnEnter) {
      e.target
        .closest('form')
        .querySelector('button[type=submit]')
        .click();
    }
    return 'handled';
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
    const { input, label, required, buttons, help, reference, meta: { touched, error, warning } } = this.props;
    const editorValue = this.state.value;

    const helpBlock = help && (
      <span className="help-block">
        <span className="glyphicon glyphicon-question-sign" aria-hidden="true" /> {Dictionary.HELP}{' '}
      </span>
    );

    return (
      <div className="ctrl-input">
        {label && (
          <label htmlFor={`select-${input.name}`}>
            {label}
            {required ? <span>*</span> : ''} {helpBlock}
          </label>
        )}
        <div>
          {buttons && (
            <RichTextEditor
              blockStyleFn={() => 'singleline'}
              value={editorValue}
              onChange={this.onChange(true)}
              toolbarConfig={this.toolbarConfig}
              handleReturn={this.handleReturn}
              rootStyle={this.rootStyle}
              formatURL={formatURL}
              ref={reference}
            />
          )}
          {!buttons && (
            <textarea
              {...input}
              onChange={this.onChange(false)}
              onKeyDown={this.useTabToAutoComplete}
              id={`select-${input.name}`}
              ref={reference}
            />
          )}
          {touched &&
            ((error && <span className="form-error">{error}</span>) ||
              (warning && <span className="form-warm">{warning}</span>))}
          {this.state.suggestions.length > 0 && (
            <div className="input-suggestion-wrapper">
              {this.state.suggestions.map(suggest => (
                <div
                  key={`suggestion-key-${suggest}`}
                  onClick={this.replaceFirstTemplateAvailable(suggest)}
                  role="button"
                  className="input-suggestion"
                  title={suggest}
                >
                  {' '}
                  {suggest}{' '}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RichTextArea;
