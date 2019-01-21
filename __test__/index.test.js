import fs from 'fs';
import genDiff from '../src';

test('genDiff test', () => {
  const file1 = 'before.json';
  const file2 = 'after.json';
  const expected = fs.readFileSync('expected.txt', 'utf-8');
  const result = genDiff(file1, file2);
  expect(result).toBe(expected);
});
