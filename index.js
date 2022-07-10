const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/
    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const token = core.getInput('token', { required: true });

    const octokit = new github.getOctokit(token);
    console.log('Checkpoint (1)');
    
    const { data: changedFiles } = await octokit.rest.pulls.listFiles({
      owner,
      repo
    });
    console.log('Checkpoint (2)');

    for (const file of changedFiles) {
      console.log(`file is = '${file}'`);
      console.log(`file.filename is = '${file.filename}'`);
      
    }

    console.log(`The changedFiles is = '${changedFiles}'`);

  } catch (error) {
    console.log(error);
    console.log(error.message);
    core.setFailed(error.message);
  }
}

// Call the main function to run the action
main();