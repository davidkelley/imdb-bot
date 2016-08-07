'use strict';

var Bot = require('./bot');

const handler = (event, context, cb) => {

  console.log(JSON.stringify(event));

  if(event.hub && event.hub.mode == 'subscribe') {
    if(event.hub.verify_token == TOKEN) {
      cb(null, parseInt(event.hub.challenge));
    }
  }

  if(event.query && event.query.object == 'page') {
    event.query.entry.forEach((entry) => {
      entry.messaging.forEach((message) => {
        if (message.optin) {
          var message = {
            optin: message.optin,
            user: message.sender.id,
            channel: message.sender.id,
            timestamp: message.timestamp,
          };

          Bot.controller.trigger('optin', [Bot.bot, message]);
        } else if (message.message) {
          var message = {
            text: message.message.text,
            user: message.sender.id,
            channel: message.sender.id,
            timestamp: message.timestamp,
            seq: message.message.seq,
            mid: message.message.mid,
            attachments: message.message.attachments,
            quick_reply: message.message.quick_reply
          };

          Bot.controller.receiveMessage(Bot.bot, message);
        } else if (message.delivery) {
          var message = {
            optin: message.delivery,
            user: message.sender.id,
            channel: message.sender.id,
            timestamp: message.timestamp,
          };

          Bot.controller.trigger('message_delivered', [Bot.bot, message]);
        } else if (message.postback) {
          var message = {
            payload: message.postback.payload,
            user: message.sender.id,
            channel: message.sender.id,
            timestamp: message.timestamp,
          };

          Bot.controller.trigger('postback', [Bot.bot, message]);

          Bot.controller.receiveMessage(Bot.bot, message);
        } else {
          Bot.controller.log('Got an unexpected message from Facebook: ', message);
        }
      })
    })

    cb(null, {});
  }
}

module.exports = { handler }
