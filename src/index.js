import fs from 'fs';
import { has, union } from 'lodash';

const genDiff = (file1, file2) => {
  const pars1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const pars2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));

  const keys = union(Object.keys(pars1), Object.keys(pars2));

  const result = keys.reduce((acc, key) => {
    if (has(pars1, key) && has(pars2, key)) {
      if (pars1[key] === pars2[key]) {
        return `${acc}\n${key}: ${pars1[key]}`;
      }
      return `${acc}\n + ${key}: ${pars2[key]}\n - ${key}: ${pars1[key]}`;
    }
    if (!has(pars1, key)) {
      return `${acc}\n + ${key}: ${pars2[key]}`;
    }
    return `${acc}\n - ${key}: ${pars1[key]}`;
  }, '');

  return `{${result}\n}`;
};

export default genDiff;
