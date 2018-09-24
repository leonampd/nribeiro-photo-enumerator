import file from './src/file';

const dir = '/teste';

Promise.resolve(dir)
  .then(file)
  .then(console.log);
