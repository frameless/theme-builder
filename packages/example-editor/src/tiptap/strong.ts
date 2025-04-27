import { Mark, mergeAttributes } from '@tiptap/core';

export interface StrongOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bold: {
      setStrong: () => ReturnType;
      toggleStrong: () => ReturnType;
      unsetStrong: () => ReturnType;
    };
  }
}

export const Strong = Mark.create<StrongOptions>({
  name: 'strong',

  addCommands() {
    return {
      setStrong:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleStrong:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetStrong:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
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
        tag: 'strong',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['strong', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
