import {validateFile, reporters} from './node_modules/csstree-validator/dist/csstree-validator.mjs';
import {getInput, setFailed} from '@actions/core';
import path from 'node:path';
import {readFile, opendir} from 'node:fs/promises';

try {
  // Only validate files with .css extension. Hardcoded and bad.
  const ext = 'css';
  const directoryName = 'test';
  // const directoryName = getInput('directory');
  const directory = await opendir(directoryName);
  const errors = [];

  for await (let fPath of directory) {
    if (fPath.name.split('.')[1] !== ext)
      continue;
    const longPath = process.cwd() + path.sep + directoryName + path.sep + fPath.name;
    const latestErrors = validateFile(longPath);
    // if (latestErrors[longPath].length) {
    //   // console.log(reporters.console(latestErrors));
    // // }
    errors.push(latestErrors);
  }

  if (errors.length > 0) {
    throw errors;
  }
} catch (errors) {
  setFailed(errors.map(err => reporters.console(err)));
}
