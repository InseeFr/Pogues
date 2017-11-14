import { CharacterMetadata, EditorState } from 'draft-js';

export default function clearEntityForRange(editorState, blockKey, startOffset, endOffset) {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const block = blockMap.get(blockKey);
  const charList = block.getCharacterList();
  const newCharList = charList.map((char, i) => {
    if (i >= startOffset && i < endOffset) {
      return CharacterMetadata.applyEntity(char, null);
    }
    return char;
  });
  const newBlock = block.set('characterList', newCharList);
  const newBlockMap = blockMap.set(blockKey, newBlock);
  const newContentState = contentState.set('blockMap', newBlockMap);
  return EditorState.push(editorState, newContentState, 'apply-entity');
}
