import { callOrReturn, getExtensionField, mergeAttributes, Node, ParentConfig } from '@tiptap/core';
import { DOMOutputSpec } from '@tiptap/pm/model';

export interface TableOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    table: {
      insertTable: (options?: { rows?: number; cols?: number; withHeaderRow?: boolean }) => ReturnType;
    };
  }

  interface NodeConfig<Options, Storage> {
    /**
     * A string or function to determine the role of the table.
     * @default 'table'
     * @example () => 'table'
     */
    tableRole?:
      | string
      | ((this: {
          name: string;
          options: Options;
          storage: Storage;
          parent: ParentConfig<NodeConfig<Options>>['tableRole'];
        }) => string);
  }
}

/**
 * This extension allows you to create tables.
 * @see https://www.tiptap.dev/api/nodes/table
 */
export const Table = Node.create<TableOptions>({
  name: 'table',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: 'tableCaption? tableRow+',

  tableRole: 'table',

  isolating: true,

  group: 'block',

  parseHTML() {
    return [{ tag: 'table' }];
  },

  renderHTML({ HTMLAttributes }) {
    const table: DOMOutputSpec = ['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), ['tbody', 0]];

    return table;
  },

  extendNodeSchema(extension) {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage,
    };

    return {
      tableRole: callOrReturn(getExtensionField(extension, 'tableRole', context)),
    };
  },
});
