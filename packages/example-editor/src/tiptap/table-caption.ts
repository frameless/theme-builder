import { mergeAttributes, Node } from '@tiptap/core';

export interface TableCaptionOptions {
  HTMLAttributes: Record<string, any>;
}

export const TableCaption = Node.create<TableCaptionOptions>({
  content: 'inline*',
  name: 'tableCaption',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'caption' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['caption', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
