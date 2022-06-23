const { exec } = require("child_process");



const executePy = (filepath) => {
    return new Promise((resolve, reject) => {
    exec(
      `python ${filepath} `,//double back slash to prevent escaping of backticks or dollar sign
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executePy,
};