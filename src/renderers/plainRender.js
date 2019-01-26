import { flatten } from 'lodash';

const formatValue = value => (typeof value !== 'object' ? value : '[complex value]');

const render = (ast, propertyPath = []) => {
  const diff = ast.filter(item => item.type !== 'unchanged').map((item) => {
    const {
      key, type, newValue, oldValue, children,
    } = item;
    const template = `Property '${[...propertyPath, key].join('.')}' was`;
    switch (type) {
      case 'composite': return render(children, [...propertyPath, key]);
      case 'changed': {
        const formatOldValue = formatValue(oldValue);
        const formatNewValue = formatValue(newValue);
        return `${template} changed. From ${formatOldValue} to ${formatNewValue}`;
      }
      case 'deleted': return `${template} deleted`;
      case 'added': {
        const value = typeof newValue !== 'object' ? `${newValue}` : '[complex value]';
        return `${template} added with value: ${value}`;
      }
      default:
        throw new Error(`${type} undefined`);
    }
  });
  return flatten(diff).join('\n');
};

export default render;
