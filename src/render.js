import { flatten } from 'lodash';

const stringify = (value, depth) => {
  if (typeof value !== 'object') {
    return value;
  }
  const indent = '    '.repeat(depth + 1);
  const makeString = Object.keys(value)
    .map(key => `${key}: ${stringify(value[key], depth)}`)
    .join('\n');
  return `{\n${indent}${makeString}\n${indent.slice(0, -4)}}`;
};

const render = (ast, depth = 0) => {
  const diff = ast.map((item) => {
    const {
      key, type, newValue, oldValue, children,
    } = item;
    switch (type) {
      case 'composite':
        return `    ${key}: ${render(children, depth + 1)}`;
      case 'unchanged':
        return `    ${key}: ${stringify(oldValue, depth + 1)}`;
      case 'changed':
        return [`  - ${key}: ${stringify(oldValue, depth + 1)}`,
          `  + ${key}: ${stringify(newValue, depth + 1)}`];
      case 'deleted':
        return `  - ${key}: ${stringify(oldValue, depth + 1)}`;
      case 'added':
        return `  + ${key}: ${stringify(newValue, depth + 1)}`;
      default:
        return `Error: ${type} undefined`;
    }
  });
  const indent = '    '.repeat(depth);
  const makeObj = flatten(diff).join(`\n${indent}`);
  return `{\n${indent}${makeObj}\n${indent}}`;
};

export default render;
