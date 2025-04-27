import { mergeAttributes, Node } from '@tiptap/core';

export interface DataListOptions {
  HTMLAttributes: Record<string, any>;
}

export const DataList = Node.create<DataListOptions>({
  content: '(dataListItem | dataListKey | dataListValue)+',
  name: 'dataList',

  group: 'block',
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'dl' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['dl', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
