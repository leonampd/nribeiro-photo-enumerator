import * as fs from 'fs';
import Promise from 'bluebird';

const getFilesFromDir = dir => Promise.resolve(dir)
  .then(fs.readdirSync)
  .catch((err) => {
    console.log(err);
  });

const isDir = dir => Promise.resolve(dir)
  .then(fs.existsSync)
  .catch((err) => {
    console.log(err);
  });

const listFilesFromDir = dir => [1, 2, 3];

export default {isDir, listFilesFromDir};
