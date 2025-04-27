import { mergeAttributes, Node } from '@tiptap/core';

export interface TableHeaderCellOptions {
  HTMLAttributes: Record<string, any>;
}

export const TableHeaderCell = Node.create<TableHeaderCellOptions>({
  content: 'block+',

  name: 'tableHeaderCell',

  tableRole: 'cell',

  isolating: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'th' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['th', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
