const hospital = require("../data/hospital");
const connector = require("./connector");
const dataStorage = require("../dataStorage");

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const linqjs = require('linqjs');

class HarapanKitaConnector extends connector {
    constructor(dataStorage) {
        super(dataStorage);
        this.Provider = "Harapan Kita";
    }

    init() {
        this.loadHospital();
        this.loadSchedule();
    }

    loadHospital() {
        let data = new hospital();
        data.Code = "PJNHK";
        data.Name = "Pusat Jantung Nasional Harapan Kita";
        data.Alias = "National Cardiovascular Center Harapan Kita";
        data.Phone = ["021-5684086",
            "021-5684087",
            "021-5684088",
            "021-5684089",
            "021-5684090",
            "021-5684091",
            "021-5684092",
            "021-5684093",
            "021-5681111"];
        data.Fax = ["021-5684230"];
        data.Hotline = "1500034";
        data.Website = "http://www.pjnhk.go.id";
        data.Email = ["info@pjnhk.go.id"];
        data.Address = "Jl. Let. Jend. S. Parman Kav. 87; Slipi; Jakarta; 11420";
        data.Country = "Indonesia";
        data.City = "Jakarta";
        data.RegistrationUrl = "http://www.pjnhk.go.id/index.php/janji";
        data.Institution="Harapan Kita";
        this.registerHospital(data);

        data = new hospital();
        data.Code = "RSABHK";
        data.Name = "Rumah Sakit Anak & Bunda Harapan Kita";
        data.Alias = "";
        data.Phone = ["021-5668284"];
        data.Fax = ["021-5601816"];
        data.Hotline = "08001527441";
        data.Website = "http://www.rsabhk.co.id";
        data.Email = ["data@rsabhk.co.id"];
        data.Address = "Jl. Let. Jend. S. Parman Kav. 87; Slipi; Jakarta; 11420";
        data.Country = "Indonesia";
        data.City = "Jakarta";
        data.RegistrationUrl = "";
        data.Institution="Harapan Kita";

        this.registerHospital(data);
    }

    loadSchedule() {

    }
}

module.exports = HarapanKitaConnector;