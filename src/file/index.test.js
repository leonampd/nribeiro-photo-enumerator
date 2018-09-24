import * as fs from 'fs';
import sinon from 'sinon';
import {listFilesFromDir} from '.';

const targetTestDir = '/test';

describe('test filesystem interations', () => {
  beforeEach(() => {
    sinon
      .stub(fs, 'readdirSync')
      .withArgs(targetTestDir)
      .returns([
        'file1.js',
        'file2.js',
        'file3.js',
      ]);

    sinon
      .stub(fs, 'existsSync')
      .withArgs(targetTestDir)
      .returns(true);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('list files in a directory', () => {
    const expectedFileList = [
      'file1.js',
      'file2.js',
      'file3.js',
    ];

    let files = Promise.resolve(targetTestDir)
      .then(listFilesFromDir);

    console.log(files.resolve());
  });
});
