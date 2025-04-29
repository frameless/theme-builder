import { Node } from '@tiptap/core';

export const Document = Node.create({
  content: 'block+',
  name: 'document',
  topNode: true,
});
