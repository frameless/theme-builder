import { Editor } from '@tiptap/core';
import { Bold } from './bold.js';
import { DataListItem } from './data-list-item.js';
import { DataListKey } from './data-list-key.js';
import { DataListValue } from './data-list-value.js';
import { DataList } from './data-list.js';
import { Document } from './document.mjs';
import { Emphasis } from './emphasis.js';
import { Heading } from './heading.mjs';
import { Image } from './image.js';
import { Italic } from './italic.js';
import { Link } from './link.js';
import { OrderedListItem } from './ordered-list-item.mjs';
import { OrderedList } from './ordered-list.mjs';
import { Paragraph } from './paragraph.mjs';
import { Strong } from './strong.js';
import { TableCaption } from './table-caption.js';
import { TableCell } from './table-cell.js';
import { TableHeaderCell } from './table-header-cell.js';
import { TableRow } from './table-row.js';
import { Table } from './table.js';
import { Text } from './text.mjs';
import { Underline } from './underline.js';
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

    this.editor = new Editor({
      element: this,
      extensions: [
        Bold,
        DataList,
        DataListItem,
        DataListKey,
        DataListValue,
        Document,
        Emphasis,
        Heading,
        Italic,
        Link,
        OrderedList,
        OrderedListItem,
        Image,
        Paragraph,
        Strong,
        Text,
        Table,
        TableCaption,
        TableHeaderCell,
        TableCell,
        TableRow,
        Underline,
        UnorderedList,
        UnorderedListItem,
        Validation,
      ],
      content,
    });
  }
}

export const defineExampleEditorElement = () => customElements.define('example-editor', ExampleEditorElement);
