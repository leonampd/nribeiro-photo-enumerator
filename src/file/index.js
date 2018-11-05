import Promise from 'bluebird';
import fs from 'fs';
import {
  add,
  split,
  applySpec,
  toLower,
  always,
  path,
  pipe,
  addIndex,
  map,
} from 'ramda';

Promise.promisifyAll(fs);

const splitFileName = filename => split('.', filename);
const addOne = add(1);
const formatName = file => `${path(['filename'], file)}.${path(['extension'], file)}`;
const mapIndex = addIndex(map);
const renameFile = ({ oldName, newName }) => fs.renameAsync(oldName, newName);

const enumerateFiles = (file, index) => Promise.resolve(file)
  .then(splitFileName)
  .then(fileArray => ({ filename: fileArray[0], extension: fileArray[1] }))
  .then(pipe(
    applySpec({
      filename: pipe(
        always(index),
        addOne,
      ),
      extension: pipe(
        path(['extension']),
        toLower,
      ),
    }),
    Promise.props,
  ))
  .then(formatName)
  .then(newName => ({ oldName: file, newName }));

export default { enumerateFiles, mapIndex, renameFile };
