'use strict';

var Intents = require('./intents');
var Botkit = require('botkit');
var omdb = require('omdb');

var controller = Botkit.facebookbot({
  access_token: process.env.ACCESS_TOKEN,
  verify_token: process.env.VERIFY_TOKEN,
});

var bot = controller.spawn({});

controller.middleware.receive.use(Intents.receive);

controller.hears('ACTORS_IN_MOVIE', 'message_received', Intents.hears, () => {})

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
