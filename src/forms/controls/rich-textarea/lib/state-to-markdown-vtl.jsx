// import { BLOCK_TYPE, INLINE_STYLE } from 'draft-js-utils';

// const { BOLD, CODE, ITALIC, STRIKETHROUGH, UNDERLINE } = INLINE_STYLE;

// const CODE_INDENT = '    ';

// function conditionsToVtl(content, conditions) {
//   let vtl = `##{"label": "${content}", "conditions": ${JSON.stringify(
//     conditions,
//   )} }`;

//   vtl = `${vtl}#if(${conditions[0].condition})${conditions[0].label}`;

//   if (conditions.length > 1) {
//     for (let i = 1; i < conditions.length; i += 1) {
//       vtl = `${vtl}#elseif(${conditions[i].condition})${conditions[i].label}`;
//     }
//   }

//   return `${vtl}#end`;
// }

// function canHaveDepth(blockType) {
//   switch (blockType) {
//     case BLOCK_TYPE.UNORDERED_LIST_ITEM:
//     case BLOCK_TYPE.ORDERED_LIST_ITEM:
//       return true;
//     default:
//       return false;
//   }
// }

// function encodeContent(text) {
//   return text.replace(/[*`]/g, '\\$&');
// }

// // Encode chars that would normally be allowed in a URL but would conflict with
// // our markdown syntax: `[foo](http://foo/)`
// function encodeURL(url) {
//   return url.replace(/\)/g, '%29');
// }

// // Escape quotes using backslash.
// function escapeTitle(text) {
//   return text.replace(/"/g, '\\"');
// }

// class MarkupGenerator {
//   constructor(contentState) {
//     this.contentState = contentState;
//   }

//   generate() {
//     this.output = [];
//     this.blocks = this.contentState.getBlockMap().toArray();
//     this.totalBlocks = this.blocks.length;
//     this.currentBlock = 0;
//     this.listItemCounts = {};
//     while (this.currentBlock < this.totalBlocks) {
//       this.processBlock();
//     }
//     return this.output.join('');
//   }

//   processBlock() {
//     const block = this.blocks[this.currentBlock];
//     const blockType = block.getType();
//     switch (blockType) {
//       case BLOCK_TYPE.HEADER_ONE: {
//         this.insertLineBreaks(1);
//         this.output.push(`# ${this.renderBlockContent(block)}\n`);
//         break;
//       }
//       case BLOCK_TYPE.HEADER_TWO: {
//         this.insertLineBreaks(1);
//         this.output.push(`## ${this.renderBlockContent(block)}\n`);
//         break;
//       }
//       case BLOCK_TYPE.HEADER_THREE: {
//         this.insertLineBreaks(1);
//         this.output.push(`### ${this.renderBlockContent(block)}\n`);
//         break;
//       }
//       case BLOCK_TYPE.HEADER_FOUR: {
//         this.insertLineBreaks(1);
//         this.output.push(`#### ${this.renderBlockContent(block)}\n`);
//         break;
//       }
//       case BLOCK_TYPE.HEADER_FIVE: {
//         this.insertLineBreaks(1);
//         this.output.push(`##### ${this.renderBlockContent(block)}\n`);
//         break;
//       }
//       case BLOCK_TYPE.HEADER_SIX: {
//         this.insertLineBreaks(1);
//         this.output.push(`###### ${this.renderBlockContent(block)}\n`);
//         break;
//       }
//       case BLOCK_TYPE.UNORDERED_LIST_ITEM: {
//         const blockDepth = block.getDepth();
//         const lastBlock = this.getLastBlock();
//         const lastBlockType = lastBlock ? lastBlock.getType() : null;
//         const lastBlockDepth =
//           lastBlock && canHaveDepth(lastBlockType)
//             ? lastBlock.getDepth()
//             : null;
//         if (lastBlockType !== blockType && lastBlockDepth !== blockDepth - 1) {
//           this.insertLineBreaks(1);
//           // Insert an additional line break if following opposite list type.
//           if (lastBlockType === BLOCK_TYPE.ORDERED_LIST_ITEM) {
//             this.insertLineBreaks(1);
//           }
//         }
//         const indent = ' '.repeat(block.depth * 4);
//         this.output.push(`${indent}- ${this.renderBlockContent(block)}\n`);
//         break;
//       }
//       case BLOCK_TYPE.ORDERED_LIST_ITEM: {
//         const blockDepth = block.getDepth();
//         const lastBlock = this.getLastBlock();
//         const lastBlockType = lastBlock ? lastBlock.getType() : null;
//         const lastBlockDepth =
//           lastBlock && canHaveDepth(lastBlockType)
//             ? lastBlock.getDepth()
//             : null;
//         if (lastBlockType !== blockType && lastBlockDepth !== blockDepth - 1) {
//           this.insertLineBreaks(1);
//           // Insert an additional line break if following opposite list type.
//           if (lastBlockType === BLOCK_TYPE.UNORDERED_LIST_ITEM) {
//             this.insertLineBreaks(1);
//           }
//         }
//         const indent = ' '.repeat(blockDepth * 4);
//         // TODO: figure out what to do with two-digit numbers
//         const count = this.getListItemCount(block) % 10;
//         this.output.push(
//           `${indent}${count}. ${this.renderBlockContent(block)}\n`,
//         );
//         break;
//       }
//       case BLOCK_TYPE.BLOCKQUOTE: {
//         this.insertLineBreaks(1);
//         this.output.push(` > ${this.renderBlockContent(block)}\n`);
//         break;
//       }
//       case BLOCK_TYPE.CODE: {
//         this.insertLineBreaks(1);
//         this.output.push(`${CODE_INDENT + this.renderBlockContent(block)}\n`);
//         break;
//       }
//       default: {
//         this.insertLineBreaks(1);
//         this.output.push(`${this.renderBlockContent(block)}\n`);
//         break;
//       }
//     }
//     this.currentBlock += 1;
//   }

