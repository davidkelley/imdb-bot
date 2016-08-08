# IMDB Bot

This is a simple Facebook Messenger bot that allows you to first search for a movie by name, then view the actors for that movie.

It uses [Botkit](https://github.com/howdyai/botkit) and [Serverless](https://github.com/serverless/serverless) ([AWS Lambda](https://aws.amazon.com/lambda/details/)) to power it. In order to connect with IMDB, it uses the [OMDB](https://www.npmjs.com/package/omdb) NPM package.

The preview below shows the bot in action, returning with a structured Messenger payload allowing you to see the name of the movie, its poster (if it has one) as well as its year of release.

![IMDB Bot](https://github.com/davidkelley/imdb-bot/blob/master/.github/images/1.gif?raw=true "IMDB Bot")

## Getting Started

0. `$ npm install -g serverless`
0. Clone this repository and navigate to it.
0. Set environment variables for a `VERIFY_TOKEN`.
0. `$ serverless deploy`.
0. Follow [Facebook's Getting Started](https://developers.facebook.com/docs/messenger-platform/quickstart) guide for creating a new App and Page.
0. Using the URL of the API Gateway, connect the bot to the app.
