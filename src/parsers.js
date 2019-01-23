import yaml from 'js-yaml';
import ini from 'ini';

const parseFunctions = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.decode,
};

export default extension => parseFunctions[extension];
