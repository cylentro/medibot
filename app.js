const restify = require('restify');
const builder = require('botbuilder');

const hub = require("./lib/hub");

hub.init()
    .then(() => {
        // setup bot after promise done
        const bot = require("./lib/bot");

        let port = process.env.port || process.env.PORT || 3978;
        // setup server
        let server = new restify.createServer();
        let connector = new builder.ChatConnector({
            appId: process.env.APP_ID,
            appPassword: process.env.APP_PASSWORD
        });
        server.post('api/messages', connector.listen());

        bot.connector('*', connector);

        return new Promise((resolve, reject) => {
            server.listen(port, err => {
                if (err)
                    reject(err);
                return;
            });
            console.log(`listening to port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });