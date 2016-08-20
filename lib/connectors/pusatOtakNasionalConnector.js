const hospital = require("../data/hospital");
const connector = require("./connector");
const dataStorage = require("../dataStorage");

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const linqjs = require('linqjs');

class PusatOtakNasionalConnector extends connector {
    constructor(dataStorage) {
        super(dataStorage);
        this.Provider = "Pusat Otak Nasional";
    }

    init() {
        this.loadHospital();
        this.loadSchedule();
    }

    loadHospital() {
        let data = new hospital();
        data.Code = "RSPON";
        data.Name = "Pusat Otak Nasional";
        data.Alias = "National Brain Center";
        data.Phone = ["021-29373377"];
        data.Fax = ["021-29373445",
            "021-29373385"];
        data.Hotline = "";
        data.Website = "http://www.rspon.co.id";
        data.Email = ["data@rspon.co.id", "rspotakn@gmail.com"];
        data.Address = "JL. M.T Haryono Kav. 11 Cawang, Jakarta Timur, 13630";
        data.Country = "Indonesia";
        data.City = "Jakarta";
        data.RegistrationUrl = "";
        data.Institution = "Pusat Otak Nasional";
        this.registerHospital(data);
    }

    loadSchedule() {

    }
}

module.exports = PusatOtakNasionalConnector;