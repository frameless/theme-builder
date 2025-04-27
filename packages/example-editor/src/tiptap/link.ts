import { Mark, mergeAttributes } from '@tiptap/core';

export interface LinkProtocolOptions {
  scheme: string;
  optionalSlashes?: boolean;
}

export interface LinkOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    link: {
      setLink: (attributes: { href: string }) => ReturnType;
      toggleLink: (attributes: { href: string }) => ReturnType;
      unsetLink: () => ReturnType;
    };
  }
}

export const Link = Mark.create<LinkOptions>({
  name: 'link',
  priority: 1000,
  keepOnSplit: false,
  exitable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(element) {
          return element.getAttribute('href');
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'utrecht-link[href]',
        attrs: { href: '' },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['utrecht-safe-link', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setLink:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleLink:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetLink:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
