import fs from 'fs';
import genDiff from '../src';

const extensionList = ['.json', '.yml', '.ini'];
const outputFormat = ['tree', 'plain', 'json'];
const dir = `${__dirname}/__fixtures__`;

extensionList.forEach((extension) => {
  outputFormat.forEach(format => test(`Gendiff test extension ${extension}, format ${format}`, () => {
    const file1 = `${dir}/before_tree${extension}`;
    const file2 = `${dir}/after_tree${extension}`;
    const expected = fs.readFileSync(`${dir}/test_${format}.txt`, 'utf-8').trim();
    const test = genDiff(file1, file2, format);
    expect(test).toBe(expected);
  }));
});
