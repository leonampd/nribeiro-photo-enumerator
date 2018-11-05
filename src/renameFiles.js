import commandLineArgs from 'command-line-args';
import Promise from 'bluebird';
import fs from 'fs';
import {
  path,
  pipe,
  map,
  applySpec,
  concat,
} from 'ramda';
import {
  enumerateFiles,
  mapIndex,
  renameFile,
} from './file/index';

Promise.promisifyAll(fs);

const optionsDefinitions = [
  { name: 'dir', alias: 'd', type: String },
  { name: 'rename', alias: 'r', type: Boolean },
];

const options = commandLineArgs(optionsDefinitions);
const directory = concat(path(['dir'], options), '/');

export default Promise.resolve(directory)
  .then(fs.readdirAsync)
  .then(pipe(
    mapIndex(enumerateFiles),
    Promise.all,
  ))
  .then(map(
    applySpec({
      oldName: pipe(path(['oldName']), concat(directory)),
      newName: pipe(path(['newName']), concat(directory)),
    })
  ))
  .then(pipe(map(renameFile), Promise.all))
  .catch(err => console.log(err));
