import { mergeAttributes, Node, wrappingInputRule } from '@tiptap/core';

export const inputRegex = /^(\d+)\.\s$/;

export interface OrderedListOptions {
  start?: number;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    orderedList: {
      toggleOrderedList: () => ReturnType;
    };
  }
}

export const OrderedList = Node.create<OrderedListOptions>({
  name: 'orderedList',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block list',

  content() {
    return `orderedListItem+`;
  },

  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (element) => {
          return element.hasAttribute('start') ? parseInt(element.getAttribute('start') || '', 10) : 1;
        },
      },
      type: {
        default: null,
        parseHTML: (element) => element.getAttribute('type'),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'utrecht-ordered-list',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { start, ...attributesWithoutStart } = HTMLAttributes;

    return start === 1
      ? ['utrecht-ordered-list', mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart), 0]
      : ['utrecht-ordered-list', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleOrderedList:
        () =>
        ({ commands }) => {
          return commands.toggleList('orderedList', 'orderedListItem');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-7': () => this.editor.commands.toggleOrderedList(),
    };
  },

  addInputRules() {
    let inputRule = wrappingInputRule({
      find: inputRegex,
      type: this.type,
      getAttributes: (match) => ({ start: +match[1] }),
      joinPredicate: (match, node) => node.childCount + node.attrs['start'] === +match[1],
    });
    return [inputRule];
  },
});
