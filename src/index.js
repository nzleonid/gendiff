import fs from 'fs';
import { extname } from 'path';
import parsers from './parsers';
import makeAst from './ast';
import getFormatRender from './renderers/formatSelection';

const genDiff = (filename1, filename2, outputFormat) => {
  const getExtension1 = parsers(extname(filename1));
  const getExtension2 = parsers(extname(filename2));

  const parsed1 = getExtension1(fs.readFileSync(filename1, 'utf-8'));
  const parsed2 = getExtension2(fs.readFileSync(filename2, 'utf-8'));

  const ast = makeAst(parsed1, parsed2);
  const render = getFormatRender(outputFormat);
  return render(ast);
};

export default genDiff;
