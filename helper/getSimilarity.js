import { promisify } from 'util';
import { exec } from 'child_process';

const pythonScriptPath = '../ml/model.py';

const execPromise = promisify(exec);

export const getSimilarity = async ({ img1, img2 }, callback) => {
  const pythonScriptArgs = [img1, img2];
  const command = `python ${pythonScriptPath} ${pythonScriptArgs.join(' ')}`;
  try {
    const { stdout } = await execPromise(command);
    if (callback) {
      callback(stdout);
    }
    return stdout;
  } catch (error) {
    return null
  }
};
