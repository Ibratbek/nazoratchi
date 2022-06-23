/**
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.on('issues.opened', async (context) => {
    const params = context.issue({ body: 'Hello World!' });

    return context.octokit.issues.createComment(params);
  });
};