//   getLastBlock() {
//     return this.blocks[this.currentBlock - 1];
//   }

//   getNextBlock() {
//     return this.blocks[this.currentBlock + 1];
//   }

//   getListItemCount(block) {
//     const blockType = block.getType();
//     const blockDepth = block.getDepth();
//     // To decide if we need to start over we need to backtrack (skipping list
//     // items that are of greater depth)
//     let index = this.currentBlock - 1;
//     let prevBlock = this.blocks[index];
//     while (
//       prevBlock &&
//       canHaveDepth(prevBlock.getType()) &&
//       prevBlock.getDepth() > blockDepth
//     ) {
//       index -= 1;
//       prevBlock = this.blocks[index];
//     }
//     if (
//       !prevBlock ||
//       prevBlock.getType() !== blockType ||
//       prevBlock.getDepth() !== blockDepth
//     ) {
//       this.listItemCounts[blockDepth] = 0;
//     }
//     const result = this.listItemCounts[blockDepth] + 1;
//     this.listItemCounts[blockDepth] = result;
//     return result;
//   }

//   insertLineBreaks() {
//     if (this.currentBlock > 0) {
//       this.output.push('\n');
//     }
//   }

//   renderBlockContent(block) {
//     const { contentState } = this;
//     const blockType = block.getType();
//     const text = block.getText();
//     if (text === '') {
//       // Prevent element collapse if completely empty.
//       // TODO: Replace with constant.
//       return '\u200B';
//     }
//     const charMetaList = block.getCharacterList();
//     const entityPieces = getEntityRanges(text, charMetaList);
//     const space = ' ';

//     return entityPieces
//       .map(([entityKey, stylePieces]) => {
//         const content = stylePieces
//           .map(([text, style]) => {
//             // Don't allow empty inline elements.
//             if (!text) {
//               return '';
//             }
//             let content = encodeContent(text);
//             const prefix = content.startsWith(space) ? space : '';
//             const suffix = content.endsWith(space) ? space : '';

//             content = content.trim();
//             if (style.has(BOLD)) {
//               content = `**${content}**`;
//             }
//             if (style.has(UNDERLINE)) {
//               // TODO: encode `+`?
//               content = `++${content}++`;
//             }
//             if (style.has(ITALIC)) {
//               content = `*${content}*`;
//             }
//             if (style.has(STRIKETHROUGH)) {
//               // TODO: encode `~`?
//               content = `~~${content}~~`;
//             }
//             if (style.has(CODE)) {
//               content =
//                 blockType === BLOCK_TYPE.CODE ? content : `\`${content}\``;
//             }

//             return prefix + content + suffix;
//           })
//           .join('');
//         const entity = entityKey ? contentState.getEntity(entityKey) : null;
//         if (entity != null && entity.getType() === ENTITY_TYPE.LINK) {
//           const data = entity.getData();
//           const url = data.url || '';
//           const title = data.title ? ` "${escapeTitle(data.title)}"` : '';
//           return `[${content}](${encodeURL(url)}${title})`;
//         } else if (entity != null && entity.getType() === ENTITY_TYPE.IMAGE) {
//           const data = entity.getData();
//           const src = data.src || '';
//           const alt = data.alt ? `${escapeTitle(data.alt)}` : '';
//           return `![${alt}](${encodeURL(src)})`;
//         } else if (entity !== null && entity.getType() === 'CONDITION') {
//           const data = entity.getData();
//           const conditions = data.conditions || {};
//           return conditionsToVtl(content, conditions);
//         }
//         return content;
//       })
//       .join('');
//   }
// }

export default () => (
  <div style={{ color: 'red' }}>
    <b>ToDo</b> State To MD VTL
  </div>
);

// export default function stateToMarkdown(content) {
//   return new MarkupGenerator(content).generate();
// }
