const core = require('@actions/core');
const github = require('@actions/github');
const { readdir } = require('fs');
const path = require("path");

const getDirectories = (source, callback) =>
  readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) {
      callback(err)
    } else {
      callback(
        files
          //.filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
      )
    }
  })


const getParentPath = function(filePath) {
  return require('path').resolve(__dirname, '..');
}

const main = async () => {
  try {
    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const token = core.getInput('token', { required: true });
    const push_sha = core.getInput('push_sha', { required: true });

    const octokit = new github.getOctokit(token);
    
    const resp = await octokit.request("GET /repos/{owner}/{repo}/commits/{push_sha}", {
      owner: owner,
      repo: repo,
      push_sha: push_sha
    });

    console.log('stampa delle robe:');
    console.log(__dirname);
    const parentPath = getParentPath(getParentPath(__dirname));
    console.log('dammi il paren:');
    console.log(parentPath);

    // const folderPath = '/home/runner/work/PR-metadata-action/PR-metadata-action/';
    const folderPath = '/home/runner/work/PR-metadata-action/';
    // const folderPath = '/home/runner/work/PR-metadata-action/PR-metadata-action/.github/actions/dist';

    getDirectories(folderPath, (result) => {
      console.log('stampa directories :');
      console.log(result);
    });

    if(resp.data) {
      if(resp.data.commit) {
        const commitMessage = resp.data.commit.message;
        if(commitMessage) {
          if(commitMessage.includes("DeployToEKSTest")) {

          }
        }
      }
    }

    // const { data: changedFiles } = await octokit.rest.pulls.listFiles({
    //   owner,
    //   repo
    // });
    // console.log('Checkpoint (2)');

  } catch (error) {
    console.log(error);
    console.log(error.message);
    core.setFailed(error.message);
  }
}

// Call the main function to run the action
main();