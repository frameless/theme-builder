import { Mark, mergeAttributes } from '@tiptap/core';

export interface EmphasisOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    emphasis: {
      setEmphasis: () => ReturnType;
      toggleEmphasis: () => ReturnType;
      unsetEmphasis: () => ReturnType;
    };
  }
}

export const Emphasis = Mark.create<EmphasisOptions>({
  name: 'emphasis',

  addCommands() {
    return {
      setEmphasis:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleEmphasis:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetEmphasis:
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
        tag: 'em',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['em', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
