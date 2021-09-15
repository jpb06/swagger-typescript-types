import { splitOnce } from '../util/split-once';

export const getJsDoc = (
  id: string,
  verb: string,
  summary?: string,
  description?: string,
) => {
  let doc = `/** ${splitOnce(id, '_')[1]}\n * verb: ${verb}\n`;
  if (summary) {
    doc += ` * summary: ${summary}\n`;
  }
  if (description) {
    doc += ` * description: ${description}\n`;
  }

  doc += ' */';

  return doc;
};
