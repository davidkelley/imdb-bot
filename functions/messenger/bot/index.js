'use strict';

var Botkit = require('botkit');
var omdb = require('omdb');

var controller = Botkit.facebookbot({
  access_token: process.env.ACCESS_TOKEN,
  verify_token: process.env.VERIFY_TOKEN,
});

var bot = controller.spawn({});

controller.hears(['^.+?in\ (.+?)$'], 'message_received', (bot, message) => {

  var movie = message.match[1];

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
});

controller.on('postback', (bot, message) => {
  omdb.get({ imdb: message.payload }, true, (err, movie) => {

    if(err) {
      bot.reply(message, `Sorry, an error occurred retrieving actors.`);
      return;
    }

    var actors = movie.actors.join(', ');
    bot.reply(message, `The lead actors are ${actors}`);
  });
});

module.exports = { controller, bot }
