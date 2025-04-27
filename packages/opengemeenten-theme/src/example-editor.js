import { Editor } from 'https://esm.sh/@tiptap/core';
import { Document } from './editor/document.mjs';
import { Heading } from './editor/heading.mjs';
import { OrderedListItem } from './editor/ordered-list-item.mjs';
import { OrderedList } from './editor/ordered-list.mjs';
import { Paragraph } from './editor/paragraph.mjs';
import { Text } from './editor/text.mjs';
import { UnorderedListItem } from './editor/unordered-list-item.mjs';
import { UnorderedList } from './editor/unordered-list.mjs';

class ExampleEditorElement extends HTMLElement {
  constructor() {
    super();
    this.init();
  }
  init() {
    const defaultContent = '<utrecht-paragraph></utrecht-paragraph>';
    const template = this.querySelector('template');
    const content = template ? template.innerHTML : defaultContent;
    console.log(content);
    this.editor = new Editor({
      element: this,
      extensions: [Document, Paragraph, Text, Heading, OrderedList, OrderedListItem, UnorderedList, UnorderedListItem],
      content,
    });
  }
}

export const defineExampleEditorElement = () => customElements.define('example-editor', ExampleEditorElement);
