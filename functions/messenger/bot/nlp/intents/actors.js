var omdb = require('omdb');

module.exports = {
  intent: "ACTORS_IN_MOVIE",
  slots: [
    {

    }
  ],
  utterances: [
    ""
  ],
  callback: (bot, message, movie) => {
    omdb.search(movie, (err, movies) => {

      if(err) {
        bot.reply(message, `Sorry, an error occurred searching for "${movie}"`);
        return;
      }

      if(movies.length < 1) {
        bot.reply(message, `I couldn't find any movies matching "${movie}"`)
        return;
      }

      var elements = movies.map((movie) => {
        var image = movie.poster;
        if(!image || image == 'N/A') image = 'http://placehold.it/300x444';

        return {
          title: movie.title,
          subtitle: `${movie.type} (${movie.year})`,
          image_url: image,
          item_url: `http://www.imdb.com/title/${movie.imdb}/`,
          buttons: [
            {
              type: 'web_url',
              title: 'View Movie',
              url: `http://www.imdb.com/title/${movie.imdb}/`
            },
            {
              type: 'postback',
              title: 'List Actors',
              payload: movie.imdb
            }
          ]
        }
      });

      var attachment = {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: elements
        }
      };

      bot.reply(message, { attachment });

    });
  }
}
