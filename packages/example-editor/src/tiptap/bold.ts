import { Mark, mergeAttributes } from '@tiptap/core';

export interface BoldOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bold: {
      setBold: () => ReturnType;
      toggleBold: () => ReturnType;
      unsetBold: () => ReturnType;
    };
  }
}

export const Bold = Mark.create<BoldOptions>({
  name: 'bold',

  addCommands() {
    return {
      setBold:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleBold:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetBold:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-b': () => this.editor.commands.toggleBold(),
      'Mod-B': () => this.editor.commands.toggleBold(),
    };
  },

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'b',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['b', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
