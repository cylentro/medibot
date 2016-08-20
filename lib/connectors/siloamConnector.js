const codeGenerator = require("../helpers/codeGenerator");
const hospital = require("../data/hospital");
const connector = require("./connector");
const dataStorage = require("../dataStorage");

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const linqjs = require('linqjs');

class SiloamConnector extends connector {
    constructor(dataStorage) {
        super(dataStorage);
        this.Provider = "Siloam";
    }

    init() {
        this.loadHospital();
        this.loadSchedule();
    }

    loadHospital() {
        const baseUrl = 'http://www.siloamhospitals.com/our-hospitals';

        return fetch(baseUrl)
            .then(res => res.text())
            .then(body => {
                let urls = new Set;
                let $ = cheerio.load(body);
                let hospitalList = $('.syptom-list>.item-grid').children().find($('a'));
                hospitalList.each((i, elem) => {
                    urls.add($(elem).attr('href').trim());
                });
                return urls;
            })
            .then(urls => {
                return Promise.all([...urls].map(url => this.fetchHospitalInformation(url)))
                    .then(x => x);
            });
    }

    fetchHospitalInformation(hospitalUrl) {
        return fetch(hospitalUrl)
            .then(res => res.text())
            .then(body => {
                let $ = cheerio.load(body);

                let name = $('#content h1').text().trim();

                let contactUs = $('#content .container').last().find($('.sub-title')).last().next();
                let address = contactUs.find($('.titik-dua')).text().trim();

                contactUs = contactUs.next();
                let phone = contactUs.find($('.titik-dua')).text().trim();

                contactUs = contactUs.next();
                let hotline = contactUs.find($('.titik-dua')).text().trim();

                contactUs = contactUs.next();
                let email = contactUs.find($('.titik-dua')).text().trim();

                let data = new hospital();
                data.Address = address;
                data.Name = name;
                data.Phone = [phone];
                data.Hotline = hotline;
                data.Email = [email];
                data.Institution = "Siloam";
                data.Website = hospitalUrl;
                data.Country = "Indonesia";
                data.RegistrationUrl = "http://www.siloamhospitals.com/make-an-appointment.html";
                data.Code = name.ToCode();
                this.registerHospital(data);

                return data;
            });
    };
    loadSchedule() {

    }
}

module.exports = SiloamConnector;