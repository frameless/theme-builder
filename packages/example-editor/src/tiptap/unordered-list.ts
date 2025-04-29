import { mergeAttributes, Node, wrappingInputRule } from '@tiptap/core';

export interface UnorderedListOptions {
  start?: number;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    unorderedList: {
      toggleUnorderedList: () => ReturnType;
    };
  }
}

/**
 * Matches a bullet list to a dash or asterisk.
 */
export const inputRegex = /^\s*([-+*])\s$/;

/**
 * This extension allows you to create bullet lists.
 * This requires the ListItem extension
 * @see https://tiptap.dev/api/nodes/bullet-list
 * @see https://tiptap.dev/api/nodes/list-item.
 */
export const UnorderedList = Node.create<UnorderedListOptions>({
  name: 'unordered-list',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block list',

  content() {
    return `unorderedListItem+`;
  },

  parseHTML() {
    return [{ tag: 'utrecht-unordered-list' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['utrecht-unordered-list', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleUnorderedList:
        () =>
        ({ commands }) => {
          return commands.toggleList('unorderedList', 'unorderedListItem');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-8': () => this.editor.commands.toggleUnorderedList(),
    };
  },

  addInputRules() {
    let inputRule = wrappingInputRule({
      find: inputRegex,
      type: this.type,
    });

    return [inputRule];
  },
});
