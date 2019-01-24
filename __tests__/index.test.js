import fs from 'fs';
import genDiff from '../src';

const extensionList = ['.json', '.yml', '.ini'];
const dir = `${__dirname}/__fixtures__`;

extensionList.forEach(extension => test(`genDiff test ${extension}`, () => {
  const file1 = `${dir}/before${extension}`;
  const file2 = `${dir}/after${extension}`;
  const expected = fs.readFileSync(`${dir}/test.txt`, 'utf-8').trim();
  const result = genDiff(file1, file2);
  expect(result).toBe(expected);
}));

extensionList.forEach(extension => test(`genDiff test tree ${extension}`, () => {
  const file1 = `${dir}/before_tree${extension}`;
  const file2 = `${dir}/after_tree${extension}`;
  const expected = fs.readFileSync(`${dir}/test_tree.txt`, 'utf-8').trim();
  const result = genDiff(file1, file2);
  expect(result).toBe(expected);
}));
