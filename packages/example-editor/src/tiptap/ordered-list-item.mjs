import { mergeAttributes, Node } from '@tiptap/core';

export const OrderedListItem = Node.create({
  name: 'orderedListItem',

  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: 'bulletList',
      orderedListTypeName: 'orderedList',
    };
  },

  content: 'paragraph block*',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'utrecht-ordered-list-item',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['utrecht-ordered-list-item', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
    };
  },
});
