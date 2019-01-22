import fs from 'fs';
import { has, union } from 'lodash';
import { extname } from 'path';
import parsers from './parsers';

const genDiff = (file1, file2) => {
  const extension1 = parsers(extname(file1));
  const extension2 = parsers(extname(file2));

  const pars1 = extension1(fs.readFileSync(file1, 'utf-8'));
  const pars2 = extension2(fs.readFileSync(file2, 'utf-8'));

  const keys = union(Object.keys(pars1), Object.keys(pars2));

  const checkKeys = keys.reduce((acc, key) => {
    if (has(pars1, key) && has(pars2, key)) {
      if (pars1[key] === pars2[key]) {
        return [...acc, `    ${key}: ${pars1[key]}`];
      }
      return [...acc, `  + ${key}: ${pars2[key]}`, `  - ${key}: ${pars1[key]}`];
    }
    if (!has(pars1, key)) {
      return [...acc, `  + ${key}: ${pars2[key]}`];
    }
    return [...acc, `  - ${key}: ${pars1[key]}`];
  }, []);

  return `{\n${checkKeys.join('\n')}\n}`;
};

export default genDiff;
