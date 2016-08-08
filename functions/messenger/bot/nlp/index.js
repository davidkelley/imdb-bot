const NLC = require('natural-language-commander');

const nlc = new NLC();

const INTENTS = ['actors'];

INTENTS.map(i => require(`./intents/${i}.js`)).forEach(i => nlc.registerIntent())

module.exports.receive = (bot, message, next) => {
  if(message.text) {
    nlc.handleCommand(bot, message, message.text)
    .then((intent) => {
      message.intent = intent;
      next()
    })
    .catch(() => {
      bot.reply(message, `Sorry I'm not sure what you mean.`);
    })
  }
};

module.exports.hears = (intent, message) => {
  return intent == message.intent;
};
