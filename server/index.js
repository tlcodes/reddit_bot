import express from 'express';
import bodyParser from 'body-parser';
import help from './help';

const app = express();

console.log('Ready, set...');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// The post request, evaluates the user input and returns data
app.post('/', (req, res) => {
  // bot implementation comes here:
  resolveRequest(req)
    .then(data => res.json(data));
});

// resolve the incoming task request
function resolveRequest (req) {
  let text = req.body.text.toLowerCase().split(" ");
  if (!text.length) {
    // Get random hot post from reddit homepage (subreddit:'all' ??)
    return help.hotPostList('/')
              .then(result => {
                let thread = help.chooseThread(result);
                return help.buildMessage(thread);
              });
  }
  else if (text.length === 1) {
    // Get random hot post from the requested subreddit!
    return help.hotPostList(text[0])
              .then(result => {
                let thread = help.chooseThread(result);
                return help.buildMessage(thread);
              });
  }
  else if (text.lengh === 2) {
    let subreddit = text[0];

    switch (text[1]) {
      case 'hot':
        // Get random hot post from requested subreddit
        return help.hotPostList(subreddit)
                  .then(result => {
                    let thread = help.chooseThread(result);
                    return help.buildMessage(thread);
                  });
      case 'rising':
        // Get random rising post from requested subreddit
        return help.risingPostList(subreddit)
                  .then(result => {
                    let thread = help.chooseThread(result);
                    return help.buildMessage(thread);
                  });
      case 'new':
        // Get random new post from requested subreddit
        return help.newPostList(subreddit)
                  .then(result => {
                    let thread = help.chooseThread(result);
                    return help.buildMessage(thread);
                  });
      case 'controversial':
        // Get random controversial post from requested subreddit
        return help.controPostList(subreddit)
                  .then(result => {
                    let thread = help.chooseThread(result);
                    return help.buildMessage(thread);
                  });
      case 'top':
        // Get random top post from requested subreddit
        return help.topPostList(subreddit)
                  .then(result => {
                    let thread = help.chooseThread(result);
                    return help.buildMessage(thread);
                  });
      default:
        // Get a search for the requested query from the subreddit
        return help.searchSub(subreddit, text.slice(1, text.length));
    }
  }
}