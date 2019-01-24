import { has, union } from 'lodash';

const ast = (pars1, pars2) => {
  const keys = union(Object.keys(pars1), Object.keys(pars2));
  const makeAst = keys.reduce((acc, key) => {
    if (has(pars1, key) && has(pars2, key)) {
      if (typeof pars1[key] === 'object' && typeof pars2[key] === 'object') {
        return [...acc, { type: 'composite', key, children: ast(pars1[key], pars2[key]) }];
      }
      if (pars1[key] === pars2[key]) {
        return [...acc, { type: 'unchanged', key, oldValue: pars1[key] }];
      }
      return [...acc, {
        type: 'changed', key, oldValue: pars1[key], newValue: pars2[key],
      }];
    }
    if (!has(pars1, key)) {
      return [...acc, { type: 'added', key, newValue: pars2[key] }];
    }
    return [...acc, { type: 'deleted', key, oldValue: pars1[key] }];
  }, []);
  return makeAst;
};

export default ast;
