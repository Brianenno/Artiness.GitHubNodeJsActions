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
    console.log('Checkpoint (1)');
    
    // https://api.github.com/repos/Brianenno/PR-metadata-action/commits/425e7c142ffba3cfc13932873efca5fba6964043
    
    const data = await octokit.request("POST /repos/{owner}/{repo}/commits/{push_sha}", {
      owner: "octocat",
      repo: "hello-world",
      push_sha: push_sha
    });

    console.log('Checkpoint (2)');
    console.log(data);

    if(data) {
      console.log('Checkpoint (3)');
      if(data.commit) {
        console.log('Checkpoint (4)');
        if(data.commit.message) {
          console.log('Checkpoint (5)');
          console.log(data.commit.message);
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