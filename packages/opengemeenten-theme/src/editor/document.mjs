import { Node } from 'https://esm.sh/@tiptap/core';

export const Document = Node.create({
  content: 'block+',
  name: 'document',
  topNode: true,
});
