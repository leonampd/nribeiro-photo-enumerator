import listAll from '.';

test('list files in a directory', () => {
  const expectedFileList = [
    'file1.js',
    'file2.js',
    'file3.js',
  ];

  const resultList = listAll();

  expect(resultList).toEqual(expect.arrayContaining(expectedFileList));
});
