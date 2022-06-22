/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info('Yay, the app was loaded!');

  app.on('issues.opened', async (context) => {
    // const issueComment = context.issue({
    //   body: 'Thanks for opening this issue!',
    // });
    // return context.octokit.issues.createComment(issueComment);
    const issue = context.payload.issue;

    const user = issue.user.login;

    const message = `Rahmat @${user}. Bu manager bot. Men sizning yuborgan issuega daraja beraman.`;

    const params = context.issue({ body: message });

    if (
      context.payload.issue.author_association === 'OWNER' ||
      context.payload.issue.author_association === 'OWNER'
    ) {
      commands(app, 'label', (context, command) => {
        const labels = command.arguments.split(/, */);
        return context.github.issues.addLabels(context.issue({ labels }));
      });
    }

    return context.github.issues.createComment(params);
  });

  // sends welcome comment to 'new issue and new contributor' app.on('issues.opened', async context => {/
  app.on('issues.opened', async (context) => {
    const res = await context.github.issues.listForRepo(
      context.repo({
        state: 'all',
        creator: context.payload.issue.user.login,
      })
    );

    const number_Issues = res.data.filter((data) => !data.pull_request);

    if (number_Issues === 1) {
      try {
        context.github.issues.createComment(
          context.issue({ body: "Birinchi issue yangi a'zo tomonidan yasaldi" })
        );
      } catch (error) {
        if (error.code !== 404) {
          throw error;
        }
      }
    }
  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
