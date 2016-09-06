import React, { PropTypes, Component } from 'react'
import {
  Editor, EditorState, RichUtils, convertToRaw, Entity, Modifier,
  CompositeDecorator
} from 'draft-js'
import { stateToMarkdown } from 'draft-js-export-markdown'
import { stateFromMarkdown } from 'draft-js-import-markdown'
import RichControlGroup from './rich-control-group'
import ContextualInput from './contextual-input'
import Link, { createLinkEntity, findLinkEntities } from './rich-label-link'
//default styles for the editor (we need this at least to make the placeholder behave as expected)
import '../../css/Draft.css'
import classnames from 'classnames'
import { getEntityAtCursor } from '../utils/draft-js/get-entity-at-cursor'
import { getEntitySelectionState } from '../utils/draft-js/get-entity-selection-state'

const STYLES = {
  BOLD: 'BOLD',
  ITALIC: 'ITALIC'
}
const { BOLD, ITALIC } = STYLES
const LINK = 'LINK'

//type LINK entities to distinguish real links (with an url) and contextual
//information (no url, but a title)
const URL = 'URL'
const INFO = 'INFO'

function replaceText(editorState, text) {
  var newContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    text
  );
  return EditorState.push(
    editorState,
    newContent,
    'replace-text'
  );
}

function getCurrentEntity(editorState) {
  const entityKey = getEntityAtCursor(editorState)
  if (!entityKey) return
  const entity = Entity.get(entityKey)
  if (entity.getType() === 'LINK') return entityKey
}

const isLinkOrInfo = entityKey => {
  if (!entityKey) return [false, false]
  const entity = Entity.get(entityKey)
  const isLink = Boolean(entity.getData().url !== '.')
  return [isLink, !isLink]
}

//Add the `singleline` class to the block wrapper (in order to disable white
//space wrapping and hide overflow)
//We do it whatever the block is (we should only have one block if we use
//a single line input).
function singleLineFn() {
  return 'singleline'
}

function multilineFn() {
  return 'multiline'
}
/**
 * We decoupled the Editor and the controls to enable fine grained positioning.
 */
export default class RichLabel extends Component {
  constructor(props) {
    super(props)
    const editorState = EditorState.createWithContent(
      stateFromMarkdown(props.initialValue),
      new CompositeDecorator([{
        strategy: findLinkEntities,
        component: Link
      }])
    )
    const lastContent = editorState.getCurrentContent()
    
    this.state = {
      focus: false,
      editorState,
      linkEdited: false,
      //we use LINK for both links and contextual information, since they
      //are almost the same entity (when we serialize them, they will be both
      //represented as a markown link; contextual information won't have an url
      //but only a title). 
      linkData: '', //might be an URL or a contextual information
      linkType: URL, // URL or INFO
      lastContent
    }
    
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleLink = this.toggleLink.bind(this)
    this.confirmLink = this.confirmLink.bind(this)
    this.linkDataChange = text => this.setState({ linkData: text })
    this.pasteRawText = this.pasteRawText.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    
    this.controlActions = {
      BOLD: this.toggleInlineStyle.bind(this, BOLD),
      ITALIC: this.toggleInlineStyle.bind(this, ITALIC),
      LINK: () => this.toggleLink(URL),
      INFO: () => this.toggleLink(INFO)
    }
  }
  
  onChange(editorState) {
    this.setState({ editorState })
  }
  
  linkInputFocus() {
    
  }
  toggleLink(type) {
    const { editorState } = this.state;
    const selection = editorState.getSelection()
    const content = editorState.getCurrentContent()
    const entityKey = getCurrentEntity(editorState)
    let data = ''
    if (entityKey) {
      const entity = Entity.get(entityKey)
      //TODO handle situations where a regular link is edited as a contextual
      //information and vice versa
      const entityData = entity.getData()
      if (entityData.url !== '.') {
        //link
        data = (type === URL) ? entityData.url : ''
      }
      else {
        //contextual information
        data = (type === INFO) ? entityData.title : ''
      }
    }
    if (!selection.isCollapsed()) {
      this.setState({
        linkEdited: true,
        linkData: data,
        linkType: type
      }, () => {
        setTimeout(this.linkInputFocus(), 0);
      });
    }
  }
  
