import Promise from 'bluebird';
import fs from 'fs';
import { pipe } from 'ramda';
import { enumerateFiles, mapIndex } from './index';

Promise.promisifyAll(fs);

describe('Given a file list', () => {
  const filesToBeRenamed = [
    'DSC_123.jpg',
    'DSC_945.jpg',
    'DSC_199.JPG',
    'TESTE_c.JPG',
  ];

  const expectedRenamedFiles = [
    { oldName: 'DSC_123.jpg', newName: '1.jpg' },
    { oldName: 'DSC_945.jpg', newName: '2.jpg' },
    { oldName: 'DSC_199.JPG', newName: '3.jpg' },
    { oldName: 'TESTE_c.JPG', newName: '4.jpg' },
  ];

  it('should rename files', () => Promise.resolve(filesToBeRenamed)
    .then(pipe(
      mapIndex(enumerateFiles),
      Promise.all,
    ))
    .then(newFiles => expect(newFiles).toEqual(expectedRenamedFiles)));

  it('shouldn\'t rename files that already enumarated', () => {
    const fileListWithNumbers = [
      '1.jpg',
      '2.jpg',
      '3.jpg',
      'DSC_123.jpg',
      'DSC_945.jpg',
      'DSC_199.JPG',
      'TESTE_c.JPG',
    ];

    const expectedRenamedFiles = [
      { oldName: '1.jpg', newName: '1.jpg' },
      { oldName: '2.jpg', newName: '2.jpg' },
      { oldName: '3.jpg', newName: '3.jpg' },
      { oldName: 'DSC_123.jpg', newName: '4.jpg' },
      { oldName: 'DSC_945.jpg', newName: '5.jpg' },
      { oldName: 'DSC_199.JPG', newName: '6.jpg' },
      { oldName: 'TESTE_c.JPG', newName: '7.jpg' },
    ];

    return Promise.resolve(fileListWithNumbers)
      .then(pipe(
        mapIndex(enumerateFiles),
        Promise.all,
      ))
      .then(newFiles => expect(newFiles).toEqual(expectedRenamedFiles));
  });

  it('shouldnt exclude any file running the script twice or more', () => {
    const fileListWithNumbers = [
      '1.jpg',
      '2.jpg',
      '3.jpg',
      'DSC_123.jpg',
      'DSC_945.jpg',
      'DSC_199.JPG',
      'TESTE_c1.JPG',
      'TESTE_c2.JPG',
      'TESTE_c3.JPG',
      'TESTE_c4.JPG',
      'TESTE_c5.JPG',
      'TESTE_c6.JPG',
      'TESTE_c7.JPG',
    ];

    const expectedRenamedFiles = [
      { oldName: '1.jpg', newName: '1.jpg' },
      { oldName: '2.jpg', newName: '2.jpg' },
      { oldName: '3.jpg', newName: '3.jpg' },
      { oldName: 'DSC_123.jpg', newName: '4.jpg' },
      { oldName: 'DSC_945.jpg', newName: '5.jpg' },
      { oldName: 'DSC_199.JPG', newName: '6.jpg' },
      { oldName: 'TESTE_c1.JPG', newName: '7.jpg' },
      { oldName: 'TESTE_c2.JPG', newName: '8.jpg' },
      { oldName: 'TESTE_c3.JPG', newName: '9.jpg' },
      { oldName: 'TESTE_c4.JPG', newName: '10.jpg' },
      { oldName: 'TESTE_c5.JPG', newName: '11.jpg' },
      { oldName: 'TESTE_c6.JPG', newName: '12.jpg' },
      { oldName: 'TESTE_c7.JPG', newName: '13.jpg' },
    ];

    return Promise.resolve(fileListWithNumbers)
      .then(pipe(
        mapIndex(enumerateFiles),
        Promise.all,
      ))
      .then(pipe(
        mapIndex(enumerateFiles),
        Promise.all,
      ))
      .then(newFiles => expect(newFiles).toEqual(expectedRenamedFiles));
  });
});
