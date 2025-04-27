import { Editor } from '@tiptap/core';
import { Document } from './document.mjs';
import { Heading } from './heading.mjs';
import { OrderedListItem } from './ordered-list-item.mjs';
import { OrderedList } from './ordered-list.mjs';
import { Paragraph } from './paragraph.mjs';
import { Text } from './text.mjs';
import { UnorderedListItem } from './unordered-list-item.mjs';
import { UnorderedList } from './unordered-list.mjs';
import { Validation } from './validation.js';

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
      extensions: [
        Document,
        Paragraph,
        Text,
        Heading,
        OrderedList,
        OrderedListItem,
        UnorderedList,
        UnorderedListItem,
        Validation,
      ],
      content,
    });
  }
}

export const defineExampleEditorElement = () => customElements.define('example-editor', ExampleEditorElement);
