import { mergeAttributes, Node } from '@tiptap/core';

export interface DataListItemOptions {
  HTMLAttributes: Record<string, any>;
}

export const DataListItem = Node.create<DataListItemOptions>({
  content: '(dataListKey | dataListValue)+',
  name: 'dataListItem',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'dl > div' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
