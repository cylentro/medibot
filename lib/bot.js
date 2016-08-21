const hub = require("./hub");

const builder = require('botbuilder');
const linqjs = require('linqjs');
// region bot
const bot = new builder.UniversalBot();

// bot.use({
//     //botbuilder: <your_middleware_here>
// });
// endregion bot

// region intent
const intent = new builder.IntentDialog();

intent.matches(/^(H|h)ospital|(R|r)umah( )*(S|s)akit|(R|r)(S|s)/gm, session => session.beginDialog('/hospitals'));
intent.matches(/^(D|d)octor|(D|d)okter/gm, '/doctors');
intent.matches(/^((R|r)eg|(R|r)egistration|(P|p)erjanjian)/gm, '/registration');
intent.matches(/^(A|a)bout|(T|t)entang/gm, '/about');
intent.onBegin(
    (session, result, next) => {

        next();
    }
);
intent.onDefault(
    (session) => {
        session.beginDialog('/help');
    }
);
// endregion intent

// region data
var hospitals = [];
setTimeout(() => {
    hospitals = [...hub.storage.hospitals];
    console.log('load data finished');
}, 5000);
// endregion data

// region middleware
let dataPreparation = () => {
    return (session, result, next) => {
        console.log(hospitals.length);
        if (hospitals.length == 0) {
            session.send("Loading data, please wait");
            session.endDialog();
        } else
            next();
    };
};
const endDialog = () => {
    return (session, result, next) => {
        session.endDialog();
    };
};
// endregion middleware

// region dialog
bot.dialog('/', intent);

bot.dialog('/help', [
    (session, result, next) => {
        session.send("Medibot membantu anda menemukan informasi mengenai Rumah Sakit dan Dokter");
        session.send("Untuk memulai, ketik:\nRumah Sakit/RS/Hospital\nDokter/Doctor\nPerjanjiaan/Registration\n");
        next();
    }
]);

bot.dialog('/hospitals', [
    dataPreparation(),
    (session, result, next) => {
        let data = hospitals.groupBy(x => x.Institution).select(x => x.key);
        let prompText = "Pilihan Rumah Sakit:";
        builder.Prompts.choice(session, prompText, data);
    },
    (session, result, next) => {
        let data = hospitals.where(x => x.Institution === result.response.entity).select(x => x.Name);
        if (data.length == 1) {
            session.dialogData.hospitalName = data.first();
            next();
        } else {
            let prompText = "Pilihan Rumah Sakit:";
            builder.Prompts.choice(session, prompText, data);
        }
    },
    (session, result, next) => {
        var hospitalName = session.dialogData.hospitalName;
        if (result.response !== undefined)
            hospitalName = result.response.entity;

        let data = hospitals.first(x => x.Name === hospitalName);
        console.log(data);
        session.send(
            `${data.Name}\n${data.Address}\n${data.Phone.toString()}\n${data.Fax.toString() == "" ? "" : data.Fax.toString() + "\n"}${data.Hotline == "" ? "" : data.Hotline + "\n"}${data.Website}\n${data.Email.toString() == "" ? "" : data.Email.toString() + "\n"}`);
        next();
    },
    endDialog()
]);

bot.dialog('/doctors', [
    dataPreparation(),
    (session, result, next) => {
        session.send("dokter");
        next();
    },
    endDialog()
]);

bot.dialog('/registration', [
    (session, result, next) => {
        session.send("Maaf, saat ini fitur registrasi belum diimplementasikan");
        next();
    },
    endDialog()
]);

bot.dialog('/about', [
    (session, result, next) => {
        session.send("Medibot v1.0 under WTFPL");
        session.send("Contributor:\n" +
            "Christian Hadianto");
        session.send("Github: https://github.com/quicktukik/medibot");
        session.send("Contributor needed for:\nFetch Hospital Information\nFetch Doctor Information");
        next();
    },
    endDialog()
]);
// endregion dialog

module.exports = bot;
