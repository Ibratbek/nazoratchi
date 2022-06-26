module.exports = (app) => {
  app.on('issues.opened', async (context) => {
    // const params = context.issue({
    //   body: "Rahmat. Xatoni bildirganingiz uchun. Xatoni ko'rib chiqamiz va unga label belgilaymiz",
    // });

    const result = await app.auth();

    console.log(result);

    // Post a comment on the issue
    // return context.octokit.issues.createComment(params);
  });
};
