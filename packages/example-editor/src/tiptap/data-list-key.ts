import { mergeAttributes, Node } from '@tiptap/core';

export interface DataListKeyOptions {
  HTMLAttributes: Record<string, any>;
}

export const DataListKey = Node.create<DataListKeyOptions>({
  content: 'inline*',
  name: 'dataListKey',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'dt' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['dt', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
