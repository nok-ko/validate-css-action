import {validateFile, reporters} from './node_modules/csstree-validator/dist/csstree-validator.mjs';
import {getInput, setFailed, info, error} from '@actions/core';
import path from 'node:path';
import {opendir} from 'node:fs/promises';

try {
  // Only validate files with .css extension. Hardcoded and bad.
  const ext = 'css';
  // const directoryName = 'test';
  const directoryName = getInput('directory');
  info(`Directory input: ${directoryName}`)
  const directory = await opendir(directoryName);
  const errors = [];

  for await (let fPath of directory) {
    if (fPath.name.split('.')[1] !== ext)
      continue;
    const longPath = process.cwd() + path.sep + directoryName + path.sep + fPath.name;
    const latestErrors = validateFile(longPath);
    if (latestErrors[longPath].length) {
      info(reporters.console(latestErrors));
    }
    errors.push(latestErrors);
  }

  if (errors.length > 0) {
    throw errors;
  }
} catch (errors) {
  error(errors)
  setFailed(errors.map(err => reporters.console(err)));
}
