import snoowrap from 'snoowrap';
import config from './../.config.js';

// Creates the snoowrap reddit object
const r = new snoowrap({
  userAgent: config.ua,
  clientId: config.ci,
  clientSecret: config.cs,
  refreshToken: config.rt
});

// Fetches hot posts from a subreddit
function hotPostList (name) {
  if (name === '/') {
    return r.getHot().then(posts => Promise.resolve(posts));
  }
  return r.getSubreddit(name).getHot()
            .then(posts => {
              return Promise.resolve(posts);
            });
}

// Fetches new posts from a subreddit
function newPostList (name) {
  return r.getSubreddit(name).getNew()
            .then(posts => {
              return Promise.resolve(posts);
            });
}

// Fetches top posts from a subreddit
function topPostList (name) {
  return r.getSubreddit(name).getTop()
            .then(posts => {
              return Promise.resolve(posts);
            });
}

// TODO: Testirej če dela z .resolve()!
// Fetches controversial posts from a subreddit
function controPostList (name) {
  return r.getSubreddit(name).getControversial()
            .then(posts => {
              return Promise.resolve(posts);
            });
}

// Fetches rising posts from a subreddit
function risingPostList (name) {
  return r.getSubreddit(name).getRising()
            .then(posts => {
              return Promise.resolve(posts);
            });
}

// Chooses a random post from the collection of posts
function chooseThread (threads) {
  return threads[parseInt(Math.random() * (threads.length))];
}

// Creates the data package
function buildMessage (post) {
  //@TODO: create the data package
  let data = {
    'response_type': 'in_channel',
    'text': '<'+post.url+'|'+ post.title +'>',
    'unfurl_links': true,
    'unfurl_media': true,
    'attachments': [
      {
        'pretext': post.selftext,
        'text': 'Fresh from ' + post.subreddit_name_prefixed + '! <https://www.reddit.com'+post.permalink+'|See on Reddit>',
        'author_name': 'posted by ' + post.author.name + ' | Score: ' + post.score + ' | Comments: ' + post.num_comments,
        'ts': post.created,
        'footer': 'The Morning Bunch :green_heart:',
        'color': '#439FE0'
      }
    ]
  };

  return data;
}

// Search the subreddit for the requested query
function searchSub (name, query) {
  return r.getSubreddit(name).search({query: query, sort: 'year'})
            .then(posts => {
              return Promise.resolve(posts);
            });
}


// Add an export statement to every function on top of exporting the
// entire object

const help = {
  hotPostList: hotPostList,
  newPostList: newPostList,
  topPostList: topPostList,
  controPostList: controPostList,
  risingPostList: risingPostList,
  chooseThread: chooseThread,
  buildMessage: buildMessage,
  searchSub: searchSub
};

export default help;
