module.exports = (app) => {
  app.on('issues.opened', async (context) => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   { owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World !}
    const params = context.issue({
      body: "Rahmat. Xatoni bildirganingiz uchun. Xatoni ko'rib chiqamiz va unga label belgilaymiz",
    });

    // Post a comment on the issue
    return context.octokit.issues.createComment(params);
  });
};
