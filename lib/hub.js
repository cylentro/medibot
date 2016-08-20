const siloamConnector = require("./connectors/siloamConnector");
const harapanKitaConnector = require("./connectors/harapanKitaConnector");
const pusatOtakNasionalConnector = require("./connectors/pusatOtakNasionalConnector");
const dharmaisConnector = require("./connectors/dharmaisConnector");
const dataStorage = require("./dataStorage");

const linqjs = require('linqjs');
const moment = require('moment');

class Hub {
    static init() {
        let connectorProviders = [siloamConnector, harapanKitaConnector, pusatOtakNasionalConnector, dharmaisConnector];
        let storage = new dataStorage();
        let providers = connectorProviders.map(provider => new provider(storage));

        this.storage = storage;
        this.providers = providers;

        return Promise.all(providers.map(provider => provider.init()));
    }

    static refreshData() {
        var timeStamp = moment(this.storage.timeStamp);
        var now = moment();
        var diff = Math.abs(now.diff(timestamp, 'days'));

        if (diff > 7)
            Promise.all(this.providers.map(provider => provider.loadSchedule()));
    }

}
module.exports = Hub;