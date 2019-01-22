import yaml from 'js-yaml';

const parseFunctions = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default extension => parseFunctions[extension];
