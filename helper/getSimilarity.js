import { exec } from 'child_process';

const pythonScriptPath = './ml/model.py';

export const getSimilarity = ({ img1 = "", img2 = "" }) => {
  const command = `python3 ${pythonScriptPath} "${img1}" "${img2}"`;

  return new Promise((resolve) => {
    exec(command, (_, stdout) => {
      const similarityScore = parseFloat(stdout.trim());
      resolve(similarityScore);
    });
  });
};