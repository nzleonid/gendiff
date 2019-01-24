import fs from 'fs';
import { extname } from 'path';
import parsers from './parsers';
import ast from './ast';
import render from './render';

const genDiff = (filename1, filename2) => {
  const extension1 = parsers(extname(filename1));
  const extension2 = parsers(extname(filename2));

  const pars1 = extension1(fs.readFileSync(filename1, 'utf-8'));
  const pars2 = extension2(fs.readFileSync(filename2, 'utf-8'));

  const makeAst = ast(pars1, pars2);
  return render(makeAst);
};

export default genDiff;
