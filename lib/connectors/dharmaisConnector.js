const hospital = require("../data/hospital");
const connector = require("./connector");
const dataStorage = require("../dataStorage");

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const linqjs = require('linqjs');

class DharmaisConnector extends connector {
    constructor(dataStorage) {
        super(dataStorage);
        this.PProvider = "Dharmais";
    }

    init() {
        this.loadHospital();
        this.loadSchedule();
    }

    loadHospital() {
        let data = new hospital();
        data.Code = "PKND";
        data.Name = "Pusat Kanker Nasional Dharmais";
        data.Alias = "National Cancer Center Dharmais";
        data.Phone = ["021-5681570"];
        data.Fax = [];
        data.Hotline = "021-5681570";
        data.Website = "http://www.dharmais.co.id/";
        data.Email = ["dharmais@dharmais.co.id", "rsk.dharmais@gmail.com"];
        data.Address = "Jl. Let. Jend. S. Parman Kav. 84-86, Slipi, Jakarta Barat 11420";
        data.Country = "Indonesia";
        data.City = "Jakarta";
        data.RegistrationUrl = "http://www.dharmais.co.id/index.php/registration-id.html";
        data.Institution = "Dharmais";
        this.registerHospital(data);
    }

    loadSchedule() {

    }
}

module.exports = DharmaisConnector;