import { mergeAttributes, Node } from '@tiptap/core';

export interface DataListValueOptions {
  HTMLAttributes: Record<string, any>;
}

export const DataListValue = Node.create<DataListValueOptions>({
  content: 'inline*',
  name: 'dataListValue',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'dd' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['dd', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
