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
    const push_sha = core.getInput('push_sha', { required: true });

    const octokit = new github.getOctokit(token);
    
    const resp = await octokit.request("GET /repos/{owner}/{repo}/commits/{push_sha}", {
      owner: owner,
      repo: repo,
      push_sha: push_sha
    });

    if(resp.data) {
      if(resp.data.commit) {
        if(resp.data.commit.message) {
          console.log('Il messaggio è: ');
          console.log(resp.data.commit.message);
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