import { mergeAttributes, Node } from '@tiptap/core';

export interface TableRowOptions {
  HTMLAttributes: Record<string, any>;
}

export const TableRow = Node.create<TableRowOptions>({
  content: '(tableCell | tableHeaderCell)*',
  name: 'tableRow',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'tr' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['tr', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  tableRole: 'row',
});
