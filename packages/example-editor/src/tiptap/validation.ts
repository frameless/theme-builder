import { Extension } from '@tiptap/core';
import { Node } from 'prosemirror-model';

class HeadingLevelValidError extends Error {
  constructor() {
    super('Invalid heading level');
  }
}
class HeadingEmptyError extends Error {
  constructor() {
    super('Heading is empty');
  }
}
class ParagraphEmptyError extends Error {
  constructor() {
    super('Paragraph is empty');
  }
}
class PageStartsWithHeadingOneError extends Error {
  constructor() {
    super('Page must start with Heading 1');
  }
}
class PageHasHeadingOneError extends Error {
  constructor() {
    super('Page must have Heading 1');
  }
}

export type ValidationOptions = {};

const isEmptyOrWhitespaceString = (str: string): boolean => /^\s*$/.test(str);

const isEmpty = (node: Node): boolean => {
  if (node.type.name === 'text') {
    return !node.text || isEmptyOrWhitespaceString(node.text);
  } else if (node.content?.content) {
    return node.content?.content.every((node) => isEmpty(node));
  }
  return true;
};

const isHeading1 = (node: Node): boolean => {
  return node.type.name === 'heading' && node.attrs['level'] === 1;
};

const validateDocument = (doc: Node): Error[] => {
  const nodes = doc.content.content;
  const documentErrors = [];

  if (!isHeading1(doc.content.content[0])) {
    documentErrors.push(new PageStartsWithHeadingOneError());
  }

  let hasHeading1 = false;

  doc.descendants((node) => {
    if (isHeading1(node)) {
      hasHeading1 = true;
      return false;
    }
    return true;
  });

  if (!hasHeading1) {
    documentErrors.push(new PageHasHeadingOneError());
  }

  const contentErrors = nodes.reduce((errors: Error[], node) => {
    if (node.type.name === 'paragraph') {
      if (isEmpty(node)) {
        errors.push(new ParagraphEmptyError());
      }
    }
    if (node.type.name === 'heading') {
      if (!['1', '2', '3', '4', '5', '6'].includes(node.attrs['level'])) {
        errors.push(new HeadingLevelValidError());
      }
      if (isEmpty(node)) {
        errors.push(new HeadingEmptyError());
      }
    }
    return errors;
  }, []);

  return [...documentErrors, ...contentErrors].filter(Boolean);
};

export const Validation = Extension.create<ValidationOptions>({
  name: 'validation',

  onUpdate({ editor, transaction }) {
    console.time('validation');
    const errors = validateDocument(transaction.doc);
    console.timeEnd('validation');
    console.log(errors);
    document.dispatchEvent(
      new CustomEvent('validationError', {
        detail: {
          errors,
        },
      }),
    );
  },
});