  cancelLink() {
    this.setState({
      linkEdited: false,
      linkaData: '',
      linkType: URL
    })
  } 
  
  confirmLink(entityKey) {
    const { editorState, linkData, linkType } = this.state
    const entityData = linkType === URL ?
      { url: linkData, title: '' } : { url: '.', title: linkData }
    
    // if (entityKey) {
    //   const entity = Entity.get(entityKey)
    //   const contentState = editorState.getCurrentContent()
    //   const newEntityKey = Entity.replaceData(entityKey, entityData)
    //   const selectionState = getEntitySelectionState(newEntityKey)
    //   const update = Modifier.applyEntity(
    //     contentState,
    //     selectionState,
    //     newEntityKey
    //   );
    // 
    //   return EditorState.push(
    //     editorState,
    //     update,
    //     'apply-entity'
    //   );
    // }
    entityKey = createLinkEntity(entityData)
    this.setState({
      editorState: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      )
    }, () => setTimeout(() => this.refs.editor.focus(), 0))
    this.cancelLink()
  }
  
  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  
  pasteRawText(text, removeNewLines) {
    ///see draft-js/src/component/handlers/edit/editOnPaste.js
    text = removeNewLines ? text.replace(/[\n\r]/g, ' ') : text
    this.setState({ editorState: replaceText(this.state.editorState, text) })
  }
  
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  } 
  
  handleBlur() {
    //if nothing has changed, there's no need to dispatch an action just because
    //the editor lost focus
    const newContent = this.state.editorState.getCurrentContent()
    if (newContent !== this.state.lastContent) {
      this.props.onChange(stateToMarkdown(newContent))
    }
    this.setState({ focus: false, lastContent: newContent })
  }
  
  handleFocus() {
    this.setState({ focus: true })
    this.cancelLink()
  }

  render() {
    const {
      editorState, focus, linkEdited, linkData, linkType,
    } = this.state
    
    const currentStyle = editorState.getCurrentInlineStyle()
    const currentEntityKey = getCurrentEntity(editorState)
    const [isLink, isInfo] = isLinkOrInfo(currentEntityKey)
    const controlStates = {
      BOLD: currentStyle.has(BOLD),
      ITALIC: currentStyle.has(ITALIC),
      LINK: isLink,
      INFO: isInfo
    }
    
    const { locale, placeholder
      , multiline } = this.props
    return (
      <div className="rich-label">
        <div className="rich-label-control-group">
          <RichControlGroup className="btn-group btn-group-xs"
            controlActions={this.controlActions}
            controlStates={controlStates}
            locale={locale} />
            { linkEdited &&
            <div className="rich-label-contextual-input">
              <ContextualInput
                text={linkData}
                placeholder={linkType === URL ?
                   locale.enterURL : locale.enterInfo }
                onChange={this.linkDataChange}
                onEnter={() => this.confirmLink(currentEntityKey)} />
              <a href="#" className="btn btn-xs btn-default" 
                onClick={e => { e.preventDefault(); this.confirmLink(currentEntityKey) }}
                style={{ marginLeft: '5px' }}>
                <i className="fa fa-check"></i>
              </a>
            </div>
            }
        </div>
        <div className={classnames('form-control', { multiline, focus })}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}>
          <Editor 
            blockStyleFn={multiline ? multilineFn : singleLineFn}
            handlePastedText={(text, html) => {
              this.pasteRawText(text, true)
              return true
            }}
            // disable new lines
            handleReturn={() => !multiline}
            placeholder={placeholder}
            ref='editor'
            editorState={this.state.editorState}
            //We want to avoid editor state serialization each time a key is
            //pressed, so `onChange` will not throw an action to the store). The
            //content will be saved when the editor loses focus (which necessarily
            //happens when we click on the save button for the questionnaire).
            //At first, we threw an action each time the editor state changed,
            //but sometimes the ui was not responding very well (but we
            //serialized a markdown representation of the state, ant it might
            //be this part of the serialiaztion which took too much time).
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}/>
        </div>
      </div>
    )
  }
}



RichLabel.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  multiline: PropTypes.bool.isRequired,
  locale: PropTypes.object.isRequired
}